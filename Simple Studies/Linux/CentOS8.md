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

