// 프레임워크 없는 프론트엔드 개발에서 나오는 웹 컴포넌트 실습내용
window.addEventListener('DOMContentLoaded', () => {
  console.log('onload!')
  document.querySelectorAll('github-avatar')
    .forEach(avatar => {
      avatar.addEventListener(EVENTS.AVATAR_LOAD_COMPLETE, e => {
        console.log('Avatar Loaded', e.detail.avatar);
      })
      avatar.addEventListener(EVENTS.AVATAR_LOAD_ERROR, e => {
        console.log('Avatar Loading Error', e.detail.error);
      })
    })
})
const ERROR_IMAGE = 'https://cdn-icons-png.flaticon.com/512/126/126486.png';
const LOADING_IMAGE = 'https://cdn-icons-png.flaticon.com/512/3305/3305803.png';

const AVATAR_LOAD_COMPLETE = 'AVATAR_LOAD_COMPLETE';
const AVATAR_LOAD_ERROR = 'AVATAR_LOAD_ERROR';

const EVENTS = {
  AVATAR_LOAD_COMPLETE,
  AVATAR_LOAD_ERROR
}

const getGithubAvatarUrl = async (user) => {
  if(!user) {
    return;
  }

  const response = await fetch(`https://api.github.com/users/${user}`);

  if(!response.ok) {
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  }

  const data = await (await response).json();
  console.log(data.avatar_url);
  return data.avatar_url;
}

class GithubAvatar extends HTMLElement {
  
  get user() {
    return this.getAttribute('user');
  }

  set user(user) {
    this.setAttribute('user', user);
  }

  constructor() {
    super();
    this.url = LOADING_IMAGE;  
  }

  render() {
    // requestAnimationFrame 콜백에 실어보자
    window.requestAnimationFrame(() => {
      this.innerHTML = '';
      const img = document.createElement('img');
      img.src = this.url;
      img.style.width = '100px';
      img.style.height = '100px';
      this.appendChild(img);
    });
  }

  onLoadAvatarComplete() {
    const event = new CustomEvent(AVATAR_LOAD_COMPLETE, {
      detail: {
        avatar: this.url
      }
    })
    this.dispatchEvent(event);
  }

  onLoadAvatarError(error) {
    const event = new CustomEvent(AVATAR_LOAD_ERROR, {
      detail: {
        error
      }
    });
    this.dispatchEvent(event);
  }

  connectedCallback() {
    this.render();
    this.loadNewAvatar();
  }
  
  async loadNewAvatar() {
    const { user } = this;
    if(!user) {
      return;
    }

    try {
      this.url = await getGithubAvatarUrl(user);
      this.onLoadAvatarComplete();
    } catch (e) {
      this.url = ERROR_IMAGE;
      this.onLoadAvatarError(e)
    }

    this.render();
  }

}

customElements.define('github-avatar', GithubAvatar);