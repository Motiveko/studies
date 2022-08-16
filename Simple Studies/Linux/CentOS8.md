# 이것이 리눅스다 with RedHat CentOS 8

> 목표 학습 기간: 8/11 - 9/30


## 1. 성공적인 학습을 위한 준비 작업과 CentOS 설치
- 학습 환경이므로 가상머신을 이용해 서버환경을 흉내낸다. 2대의 리눅스 서버, 1대의 리눅스 클라이언트, 1대의 Window 클라이언트 총 4대의 가상머신을 활용한다.
- 각 가상 머신에는 가상 IP가 할당되고 가상 라우터(Gateway)를 통해 4대의 가상머신을 하나의 네트워크로 묶어 사용한다.
- [가상머신 vs 컨테이너](https://hoon93.tistory.com/41)
  - 컨테이너는 OS를 설치하는게 아니라 HOST OS 위에서 자원만 공유하므로 상대적으로 가볍다.
  - 가상머신(VM)은 물리적인 하드웨어 추상화로, 각 VM에는 운영체제, 앱, Binary, Library가 모두 포함되므로 무겁다. 즉 HostOS에 여러개의 게스트OS를 설치하는것이다.

<br>

- 가상머신 설치는 `VMware Fusion`을 사용한다.(Window는 VMWare Workstation Pro..)
- 가상하드디스크는 IDE, SCSI, SATA, NVMe 4가지가 있다. ***2번 서버는 SCSI 방식***을 사용한다.

> `VMware Fusion` ARM에는 CentOS8도 Windows도 없다. EC2를 이용해 실제 서버를 이용하기로 한다.

- ssh연결
```
ssh -i {path-to-pem.pem} ec2-user@public-IPv4-DNS
```
- 학습이 끝나면 반드시 인스턴스 중지를 하자. 요금안나오게..

<br>

- [DNS 서버란](https://gentlysallim.com/dns%EB%9E%80-%EB%AD%90%EA%B3%A0-%EB%84%A4%EC%9E%84%EC%84%9C%EB%B2%84%EB%9E%80-%EB%AD%94%EC%A7%80-%EA%B0%9C%EB%85%90%EC%A0%95%EB%A6%AC/)
  - DNS서버란 도메인 주소에 대한 ip주소를 질의할 수 있는 서버다.
  - DNS서버는 글로벌하게 계층 구조를 이루게 되는데, `Root DNS`(ICANNI) > `TLD DNS`(도메인 등록기관) > `Authoritative DNS`(도메인 판매업체) > `Recursive DNS`(ISP) 서버로 이뤄진다.
  - 우리가 질의하는 서버는 ISP가 운영하는 Recursive DNS로 여기에 요청하면 여기서 알아서 Root, TLD, Authoritative에 요청하거나, 캐시가 있으면 캐시로 어디로 가야할지 알려준다.
  
<br>

- [DHCP 서버란](https://extrememanual.net/8698)
  - DHCP(Dynamic Host Configuration Protocol)은 호스트(서버)에서 보유하고 있는 IP를 유동적으로 관리한다. 
  - 유동 IP를 분배해주고, 일정시간 안쓰면 다시 회수하고 그런다. 이 시간을 DHCP Lease Time(임대 시간)이라고 한다.
  - 우리가 인터넷 쓸 때 ISP로부터 받는 아이피 주소도 ISP의 DHCP 서버의 일정 대역에서 자동으로 할당받는것이다.(IP주소는 유한하기 때문) 참고로 공유기도 DHCP 서버다. wifi 내부 네트워크에서 각 기기의 주소는 전부 유동적이다.
  - VMWare 환경에서 클라이언트로 쓸 운영체제는 DHCP 서버로부터 IP를 유동적으로 할당받는다.

<br>

## 2. CentOS 리눅스에 대한 간단한 소개
- 리눅스 값비싼 유닉스를 대체하기 위해 나왔다. 무료 유닉스라고 보면 된다.
- 리누스 토르발스가 어셈블리어로 [`리눅스 커널`](https://kernel.org/)을 만들어 배포한게 리눅스의 탄생이다. 이 커널은 현재 제어하는 하드웨어 장치의 지원 여부 및 하드웨어 제어 코드가 들어있다. 즉 리눅스의 알맹이는 커널이다.
- 일반적인 사용자가 커널만으로 리눅스를 쓸 수 없어서, 이 위에 컴파일러, 쉘이나 여러 응용프로그램을 얹어서 배포하는게 `리눅스 배포판`이다.
- 요즘은 많이 하지 않지만, 리눅스 배포판은 보통 특정버전 커널을 기준으로 만들어지는데, 커널을 업그레이드 할 수도 있다. 이를 커널 업그레이드 or 커널 컴파일 이라고 한다.
- GNU 프로젝트는 '모두가 공유할 수 있는 소프트웨어'를 만드는 것을 목표로 시작한 프로젝트다. 리눅스도 이 프로젝트를 통해 완성되었기 때문에 리눅스를 GNU/Linux라고 부른다.
- GNU를 통해 제공되는 소프트웨어는 GPL(General Public License)를 따르는데, 수정/사용등에 대한 자유를 보장한다. 상업적 사용도 무료인데, ***반드시 소스코드를 공개해야 한다.***

- Redhat에서 제공하는 상업용 리눅스가 RHEL(Redhat Enterprise Linux)이다. 유료지만서도 GPL 라이센스를 따르므로 소스코드를 공개해야 했고, 이걸 그대로 다시 컴파일해 배포하는게 CentOS이다. 결국 RHEL === CentOS이다.
- Fedora는 RHEL을 개발하기 전 베타버전이다. 따라서 Fedora -> RHEL -> CentOS순으로 공개된다. 이걸 전부 Redhat에서 관리하는데, CentOS가 있으면 도대체 돈을 어떻게 벌지 궁금하다.(AWS는 RHEL을 쓰긴 한다.)


<br>

## 3. CentOS 리눅스 설치
- 인터넷에서 CentOS8 DVD ISO 파일을 다운로드 받고 이걸 VM의 CD/DVD에 마운트해서 설치한다. GUI 사용으로 설치할수도 있고 워크스테이션으로도 설치 가능. 설치는 생략
- 디스크 파티션도 구성해준다.
  - 리눅스 디스크 파티션은 루트 파티션('/')과 'swap' 파티션 두개만 있어도 운영이 가능하다. 
  - 실전에서는 디스크 파티션을 대략 아래와 같은 형태로 나눈다고 한다.(어디서 많이 본것들..)

| 마운트 포인트 | 권장 크기 | 비고 |
|---|---|---|
| / | 10GB | 루트 파티션 |
| /bin | | 기본 명령어가 들어 있음 |
| /sbin | | 시스템 관리용 명령어가 들어가 있음 |
| /etc | 4GB | 부팅 커널이 저장됨 |
| /media | | 외부 장치를 마운트하기 위해 제공됨 |
| /usr | 설치할 응용 프로그램에 따라.. | 응용 프로그램이 주로 저장됨 |
| /lib | | 프로그램의 라이브러리가 저장됨 |
| /dev | | 장치 파일들이 저장됨 |
| /proc | | 시스템 프로세서 정보, 프로그램 정보, 하드웨어 정보 등 |
| /tmp | 4GB | 임시 파일이 저장됨 |
| /var | 10GB | 로그, 캐시 파일 등이 저장됨 |
| /root | | 시스템 관리자인 root의 홈 디렉터리 |
| /home |  | 사용자별 공간 |
| /lost+found | | 파일 시스템 복구를 위한 디렉터리 |
| swap 파티션 | RAM의 2배 정도 | RAM 부족시 사용되는 공간 |

<br>

  - 루트 파티션과 swap 파티션만 있어도 되는 이유는 나머지 파티션(/bin, /etc, ...)들은 모두 루트 파티션 아래 종속되기 때문이다.

<br>

ServerA 설치는 아래와 같다.

9. `dnf`는 CentOS의 소프트웨어 설치시 사용하는 명령어인데, 이걸 CentOS 8 출시 시점의 소프트웨어가 설치되도록 설정한다. 
  - `/etc/yum.repos.d/`의 내용을 모두 백업하도, `This.repo`파을을 만든 후 Base, AppStream 등에 대해 baseurl, gpgcheck 설정을 작성한다.
  > 이거 책에나온대로 설정했는데, 이대로 하면 내꺼에서는 dnf로 뭘깔아도 python없다고 어쩌고저쩌고 오류가 오지게난다.  원복하였다

<br>

10. 서버에 고정IP도 할당한다. `/etc/sysconfig/network-script`에서 `ifcfg-eth0`에 `BOOTPROTO`, `IPADDR`, `NETMASK`, `GATEWAY`, `DNS1`을 설정한다.(나는 고정IP가 있기때문에 하지 않는다.)
    - `eth0`는 네트워크 장치, `ifcfg-eth0`은 네트워크 설정 파일이다. 자주 사용된다고 함 (책에서는 `eth0` => `ens160`)
  - 설정을 했으면 네트워크 장치를 재부팅해야한다.(난 역시나 안한다.)

  ```bash
  nmcli connection dwon eth0  # 네트워크 장치 시작
  nmcli connection up eth0    # 네트워크 장치 시작
  reboot                      # 컴퓨터 재부팅
  ```
  - 네트워크 정보를 확인해본다
  ```bash
  ifconfig eth0
  ```
  - 근데 aws의 Redhat linux에는 `ifconfig`가 설치되어있지 않다. 두가지 방안이 있다.
    1. `ip addr` 입력
    2. [ifconfig 명령어를 가지고 있는 net-tools 패키지를 설치](https://zetawiki.com/wiki/CentOS_7_ifconfig_%EB%AA%85%EB%A0%B9%EC%96%B4_%EC%97%86%EC%9D%8C)

<br>

11. 보안이 설정된 `SELinux` 기능을 끈다.
  - 설정열기
  ```bash
  vi /etc/sysconfig/selinux
  ```
  - 'SELINUX=enforcing'을 'SELINUX=disabled'로 수정한다.

<br>

14. 방화벽 관련한 패키지인 `firewall-config` 설치한다.
  - https://meyouus.tistory.com/221
  - 이건 X윈도우 용이라고 한다. 나는 yum올 firewalld 설치함. 이후 `firewall-cmd`를 쓸것이다.
  
<br>

- 16. VM을 스냅숏을 뜰 수 있다고 한다.(유료버젼에서만) 나는 그런건 좀 힘들다.

<br>

ServerB도 설치한다. ServerB는 X윈도를 사용하지 않고 텍스트 모드만 사용한다.

6. 우선 `wget`와 몇개 프로그램 설치한다. 
  ```bash
  dnf -y install bind-utils net-tools wget unzip bzip2
  ```
  - 또 dnf 관련된 설정을 커스터마이징한다. 만일을 대비해 기존건 다 백업한다.
```bash
cd /etc/yum.repos.d/

# 백업
mkdir backup
mv *.repo backup

# 재설정
wget http://download.hanbit.co.kr/centos/8/This.repo
ls -l

# 기존 저장소 기록 지우기
dnf clean all
```

<br>

7. ServerA와 마찬가지로 네트워크 설정에서 고정 IP를 할당한다. 똑같은방식으로 과정은 생략
- 이게 결국 VM들 간의 네트워크에서의 고정 IP인건데, 우리도 똑같은 값이다. `ip addr` 해서 `eth0`의 inet 값은 인스턴스의 private IP이다. 

<br>

8. SELinx 끄자 기존과 동일.

<br>

CentOS 클라이언트도 설치한다. 차이점은 아래와 같다.
- 동적 IP 할당
- 자동 파티션 설정
- 9. 에서 root는 못쓰게 막는다. 큰의미없음(`su -` 로 쓰는건 된다. 아예 root로 접속하는게 안되는듯)
- 14. 별도 로그인 없이 접속할 수 있도록 설정할 수 있다.(자동로그인) 근데 난 왜 저게 없지..
```bash
vi /etc/gdm/custom.conf

# [daemon] 아래에 다음 내용 추가
AutomaticLoginEnable=True
AutomaticLogin=centos
```

Windows 클라이언트는 그냥 생략한다.

<br>

## 4. 서버를 구축하는데 알아야 할 필수 개념과 명령어 
- X윈도 환경은 다루지 않는다.

### 4.1 먼저 알아야 할 개념
### 4.1.1 터미널/콘솔에서 시스템 종료
- `poweroff`, `shutdown -P now`, `halt -p`, `init 0`가 있다. `-P`나 `-p` 옵션은 시스템 종료를 의미함.
- 이거 하면 EC2 인스턴스가 '중지' 된다. 이 때, ip나 dns가 elastic이라서 바뀌게된다.
- `shutdown`은 아래와 같이 응용가능
```bash
shutdown -P +10 # 10분 후 종료(P: poweroff)
shutdown -r 22:00 # 오후 10시에 재부팅(r: reboot)
shutdown -c # 예약된 shutdown 취소(c: cancel)
shutdown -k +15 # 현재 접속된 사용자에게 15분후 종료된다는 메시지 보냄. 실제로 종료는 안된다고함;; 겁주기용?
```

<br>

### 4.1.2 재부팅
`shutdown -r now`, `reboot`, `init 6` 등의 명령이 있다

<br>

### 4.1.3 로그아웃
`logout`,`exit` 명령어가 있다

<br>

### 4.1.4 가상 콘솔
/dev 에 가보면 여러 장치가 있는걸 볼 수 있다. 몇개만 보면
- `tty`: 일반 CLI 콘솔
- `ttys`: tty1,2,3... 시리얼 tty
- `pts` : x windows를 위한 가상 콘솔
- `pty`: 외부의 원격 접속을 위한 가상 콘솔

selinux를 disabled 시키면 가상 콘솔인 ttys를 여러개를 돌아가면서 쓸 수 있다. tty는 일종의 모니터라고 생각하면 된다. `open(),` `close()`, `read()`, `write()`같은걸 수행할 수 있는 콘솔이다.

<br>

### 4.1.5 런레벨
`init 0`, `init 6`의 뒤 숫자는 런레벨이라 부른다. 리눅스는 시스템이 가동되는 방법을 7가지 런레벨로 나눈다.
-  `0(Power off)`, `1(Rescue, 시스템 복구 모드)`, `2~4(Multi-User, 텍스트 모드의 다중사용자 모드)`, `5(Graphical, 그래픽 모드 다중 사용자 모드)`, `6(Reboot)` 정도가 있다 Centos는 2,4는 안쓴다고 함
- 아래 명령어로 런레벨 확인 가능하다.
```bash
cd /lib/systemd/system
ls -l runlevel?.target
```
- 각 런레벨 파일은 링크 파일이다. 예를들어 `runlevel0.target`은 `poweroff.target`을 가리킴.
- 현재 시스템에 설정된 런레벨을 확인할 수도 있다.
```bash
ls -l /etc/systemd/system/default.target
# multiuser(3)으로 설정된걸 알 수 있다.
# lrwxrwxrwx. 1 root root 41 May  3 09:00 /etc/systemd/system/default.target -> /usr/lib/systemd/system/multi-user.target
```
- `default.target`도 결국 링크이므로, 링크를 바꾸면 런레벨을 바꿀수도 있따.
```bash
# x windows(6)으로 변경했다
ln -sf /usr/lib/systemd/system/graphical.target /etc/systemd/system/default.target

# ssh로 접속했기때매 아마 의미없을듯
reboot
```




<!-- 
  TODO : 
  EC2 root 게정 활성화하기 :https://goddaehee.tistory.com/193 
-->


