describe('Cinnamon Test', () => {
  let cookies = [];
  before('GET VALID COOKIE', () => {
  
    cy.visit('https://logins.daum.net/accounts/signinform.do?url=https%3A%2F%2Flocalhost:3000');
    cy.get('input[id="id"]').type('wwl2096test')
    cy.get('input[id="inputPwd"]').type('apdlfxlachlrh!')
    cy.get('button[id="loginBtn"]').click();
    
    // 쿠키가 즉시 들어오진 않는다..
    cy.wait(1000);
    cy.getCookies()
      .should('have.length.above', 10)
      .then((ck) => {
        ck.forEach(({name, value, options}) => cookies.push({name, value, options}));
      })
    cy.clearCookies();
  })

  beforeEach(() => {
    // SET COOKIES, before에서 얻은 쿠키는 한번 저장하면 날아간다..
    cookies.forEach(({name, value, ...options}) => {
      cy.setCookie(name, value, options)
    })
  })


  // go to empty page and make http Request by cy.request()
  it('GET folders', () => {

    cy.request({
      method: 'GET', 
      url: '/folders'
    }).should(response => {
      expect(response.status).equal(200);
      expect(response.body).to.have.length.above(1);
    })
  })
  
  it('GET /mails', () => {
    cy.request({
      method: 'GET', 
      url: '/mails?offset=0&limit=10&folderId=INBOX&labelIds='
    }).should(response => {
      expect(response.status).equal(200);
      expect(response.body).to.have.length.above(1);
    })
  })

  it('POST /mails/modify', () => {
    const body = {
      mailIds: '["00000000000005H"]',
      addLabelIds: '["UNREAD"]',
    };

    cy.request({
      method: 'POST', 
      url: '/mails/modify',
      body,
    }).should(response => {
      expect(response.status).equal(200);
    })
  })

  it('POST /mails/moveToFolderByAddresses', () => {
    const body = {
      fromAddrs: '["wwl2066test@daum.net"]',
      folderIds: '["INBOX"]',
      mailIds: '["00000000000005H"]',
      moveToFolderId: 'INBOX',
    };
    cy.request({
      method: 'POST',
      url: '/mails/moveToFolderByAddresses',
      body,
    }).should(response => {
      expect(response.status).equal(200);
    })
  })

  it('POST /mails/trashUnreadFolders', () => {
    const body = {
      folderIds: '["MINE"]',
    };

    const options = {
      method: 'POST',
      url: '/mails/trashUnreadFolders',
      body
    };
    cy.request(options).should(response => expect(response.status).equal(200));
  })

  it('GET /mails/lastMail', () => {
    const options = {
      method: 'GET',
      url: '/mails/lastMail'
    }
    cy.request(options).should(response => expect(response.status).equal(200));
  })

  it('POST /mails/send', () => {
    const body = {
      "subject": "제목",
      "contents": "<div style=\"color:#111;font-family:Apple SD Gothic Neo,Malgun Gothic,'맑은 고딕',sans-serif;font-size:10pt;line-height:1.5;\"><p>내용</p>\n<p><img style=\"\" id=\"tx_entry_10000\" src=\"cid:PmYBm8MgbmBrdalL@hanmail\" class=\"txc-image\" inlineid=\"72241085_3\"><br></p>\n<p><br></p>\n<p><br></p></div>",
      "toList": [
          {
              "name": "wwl2096test",
              "addr": "wwl2096test@daum.net"
          }
      ],
      "ccList": [],
      "bccList": [],
      "from": {
          "name": "닉네임",
          "addr": "wwl2096test@daum.net"
      },
      "attachments": [
          {
              "filePath": "/mailattach/wwl2096test@hanmail.net/attach/165987963999021/72240452_1/테스트.pdf",
              "fileName": "테스트.pdf",
              "fileSize": 3028,
              "contentType": "application/pdf",
              "attachIndex": "72240452_1",
              "fileType": "normal"
          },
          {
              "filePath": "/mailattach/wwl2096test@hanmail.net/attach/165987963999021/72240487_2/테스트.png",
              "fileName": "테스트.png",
              "fileSize": 3410,
              "contentType": "image/png",
              "attachIndex": "72240487_2",
              "fileType": "normal"
          },
          {
              "filePath": "/mailattach/wwl2096test@hanmail.net/attach/165987963999021/72241085_3/테스트.png",
              "fileName": "테스트.png",
              "fileSize": 3410,
              "contentType": "image/png",
              "attachIndex": "72241085_3",
              "fileType": "inline",
              "contentId": "PmYBm8MgbmBrdalL@hanmail"
          }
      ],
      "composerTime": "20220807224039",
      "composerId": "165987963999021",
      "optionalData": {
          "individually": false,
          "savingSent": true,
          "signature": false
      },
      "isDraft": false
    }
    const options = {
      method: 'POST',
      url: '/mails/send',
      body,
    }
    cy.request(options).should(response => expect(response.status).equal(200));
  })
})