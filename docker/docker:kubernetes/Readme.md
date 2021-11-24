## 2. 도커 엔진
### 2.1 도커 이미지와 컨테이너
> 이미지와 컨테이너는 도커 엔진에서 사용하는 기본 단위이다.

### 2.1.1 도커 이미지
- 이미지는 컨테이너 생성시 필요한 요소로, 가상 머신 생성시 사용하는 `iso`파일과 비슷한 개념이다.
- 이미지는 여러 개의 계층으로 된 바이너라 파일로 존재하고, 컨테이너의 생성/실행시 `읽기 전용`으로 사용된다.
- 이미지의 이름은 [저장소 이름]/[이미지 이름]:[태그] 형태로 구성된다. 저장소 이름은 일반적으로 생략
```
alicek106/ubuntu:14.04    ubuntu:latest
```

<br>

### 2.1.2 도커 컨테이너
- 도커 이미지를 이용하면 이미지의 목적에 맞는 파일이 들어 있는 파일 시스템과 격리된 시스템 자원 및 네트워크를 사용할 수 있는 **독립된 공간**을 생성할 수 있는데, 이것을 `도커 컨테이너`라 한다.
- 도커 컨테이너는 도커 이미지의 목적에 맞도록 사용되는것이 일반적이다.
- 컨테이너는 이미지를 **읽기 전용**으로 사용하고 이미지에서 변경된 사항만 **컨테이너 계층**에 저장하므로, 컨테이너에서 뭘 하던 이미지는 영향이 없다.
- 컨테이너는 각기 독립된 파일시스템을 제공받으며 호스트와 분리돼 있어, 컨테이너에 무엇을 해도 호스트나 다른 컨테이너에는 아무런 영향을 주지 않는다.

<br>

### 2.2 도커 컨테이너 다루기
### 2.2.1 컨테이너 생성
- docker `run` [OPTIONS] IMAGE [COMMAND] [ARG...] 명령어로 컨테이너의 실행이 가능하다.
```
docker run -i -t ubuntu:14:04
```
- `-i` 옵션은 상호 입출력을, `-t` 옵션은 tty를 활성화해 bash shell을 사용하도록 컨테이너를 설정한다.
- 컨테이너 내부에서 빠져나오는 방법은 아래와 같다
    - 컨테이너 셸에 `exit`입력 (컨테이너 정지)
    - Ctrl + D 입력 (컨테이너 정지)
    - Ctrl + P, Q 입력 (**컨테이너 정지 안함**)
- run 명령어는 아래와 같은 명령어를 한번에 실행하는 것이다
    1. docker `pull` (이미지가 없을 때)
    2. docker `create` (컨테이너 생성)
    3. docker `start`   (컨테이너 실행)
    4. docker `attach`  (컨테이너 내부로 접속, -i -t 옵션 사용시)
- docker statrt [컨테이너 ID] 에서 ID는 앞의 2~3자리만 입력해도 실행된다.
```
docker start 169a848678c3
docker start 169
```

<br>

### 2.2.2 컨테이너 목록 확인
- docker `ps` [OPTIONS]로 컨테이너 목록을 확인할 수 있다. `-a` 옵션은 정지된 컨테이너까지 출력한다.
- 출력되는 목록은 아래와 같다
    - CONTAINER ID
    - IMAGE
    - COMMAND
        - 컨테이너가 시작될 때 실행될 명령어. 대부분의 이미지에 미리 내장돼 있기 때문에 별도로 설정할 필요는 없다. 리눅스 컨테니어는 보통 "/bin/bash"를 실행해 상호 입출력이 가능한 셸 환경을 사용할 수 있다.
        - docker run/create 명령어의 맨 끝 [COMMAND] 부분에 입력해서 컨테이너를 생성할 때 덮어쓸 수 있다.
        ```
        docker run -i -t ubuntu:14.04 echo hello world!
        ```
        - 예로 위의 명령어로 실행된 컨테이너는 "/bin/bash"를 "echo hello world"가 덮어쓰기 때문에 hello world만 출력 후 종료된다. 
    - CREATED
    - STATUS
    - PORTS
        - 컨테이너가 개방한 포트와 호스트에 연결한 포트를 나열한다.
    - NAMES

<br>

### 2.2.3 컨테이너 삭제
- docker `rm` [OPTIONS] CONTAINER [CONTAINER...] 명령어로 컨테이너를 삭제할 수 있다.  -f는 실행중인 컨테이너라도 삭제할 수 있다.
```
docker rm -f mycentos 
```
- 일일이 삭제하기 귀찮을 땐 `prune` 명령어로 모든 정지된 컨테이너를 삭제할 수 있다. -f는 진짜 삭제하냐고 묻지 않게한다.
```
docker container prune -f
```
- docker ps의 -a -q 옵션으로도 삭제할 수 있다. -q는 컨테이너의 ID만 출력하는 역할을 한다.
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

<br>

### 2.2.4 컨테이너 외부에 노출
- 컨테이너는 가상 머신과 마찬가지로 `가상 IP 주소`를 할당받는다. 기본적으로 도커는 컨테이너에 172.17.0.x의 IP를 순차적으로 할당한다.
```
docker run -i -t --name linux ubuntu:14.04

ifconfig

=====
eth0 --> 172.17.0.2

lo   --> 127.0.0.1
```
- 도커의 NAT IP인 127.17.0.2를 할당받은 [eth0](https://neo-blog.tistory.com/14) 인터페이스와 로컬 호스트인 lo 인터페이스가 있다. 아무런 설정이 없다면 이 컨테이너는 127.17.0.2로 도커가 설치된 호스트에서만 접근 가능하다.(Docker for Mac에서는 호스트에서도 접근 불가)
- 외부에 컨테이너를 노출하기 위해서는 **eth0의 IP와 포트**를 호스트의 IP와 포트에 바인딩해야 한다. -p [호스트포트]:[컨테이너포트] 로 연결 가능하다.
- 아래의 예제는 ubuntu 컨테이너에 apahce 웹서버를 띄우고 호스트의 7777 포트와 웹서버가 실행되는 컨테이너의 80포트를 연결하는 예다.
```
docker run -it -p 7777:80 ubuntu:14.04

# apt-get update
# apt-get install apache2 -y
# service apache2 start
```

<br>

### 2.2.5 컨테이너 애플리케이션 구축
여기부터.. 할게많아서 내일하는걸로


### 2.2.6 도커 볼륨
### 2.2.7 도커 네트워크
### 2.2.8 컨테이너 로깅
### 2.2.9 컨테이너 자원 할당 제한

<br>

### 2.3 도커 이미지
- 도커의 모든 컨테이너는 이미지를 기반으로 생성되므로 이미지를 이해하는것이 중요하다.
- 도커 이미지는 npm처럼 저장소에 up/download 할 수 있는데, 대표적인(기본) 저장소는 Docker Hub가 있다.
- DockerHub은 Public Repository는 무료, Privat Repository는 무료계정은 1개까지 가능하다.
- `docker search` 명령어로 도커 허브의 이미지를 검색할 수 있다.
```bash
# docker search rhehdrla

======
NAME                     DESCRIPTION                STARS     OFFICIAL   AUTOMATED
rhehdrla/my-image-name   image for testing docker   0  
```
<br>

### 2.3.1 도커 이미지 생성
- 도커로 개발하는 경우 컨테이너에 직접 애플리케이션을 위한 환경을 구축하고 이미지를 생성해서 사용한다.
- ubuntu 공식 이미지를 이용해 직접 커스텀 이미지를 생성해보자.
1. 도커 컨테이너 실행 및 환경셋팅
``` bash
# docker run -it --name commit_test ubuntu:14.04
# echo test_first! >> first
# exit
```

2. `docker commit`으로 이미지 생성
```bash
# docker commit [OPTIONS] CONTAINER [REPOSITORY:[TAG]]
```
```bash
# docker commit \
-a "rhehdrla" -m "first commit" \
commit_test \
commit_test:first

======
sha256:12a60b0b321c7f9c7ab4ad47311d7b63ba47ca73f253a6d0d43ddc45a3d7db3d
```
- `-a`옵션은 author를 뜻하고, `-m` 은 커밋 메시지다

3. `docker images`로 이미지 확인
```bash
# docker iamges

======
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
commit_test   first     12a60b0b321c   10 seconds ago   187MB
ubuntu        14.04     7304c635fe52   5 weeks ago      187MB
```

4. `commit_test:first`를 실행시키고 변경 후 다시 이미지로 커밋한다.
```bash
# docker run -i -t --name commit_test2 commit_test:first
# echo test_second! >> second
# exit

# docker commit \
-a "rhehdrla" -m "second commit" \
commit_test2 \
commit_test:second

# docker images

======
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
commit_test   second    fb82fecec95c   7 seconds ago   187MB
commit_test   first     12a60b0b321c   2 minutes ago   187MB
ubuntu        14.04     7304c635fe52   5 weeks ago     187MB
```
- ubuntu -> commit_tst:first -> commit_test:second 순으로 잘 생성된것이 확인된다. 각 이미지는 거의 차이가 없어 SIZE는 동일하다.

<br>

### 2.3.2 이미지 구조 이해
- 이미지는 어떻게 만들어지는걸까? `docker inspect`로 이미지를 확인해보자
> ! docker inspect [IMAGE] 실행 시 이미지 명과 동일한 컨테이너명이 있으면 컨테이너에 대해 명령어를 수행한다. `--type`옵션을 붙이면 이미지에 대해 먼저 실행
```bash
# docker inspect ubuntu:14.04
# docker inspect commit_test:first
# docker inspect commit_test:second
```

- 실행 후 결과 중 Layer 보면 아래와 같다
```json
// ubuntu:14.04
"Layers": [
    "sha256:59199d90878e4fda42bcd8a43bfe3ecd964265b2008746c6b18ae3d6ca659033",
    "sha256:adbc84b28930199a1937b64d4c2eb433b09ddf5b917eee0ba817bc85d94684c7",
    "sha256:f244924ab727eda9f71f93dad47e0b4bad8e6e6ee9471374134d725102a26a16"
]
// commit_test:first
"Layers": [
    "sha256:59199d90878e4fda42bcd8a43bfe3ecd964265b2008746c6b18ae3d6ca659033",
    "sha256:adbc84b28930199a1937b64d4c2eb433b09ddf5b917eee0ba817bc85d94684c7",
    "sha256:f244924ab727eda9f71f93dad47e0b4bad8e6e6ee9471374134d725102a26a16",
    "sha256:78126c007aa22ef50996320d910cfab53a7a68453ff303ff3e441188707a2542"
]

// commit_test:second
"Layers": [
    "sha256:59199d90878e4fda42bcd8a43bfe3ecd964265b2008746c6b18ae3d6ca659033",
    "sha256:adbc84b28930199a1937b64d4c2eb433b09ddf5b917eee0ba817bc85d94684c7",
    "sha256:f244924ab727eda9f71f93dad47e0b4bad8e6e6ee9471374134d725102a26a16",
    "sha256:78126c007aa22ef50996320d910cfab53a7a68453ff303ff3e441188707a2542",
    "sha256:d81ec3a705ed29403575976cbe4c0fc87075e1258e001736fe2e9134b1aacddd"
]
```
- commit-first가 ubuntu의 레이어를 공유하고, commit-second가 commit-first 의 레이어를 공유한다.
- 이 말은 **이미지를 커밋할 때 컨테이너에서 변경된 사항만 새로운 레이어로 저장하고 그 레이어를 포함한 이미지를 생성한다는 것이다.** 저장공간 역시 중복되는 레이어는 한개만 저장되어 있기 때문에 레이어를 공유하는 이미지가 여러개가 생겨도 디스크 공간 차지는 (원본 이미지 크기 + 컨테이너들에 추가된 레이어들의 크기) 정도만 한다. 
- commit-second는 commit-first의 레이어를 공유하기때문에, commit-second 컨테이너가 사용중인 동안은 commit-first를 지울 수 없다.
```bash
# docker rmi commit_test:first

======
Error response from daemon: conflict: unable to remove repository reference "commit_test:first" (must force) - container 0be2e9e2f7e8 is using its referenced image 12a60b0b321c
```
- `-f`옵션을 추가해 강제로 지울 수 있으나, 이미지 레이어 파일이 실제로 삭제되지 않고 이름만 삭제되므로 의미는 없다. 지우려면 아래와 같이 컨테이너 실행정지 후 지워야한다 지워야한다.
```bash
# docker stop commit_test2 && docker rm commit_test2
# docker rmi commit_test:first
======
Untagged: commit_test:first
```
> 못지우는 이미지를 강제로 지우면 목록에서 `<none>`으로 보이는데, dangling image라고 한다. 이런 이미지들은 docker rmi $(docker images -f "dangling=true" q)로 지운다.


### 2.3.3 이미지 추출
### 2.3.4 이미지 배포

### 2.4 Dockerfile
### 2.4.1 이미지를 생성하는 방법
### 2.4.2 Dockerfile 생성
### 2.4.3 Dockerfile 빌드
### 2.4.4 기타 Dockerfile 명령어
### 2.4.5 Dockerfile로 빌드할 때 주의할 점

### 2.5 도커 데몬
### 2.5.1 도커의 구조
### 2.5.2 도커 데몬 실행
### 2.5.3 도커 데몬 설정

### 2.5.3.2 도커 데몬에 보안 적용 - 생략함
### 2.5.3.3 도커 스토리지 드라이버 변경 - 읽다가 넘어감
### 2.5.4 도커 데몬 모니터링
### 2.5.4.1 도커 데몬 디버그 모드
```
journalctl -u docker
```
### 2.5.4.2 events stats, system df 명령어

### 2.5.4.3 CAdvisor


### 2.5.5 Remote API 라이브러리를 이용한 도커 사용
### 2.5


## 4.도커 컴포즈
### 4.1 도커 컴포즈를 사용하는 이유
### 4.2 도커 컴포즈 설치
### 4.3 도커 컴포즈 사용
### 4.3.1 도커 컴포즈 기본 사용법
### 4.3.2 도커 컴포즈 활용
