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
- [docker run 관련 옵션](https://khj93.tistory.com/entry/Docker-Docker-option-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A9%EB%A1%9D)

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
- 서비스에는 여러개의 프로세스(웹서버, was, db...)가 필요하다. 이걸 하나의 컨테이너에 다 실행할 수도 있지만 Docker에서 권장하는건 ***하나의 컨테이너당 하나의 프로그램 실행이다.***
- 이유는 컨테이너의 독립성과 각 프로그램의 버전관리 편의, 모듈 사용성 증대등
- 컨테이너 애플리케이션은 **포그라운드로써 동작하는 프로그램**(터미널을 차지하는 프로그램, 컨테이너 목록에서 `COMMAND`로 실행하는 것)이 반드시 있어야 한다. 
    - 예를들어 `ubuntu:14.04`로 컨테이너 실행시 `/bin/bash`를 실행한다. 이게 포그라운드로서 계속 돌고있기때문에 컨테이너가 동작하는 것
    - `-it`로 상호작용이 가능한 쉘 환경을 사용한다.
    - `-d`로 입출력이 없는 상태로, 컨테이너 내부에서 프로그램이 터미널을 차지하는 포그라운드로 실행된다. `-d`일 경우 반드시 컨테이너에서 프로그램이 실행되어야 한다.
    - `mysql`은 하나의 터미널을 차지하는 `mysqld`를, wordpress는 `apache2-foreground`를 실행한다.
- `attach` vs `exec`
    - attach는 컨테이너에서 실행중인 프로그램의 출력 로그를 보게 된다.
    - exec는 컨테이너 내부의 쉘을 실행할 수 있다.(mysql 컨테이너에서 /bin/bash ) 이 때 `-it` 옵션을 전달 해줘야 입출력을 할 수 있따.
        - https://wooono.tistory.com/348
        - `-i`, `--interactive`: 표준 입력(stdin)을 활성화하며, 컨테이너와 연결(attach)되어 있지 않더라도 표준 입력을 유지합니다. 보통 이 옵션을 사용하여 Bash 에 명령을 입력합니다.
        - `-t`, `--tty`: TTY 모드(pseudo-TTY)를 사용합니다. Bash를 사용하려면 이 옵션을 설정해야 합니다. 이 옵션을 설정하지 않으면 명령을 입력할 수는 있지만, 셸이 표시되지 않습니다.
    - mysql 컨테이너에 `exec`로 들어가서 놀다가 exit으로 나와도 컨테이너는 종료되지 않는데, `mysqld` 프로세스가 여전히 컨테이너 안에서 포그라운드로 동작하고 있기 때문
- `--link`를 이용하면 컨테이너끼리 연결할 수 있다.(도커 엔진 내부에서 연결되는듯, NAT로 할당받은 내부IP나 포트같은거 내가 몰라도 됨)

<br>

### 2.2.6 도커 볼륨
<!-- TODO 이거 정리해야해 -->


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
$ docker search rhehdrla

======
# NAME                     DESCRIPTION                STARS     OFFICIAL   AUTOMATED
# rhehdrla/my-image-name   image for testing docker   0  
```
<br>

### 2.3.1 도커 이미지 생성
- 도커로 개발하는 경우 컨테이너에 직접 애플리케이션을 위한 환경을 구축하고 이미지를 생성해서 사용한다.
- ubuntu 공식 이미지를 이용해 직접 커스텀 이미지를 생성해보자.
1. 도커 컨테이너 실행 및 환경셋팅
``` bash
$ docker run -it --name commit_test ubuntu:14.04
# echo test_first! >> first
# exit
```

2. `docker commit`으로 이미지 생성
```bash
$ docker commit [OPTIONS] CONTAINER [REPOSITORY:[TAG]]
```
```bash
$ docker commit \
-a "rhehdrla" -m "first commit" \
commit_test \
commit_test:first

======
# sha256:12a60b0b321c7f9c7ab4ad47311d7b63ba47ca73f253a6d0d43ddc45a3d7db3d
```
- `-a`옵션은 author를 뜻하고, `-m` 은 커밋 메시지다

3. `docker images`로 이미지 확인
```bash
$ docker iamges

======
# REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
# commit_test   first     12a60b0b321c   10 seconds ago   187MB
# ubuntu        14.04     7304c635fe52   5 weeks ago      187MB
```

4. `commit_test:first`를 실행시키고 변경 후 다시 이미지로 커밋한다.
```bash
$ docker run -i -t --name commit_test2 commit_test:first
# echo test_second! >> second
# exit

$ docker commit \
-a "rhehdrla" -m "second commit" \
commit_test2 \
commit_test:second

$ docker images

======
# REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
# commit_test   second    fb82fecec95c   7 seconds ago   187MB
# commit_test   first     12a60b0b321c   2 minutes ago   187MB
# ubuntu        14.04     7304c635fe52   5 weeks ago     187MB
```
- ubuntu -> commit_tst:first -> commit_test:second 순으로 잘 생성된것이 확인된다. 각 이미지는 거의 차이가 없어 SIZE는 동일하다.

<br>

### 2.3.2 이미지 구조 이해
- 이미지는 어떻게 만들어지는걸까? `docker inspect`로 이미지를 확인해보자
> ! docker inspect [IMAGE] 실행 시 이미지 명과 동일한 컨테이너명이 있으면 컨테이너에 대해 명령어를 수행한다. `--type`옵션을 붙이면 이미지에 대해 먼저 실행
```bash
$ docker inspect ubuntu:14.04
$ docker inspect commit_test:first
$ docker inspect commit_test:second
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
- commit:second는 commit:first의 레이어를 공유하기때문에, commit:second 컨테이너가 사용중인 동안은 commit:first를 지울 수 없다.
```bash
$ docker rmi commit_test:first

======
# Error response from daemon: conflict: unable to remove repository reference "commit_test:first" (must force) - container 0be2e9e2f7e8 is using its referenced image 12a60b0b321c
```
- `-f`옵션을 추가해 강제로 지울 수 있으나, 이미지 레이어 파일이 실제로 삭제되지 않고 이름만 삭제되므로 의미는 없다. commit:second 컨테이너를 정지/제거하고 commit:first 이미지를 제거하면 아래와 같은 메시지를 받는다.
```bash
$ docker stop commit_test2 && docker rm commit_test2
$ docker rmi commit_test:first
======
# Untagged: commit_test:first
```

- Untagged의 의미는 실제 레이어 파일을 삭제하지 않고 레이어에 부여된 이름만 삭제했음을 의미한다. 삭젤하려는 레이어를 참조중인 이미지가 존재하기 때문. 결국 하위 이미지를 지우지 않고 상위 이미지는 완전히 지울수는 없다. 아래와 같이 commit:second를 지우면 비로소 실제 이미지를 제거할 수 있게된다.

```bash
$ docker rmi commit_test:second

======
# Untagged: commit_test:second
# Deleted: sha256:fb82fecec95ca0dc4d48fe691c2872f56b48b44920658940a9f10e690f6448fd
# Deleted: sha256:2926df9220caf50085fdd614a98bba217e78e56e4475b0720b1d3edbd616a726
# Deleted: sha256:12a60b0b321c7f9c7ab4ad47311d7b63ba47ca73f253a6d0d43ddc45a3d7db3d
# Deleted: sha256:bdccd66a95b7fd62f8e06c1f26cb51f18b1f7f6c36ff3b4dbbad0e4dff8fa764
```


> 못지우는 이미지를 강제로 지우는 등 이미지 생성/삭제에서 오류가 발생하면 해당 이미지는 목록에서 `<none>`으로 보이는데, `dangling image`라고 한다. 이런 이미지들은 `docker rmi $(docker images -f "dangling=true" q)`로 지울 수 있다.

> ❗️ `docker image prune`으로 더 쉽게 지울수 있다.

<br>

### 2.3.3 이미지 추출
- `save` 명령어를 이용하면 이미지를 추출해 파일로 저장할 수 있다. `-o` 옵션은 추출할 파일명이된다.
```bash
$ docker save -o ubuntu_14_04.tar ubuntu:14.04
```
- 추출된 이미지는 `load` 명령어로 다시 도커에 로드할 수 있다. 파일에는 추출한 이미지의 모든 메타데이터가 포함되므로 **이전 이미지와 완전히 동일한 이미지가 도커 엔진에 생성된다.**
```bash
$ docker load -i ubuntu_14_04.tar
```
- 비슷한 명령어로 **컨테이너를 추출/저장** 하는 `export`, `save`가 있다.  `commit`으로 컨테이너를 이미지로 만들면 컨테이너 변경사항 외 컨테이너 생성시 설정한 커맨드같은 컨테이너 설정이 포함되는데, `export`는 컨테이너 및 이미지에 대한 설정 정보를 저장하지 않는다. 이 말은 ***기존 이미지의 나눠진 레이어를 하나로 통합한다는 말이다.*** 추출된 이미지를 `import`로 다시 저장하면서 이미지 이름을 새로 설정할 수 있다.

```bash
$ docker run --name test ubuntu:14.04

$ docker export -o test.tar test
$ docker import test.tar test

$ docker inspect test

======
# ...
# "Layers": [
#     "sha256:86c4a57a558b5672935b23c1a6c43c5f205ce40654bc072110409b869e94b1e3"
# ]
# ...
```
- 이미지를 파일로 관리하는것은 별로 좋은방법이 아니다.

<br>

### 2.3.4 이미지 배포
- 브라우저로 docker hub에 접속하여 Repository를 만든다. 여기서는 **my-image-name** 으로 생성했다.
- 도커허브에 배포하는 법만 알아본다. 우선 `commit`으로 배포할 이미지를 생성한다
```bash
$ docker run -it  --name commit_container1 ubuntu:14.04
# echo first push >> test

$ docker commit commit_container1 my-image-name:0.0
```

- `tag` 명령어로 이미지의 이름을 추가할 수. `docker tag [기존이미지먕] [새로운이미지명]`. **기존 이름이 사라지진 않고 같은 이름을 가리키는 새로운 이름이 추가되는 것이다.** 이름은 [사용자이름]/[저장소이름]:버전 으로 만든다ㅏ.
```bash
$ docker tag my-image-name:0.0 rhehdrla/my-image-name:0.0
```
- `login`으로 로그인을 할 수 있다.
```bash
$ docker login

... username/pw 를 입력한다.
```

- `push` 명령어로 이미지를 저장소에 올린다. my-image-name Repo로 알아서 업로드한다.
```bash
$ docker push rhehdrla/my-image-name:0.0
```
- 브라우저에서 레포지토리를 들어가 업로드를 확인해보거나 아래 명령어로 docker hub에 올라갔는지 확인 가능하다.
```bash
$ docker search rhehdrla 

======
# NAME                     DESCRIPTION                STARS     OFFICIAL   AUTOMATED
# rhehdrla/my-image-name   image for testing docker   0     
```

- 업로드한 이미지는 이제 어디서든 자유롭게 `pull`로 받아 사용 가능하다.

<br><br>

### 2.4 Dockerfile
### 2.4.1 이미지를 생성하는 방법
- `Dockerfile`은 앞서 이미지를 생성하는 "**컨테이서 생성 - 에플리케이션 설치, 설정변경 - 컨테이너 커밋**"의 작업을 파일로 만들어 `build`명령어 하나로 생성할 수 있게 하는 파일이다. 
- 보통 Dockerhub에 이미지를 보면 대부분 해당 이미지를 빌드하는 Dockerfile도 함께 제공한다. Dokerfile을 이용하면 애플리케이션에 필요한 패키지 설치 등을 명확히하고 이미지 생성을 자동화해, 배포를 쉽게 할수 있게된다.

<br>

### 2.4.2 Dockerfile 작성
### 2.4.3.1 이미지 생성
- 간단한 Dockerfile을 작성하고 명령어에 대해 알아본다. 
```bash
생성할 이미지에 넣을 html 파일 생성
# mkdir dockerfile && cd dockerfile
# echo test >> test.html

# vi Dockerfile
```
```Dockerfile
$ dockerfile

FROM ubuntu:14.04
MAINTAINER rhehdrla
LABEL "purpose"="practice"
RUN apt-get update
RUN apt-get install apache2 -y
ADD test.html /var/www/html
WORKDIR /var/www/html
RUN ["/bin/bash", "-c", "echo hello >> test.html"]
EXPOSE 80
CMD apachectl -DFOREGROUND
```
- Dockerfile로 실행된 이미지는 ubuntu 컨테이너에 apache를 설치해 test.html을 호스팅한다. 또한 80포트를 외부에 공개하는 설정이다.
- `FROM` : 생성할 이미지의 베이스 이미지
- `MAINTAINER` : 이미지를 생성한 개발자 정보. 현재 deprecated상태로 아래와 같이 LABEL에 작성할 수 있다.
    - LABEL maintainer "rhehdrla <rhehdrla@naver.com>"
- `LABEL`: 이미지에 메타데이터를 추가한다. '키:값' 형태로 여러개 추가할 수 있으며 `inspect`명령어로 확인 가능하다.
- `RUN` 
    -  컨테이너 내부에서 명령어를 실행한다. 빌드 과정에서 추가적으로 별도 명령어를 받을수 없어, -y 와 같은 옵션을 설정해준다. 별도 명령어를 입력받아야 하는 상황이 되면 에러가 나며 빌드가 실패한다.
    - "RUN ["실행 가능한 파일", "명령줄 인자 1", "명령줄 인자 2",...] 형태로 작성한다.
- `ADD` : 파일을 이미지에 추가한다. 추가하는 파일은 Dockerfile이 위치한 컨텍스트에서 가져온다. 배열형태로 "[파일1,파일2,... , "추가할 컨테이너위치"]" 형태로 여러개의 파일을 한번에 옮길수도 있다.
- `WORKDIR`: 명령어를 실행할 디렉터리를 나타낸다. cd 와 같다고 생각해도 무방한듯하다.
- `EXPOSE` : 빌드할 이미지에서 노출할 포트를 설정한다. 컨테이너를 생성하는 `run`에서 모든 노출된 컨테이너의 포트를 호스트에 퍼블리시하는 `-P` 플래그와 함께 사용된다.
- `CMD`
    - **컨테이너가 시작될 때마다 실행할 명령어로 Dockerfile에서 한 번만 사용할 수 있다.** 여기서는 아파치 웹서버를 실행하는데, 아파치 웹서버는 하나의 터미널을 차지하는 포그라운드 모드로 실행되므로, 컨테이서 생성시 `-d`를 이용해 detached 모드로 컨테이너를 생성해야 한다.
    - CMD는 run 뒤의 명령줄과 같은데, 결국 컨테이너 생성시 커맨드 명령줄 인자를 입력하면 CMD는 덮어써진다.
    - CMD 입력은 ["실행 가능한 파일", "명령줄인자 1", "2", ]의 배열 형태로도 사용할 수 있고, `ENTRYPOINT`의 명령줄 인자로 사용될 수도 있다.

<br>

### 2.4.3 Dockerfile 빌드
- `build` 명령어를 이용해 Dockerfile을 빌드할 수 있다. `-t` 옵션은 생성될 이미지의 이름을 지정한다.
```bash
빌드
$ docker build -t mybuild:0.0 ./

실행
$ docker run -d -P --name myserver mybuild:3.0
```
- label로 지정한 내용을 이용해 `--filter` 옵션으로 필터링 할 수 있다.
```bash
$ docker images --filter "label=purpose=practice"
```

<br>

### 2.4.3.2 빌드 과정 살펴보기
- 2.4.3.1 의 빌드 실행시 출력되는 내용중 아래의 내용이 있다.
```
Sending build context to Docker daemon 3.584kb
...
```
- 빌드 과정에서 Dockerfile에서 빌드시 경로를 ./로 지정했는데, 이 디렉토리는 빌드 컨텍스트로 지정되어 해당 위치의 모든 파일을 Docker demon으로 모두 전송한다. 따라서 루트폴더 등을 빌드 컨텍스트로 지정하면 큰일날 수 있다.
- 이를 방지하기 위해 `.dockerignore`파일을 작성할 수 있다. `.gitignore`과 거의 비슷하고, 반드시 Dockerfile 과 같은곳에 위치해야한다.
- Dockerfile은 각 명령어를 Step으로 나눠 한 단계씩 실행하고, 이를 이미지로 커밋한다. 해당 이미지로 intermediate container를 생성하고, Step 이 지날때마다 이전단계의 intermediate container를 제거한다.

- Dockerfile의 빌드 과정중 이전과 동일한 빌드 과정이 있으면 매 Step의 캐시 이미지를 이용한다. 빌드시 이전과 같은 내용까지는 캐시를 이용해 생성하고 차이가 있는 부분부터 새로 빌드한다. Cache는 편리하지만 문제가 될 수 있는데, 예를들면 `RUN git clone ...` 같은 명령어에서 그렇다. 같은 명령어를 수행하므로 도커엔진은 캐시로 빌드를 하지만 실제 원격지의 내용이 바뀌어 다시 clone해야 할 수 있기 때문이다. 이럴땐 빌드에 `--no-cache` 옵션을 이용한다
```bash
$ docker build --no-cache -t mybuild:0.0 .
```
- 또한 캐시로 사용할 이미지를 지정할 `--cache-from [이미지]`옵션으로 지정할 수 있다. 다음은 docker hub의 nginx:latest 이미지를 캐시로 사용하는 Dockerfile 빌드 명령어다.
```bash
$ docker build --cache-from nginx -t my_extend_nginx:0.0 .
```

<br>

### 2.4.3.3 멀티 스테이지를 이용한 Dockerfile 빌드
- 17.05 버전 이상을 사용하는 도커 엔진이라면, 이미지의 크기를 줄이기 위해 멀티 스테이지(Multi-stage) 빌드 방법을 사용할 수 있다. **멀티 스테이지 빌드는 하나의 Dockerfile 안에 여러개의 FROM 이미지를 정의**함으로써, 완료시 최종적으로 **생성될 이미지의 크기를 줄이는 역할**을 한다.
```Dockerfile
FROM golang
ADD main.go /root
WORKDIR /root
RUN go build -o /root/mainApp /root/main.go

FROM alpine:latest
WORKDIR /root
COPY --from=0 /root/mainApp .
CMD ["./mainApp"]
```
- 1번째 `FROM`에서는 golang 이미지에 main.go 파일을 넣고  go파일의 빌드를 수행하는 이미지를 생성한다.. 2번째 `FROM`에서는 `COPY`를 이용해 첫 번째 이미지의 go파일 빌드 결과물을 root 디렉토리에 넣는다. 이렇게하면 golang 이미지를 사용했을때보다 최종 결과물이 alpine 이미지를 사용했으므로 빌드 결과물의 용량이 800Mb -> 6Mb로 줄어들게 된다.
- `--from=0`에서 0는 참조할 `BUILD`문 이미지의 순서다. `FROM`에 as로 alias를 지정하면 지정한 문자로 참조 가능하다.
```Dockerfile
FROM golang as buildr
ADD main.go /root
WORKDIR /root
RUN go build -o /root/mainApp /root/main.go

FROM alpine:latest
WORKDIR /root
COPY --from=builder /root/mainApp .
CMD ["./mainApp"]
```

<br>

### 2.4.4 기타 Dockerfile 명령어
### 2.4.4.1 `ENV`, `VOLUME`, `ARG`, `USER`
### 1\. `ENV` 
- Dockerfile에서 상될 환경변수를 지정. 설정한 환경변수는 ${ENV_NAME} / $ENV_NAME으로사용 가능하다. 아래는 test라는 환경변수에 /home을 적용한 예제다
```Dockerfile
FROM ubuntu:14.04
ENV test /home
WORKDIR $test
RUN touch $test/mytouchfile
```
- `run`으로 실행시 `-e`옵션으로 같은 이름으로 환경변수가 들어오면 덮어씌워진다.
- 환경변수는 컨테이너 내부에서도 사용 가능하다. 
```bash
$ docker build -t envtest ./
$ docker run -it --name test -e test=myvalue envtest
# echo $test
myvalue
```
- 환경변수 사용시 참조하는 환경변수 값의 설정 여부에 따라 기본값을 설정할 수 있다. `${env_name:-value}`, `${env_name:+value}`로, 중간에 `-`면 `env_name` 미설정시 `value`를 기본값으로 사용하고, `+`면 `env_name` **설정시** `value`를 기본값으로 사용한다. 
```Dockerfile
FROM ubuntu:14.04
ENV env env_value
RUN echo ${env:-value} / ${env:+value} / ${env2:-value} / ${env2:+value}

==> env_value / value / value / 
```

<br>

### 2. VOLUME
- 빌드된 이미지로 컨테이너 생성 시 **호스트와 공유할 컨테이너 내부의 디렉터리를 설정**한다. 배열을 사용해 여러개를 한꺼번에 설정 가능하다. 다음은 컨테이너의 /home/volume 디렉터리를 호스트와 공유하게한다.
```Dockerfile
FROM ubuntu:14.04
RUN mkdir /home/volume
RUN echo test >> /home/volume/testfile
VOLUME /home/volume
```

```bash
$ docker build -t myvolume
$ docker run -itd --name volume_test myvolume

$ docker volume ls

======
# DRIVER   VOLUME NAME
# local    3d26fa42......
```
- 어떻게 사용하는지는 아직 잘 모르겠다..ㅎㅎ

<br>

### 3. ARG
- `build` 명령어 실행시 추가로 입력받아 **Dockerfile 내에서 사용될 변수**의 값을 설정. '[키]=[값]'의 형태로 받으며, `build` 명령어 실행시 `--build-arg` 옵션 뒤에도 설정할 수 있다. 이때 Dockerfile 내부의 ARG와 키값이 같으면 역시 덮어써진다.
```Dockerfile
FROM ubuntu:14.04
ARG my_arg
ARG my_arg2=value2
RUN touch ${my_arg}/mytouch
```
```bash
$ docker build --build-arg my_arg3=motiveko -t myarg:0.0 .
```

<br>

### 4. USER
- `USER` 로 컨테이너 내에서 사용될 사용자 이름이나 UID를 설정하면 그 아래의 명령어는 해당 사용자의 권한으로 실행된다. 일반적으로 `RUN`으로 사용자의 그룹/계정 생성 후 사용한다. 없으면 root권한으로 실행한다.

> ❗️ **컨테이너 내부에서 root 권한을 사요하지 않는것이 좋다**. 컨테이너 내에서 root권한을 가지면 호스트의 root 권한을 가진다는것을 의미하기 때문. 컨테이너가 호스트와 volume등을 공유하면 컨테이너 내부에서 공유된 root소유의 디렉터리를 맘대로 조작할 수 있게된다.

<br>

### 2.4.4.2 `Onbuild`, `Stopsignal`, `Healthcheck`, `Shell`
### 1. ONBUILD
- 빌드된 이미지를 기반으로 하는 다른 이미지가 Dockerfile로 실행될 때 실행할 명령어를 추가한다. 즉, **`ONBUILD`가 있는  Dockerfile로 이미지를 빌드한 후, 이 이미지를 바탕으로 다른 이미지를 빌드할 때 실행된다.**
```Dockerfile
# vi Dockerfile 1
FROM ubuntu:14.04
RUN echo "this is onbuild test"
ONBUILD RUN echo "onbuild" >> /onbuild_file
```
```bash
$ docker build ./ -t onbuild_test:0.0

# ...
# Step 3/3 : ONBUILD run echo "onbuild" >> /onbuild_file
# ...
```
- 이 이미지는 컨테이너로 띄워서 들어가도 onbuild_file을 찾을 수 없다. 이 이미지를 기반으로 새로운 이미지를 빌드해야만한다.
```Dockerfile
# vi Dockerfile2
FROM onbuild_test:0.0
RUN echo "this is child img!"
```
```bash
$ docker build -f ./Dockerfile2 ./ -t onbuild_test:0.1

# ... 
# Step 1/1 : RUN echo "onbuild" >> /onbuild_file
# ...
```
- `ONBUILD` 에 정의된 명령어가 실행됬음을 확인할 수 있다. 컨테이너를 띄우고 들어가면 root 디렉토리에 onbuild_file이 생겼음을 확인할 수 잇다.
- `ONBUILD`는 결국 자식 이미지가 사용할 명령어를 추가하는 명령언데, 활용법 중 하나는 이미지가 빌드시 활용할 소스코드를 `ONBUILD ADD` 명령어로 추가해 좀 더 깔끔하게 Dockerfile을 사용하게 하는것이다.  예를 들면 도커 이미지중 Maven 이미지는 아래와 같이 ONBUILD를 활용한다.

```Dockerfile
# ONBUILD가 적용된 메이븐 이미지
FROM maven:3-jdk-8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ONBUILD ADD . /usr/src/app
ONBUILD RUN mvn install
```

<br>

### 2. STOPSIGNAL 
- 컨테이너가 정지될 때 사용될 시스템 콜의 종류를 지정한다. 다루진 않는다.

<br>

### 3. HEALTHCHECK
- 이미지로부터 생성된 컨테이너에서 동작하는 어플리케이션의 상태를 체크하도록 설정한다. 
- 다음 예시는 1분마다 curl -f를 실행해 nginx 앱의 상태를 체크하고, 3초 이상이 소요되면 이를 실패로 간주해 컨테이너를 `unhealthy` 상태로 만든다. 이를 위해 컨테이너에 curl을 먼저 설치해야한다.
```Dockerfile
FROM nginx
RUN apt-get update -y && apt-get install curl -y
HEALTHCHECK --interval=1m --timeout=3s --retries=3 CMD curl -f http://localhost || exit 1
```
- `--interval`은 헬스 체크 주기, `--timeout`는 타임아웃 설정, `--retries`는 헬스체크 실패시 반복실행할 횟수고, CMD 뒤 명령어는 헬스체크 명령어다. 이미지 빌드 후 컨테이너를 실행하면 컨테이너 STATUS 정보에 헬스체크가 추가된다. `docker inspect`에서 State - Health - Log 항목에서 확인 가능하다.

<br>

### 4. SHELL
- Dockerfile에서는 기본적으로 리눅스는 `/bin/sh-c`, 위도우에서는 `cmd /S /C` 쉘을 사용한다. 사용하려는 쉘을 따로 지정하려고 할 때 `SHELL`을 사용할 수 있다. 아래의 예제는 `node`를 기본 쉘로 사용하는 설정이다
```Dockerfile
FROM node
RUN echo hello, node!
SHELL ["/user/local/bin/node"]
RUN -v
```
- -v는 결국 `node -v` 를 실행한것과 같은 결과를 출력한다.

<br>


### 2.4.4.3 `ADD`, `COPY`
- `COPY`는 로컬 디렉토리의 컨텍스트에서 이미지로 파일을 복사하는 역할을한다. 형식은 `ADD`와 같다. 
- 둘의 차이는, `COPY`는 로컬 파일만 이미지에 추가 가능하지만, `ADD`는 외부 URL 및 tar 파일에서도 파일을 추가할 수 있다는 점. `git clone`을 사용하면 원하는 프로젝트를 바로 땡겨올 수 있게된다.

<br>

### 2.4.4.4 `ENTRYPOINT`, `CMD`
- `ENTRYPOINT`는 `CMD`에 설정된 명령어를 인자로 명령어를 실행한다. 예시로 본다.
``` bash
# entrypoint : 없음, cmd: /bin/bash
$ docker run -it ubuntu:14.04 /bin/bash
root@00b0bb5b13210:/#
```
```bash
# entrypoint: echo, cmd: /bin/bash
$ docker run -it --entrypoint="echo" ubuntu:14.04 /bin/bash

/bin/bash
```
- `entrypoint`에 echo를 넣은 결과 `cmd`에 설정한 /bin/bash 를 화면에 출력하도록 실행되었다.
- `entrypoint`는 일반적으로 스크립트 파일을 entrypoint 인자로 사용해 컨테이너가 시작될 때 해당 스크립트 파일을 실행하도록 설정한다. 이 때, script파일은 컨테이너 내에 존재해야하는데 이를 위해 `COPY`, `ADD`를 사용한다. 예를들면 아래와같이 구성할 수 있겠다.
```sh
# vi entrypoint.sh
echo $1 $2
apachectl -DFOREGROUND
```
```Dockerfile
FROM ubuntu:14.04
ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
```
```sh
$ docker build -t entrypoint_image:0.0 ./
# ...

$ docker run -d entrypoint_apache_server entrypoint_image:0.0 first second
# ...

$ docker logs entrypoint_apache_server
# first second
# ...
```
- 참고로 `ENTRYPOINT`인자를 배열로 사용하지 않으면, 암묵적으로 앞에 `/bin/sh -c`가 추가된다. 따라서 `ENTRYPOINT`에 설정하려는 명령어가 `/bin/sh`를 사용하지 않는다면 배열로 전달해줘야만한다.

<br>

### 2.4.5 Dockerfile로 빌드할 때 주의할 점
- RUN 명령어가 길어지면 `\`로 줄을 나눠 가독성을 높인다.
    - 예를들어 파일을 만들고 삭제하는 명령어를 `RUN`을 여러개 작성해 나누면, 각각이 레이어로 분리되게된다. 이 때, 파일은 삭제했지만 삭제하기 전의 레이어가 남아있으므로 파일 크기만큼의 레이어가 삭제되지 않고 디스크를 차지하게 된다.
- `.dockerignore`를 작성해 불필요한 파일이 빌드 컨텍스트에 포함되지 않도록 한다.
- 캐시를 사용해 기존에 사용했던 이미지 레이어를 재사용한다.
- 도커의 레이어를 사용해, 여러개의 컨테이너에서 공통된 라이브러리 등은 분리해 하나의 레이어로 만들어 여러 컨테이너에서 이를 공유하도록 한다.(이 말은 ***Dockerfile의 앞부분을 최대한 통일하자는 말***)

<br><br>

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

<br>

## 5.쿠버네티스
## 5.3 쿠버네티스 설치
1. 로컬환경
`Docker Desktop` 설치 후 Preference - Kubernetes - Enable Kubernetes

<br>

2. 여러 서버로 구성된 쿠버네티스 클러스터 설치
- https://kubernetes.io/ko/docs/setup/production-environment/tools/kubeadm/install-kubeadm/ 참고
- 쿠버네티스를 제대로 쓰려면 최소 4대 이상의 서버가 필요하다. 4대면 1개의 마스터와 3개의 워커노드를 구성할 수 있다.
- 각 서버에서 아래의 사항이 준비되어 있어야한다.
    - 모든 **서버의 시간이 ntp를 통해 동기화** 되어야한다.
    - 모든 서버의 [맥(MAC) 주소](https://m.blog.naver.com/wood0513/222084400286)가 달라야한다. 가상머신을 복사해서 쓰면 같은 맥주소를 가질 수 있다.
    - 서버가 최소 메모리 2gb, 2cpu 이상 되도록 하자.
    - `swapoff -a` 명령어로 메모리 스왑을 비활성화한다. 메모리 스왑이 활성화돼 있으면 컨테이너 성능이 일관되지 않을 수 있어 **대부분의 쿠버네티스 설치 도구는 메모리 스왑을 허용하지 않는다.**

- `kubeadm`: 쿠버네티스 커뮤니티에서 권장하는 쿠버네티스 설치 도구다. 클러스터를 부트스트랩 하는 명령어이다. 이외에 `Minikube`, `kubespray`도구도 있는데 모두 내부적으로 `kubeadm`을 쓴다.
- `kubelet`: 클러스터의 모든 머신에서 실행되는 파드와 컨테이너 시작과 같은 작업을 수행하는 컴포넌트
- [`kubectl`](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-): 클러스터와 통신하기 위한 cli utility

> ❗️ 설치하다가 자꾸 문제가 생겨 우선 넘어감..

<br>

## 6. 쿠버네티스 시작하기
### 6.1 쿠버네티스 특징
- 쿠버네티스는 대부분의 리소스를 오브젝트 형태로 관리한다. 컨테이너 집합(`Pods`), 컨테이너 집합을 관리하는 컨트롤러(`Replica Set`), 사용자(`Service Account`), 노드(`Node`)까지 오브젝트로 사용한다.
```bash
# 오브젝트 보기
$ kubectl api-resources

# NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
# bindings                                       v1                                     true         Binding
# componentstatuses                 cs           v1                                     false        ComponentStatus
# configmaps                        cm           v1                                     true         ConfigMap
# ...
```

<br>

- `kubectl` 명령어 외에도 쿠버네티스는 `YAML`파일로 컨테이너 리소스의 생성/삭제를 할 수 있다. 컨테이너 자체와 컨테이너 설정값(`ConfigMap`), 비밀값(`Secrets`)도 모두 YAML에 정의한다. 배포 역시 여러개의 `YAML` 파일에 정의해서 쿠버네티스에 적용한다.

- 쿠버네티스는 여러개의 컴포넌트로 구성된다. 노드는 `마스터 노드`와 `워커 노드`로 분리되고, 마스터 노드는 클러스터를 관리하는 역할을, 워커 노드에는 애플리케이션 컨테이너가 생성된다.
- `마스터 노드`에는 API 서버(`apiserver`), 컨트롤러 매니저(`kube-controller-manager`), 스케줄러(`kube-shceduler`), DNS 서버(`coreDNS`) 등의 컴포넌트가 실행되고, `모든 노드`에는 오버레이 네트워크 구성을 위해 프록시(`kube-proxy`)와 네트워크 플러그인(`caclio`, `flannel` 등)이 실행된다. 이런 ***컴포넌트들은 기본적으로 도커 컨테이너로 실행***되고 있다.
```bash
# 실행중인 컨테이너 보기
$ docker ps

# CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS          PORTS     NAMES
# 2f63cbfc4eeb   2edf9c994f19           "/kube-vpnkit-forwar…"   25 seconds ago   Up 24 seconds             k8s_vpnkit-controller_vpnkit-controller_kube-system_834f6590-4f5c-4639-a624-4fba206ae70a_18
# c33a7fedffda   k8s.gcr.io/pause:3.7   "/pause"                 4 hours ago      Up 4 hours                k8s_POD_vpnkit-controller_kube-system_834f6590-4f5c-4639-a624-4fba206ae70a_0
# f3e55cc2fc65   c027a58fa0bb           "/storage-provisione…"   4 hours ago      Up 4 hours                k8s_storage-provisioner_storage-provisioner_kube-system_c24f3de5-d5df-4bf4-969c-07d012728347_0
# ...
```
- **모든 노드에 추가적으로 쿠버네티스 클러스터 구성을 위해 `kublet` 에이전트가 실행**된다. 컨테이서 생성/삭제, 마스터-워커 노드간 통신 등을 담당한다. 매우중요하다.

<br>

### 6.2 Pod: 컨테이너 기본단위
### 6.2.1 Pod 사용하기
- 쿠버네티스에서 **컨테이너 애플리케이션 배포를 위한 기본단위**이다. 1개의 포드에는 1개이상의 컨테이너가 존재한다.
- Ngnix 컨테이너로 구성된 포드를 생성하기 위해 아래와 같이 `nginx-pad.yaml`을 작성한다.
```yaml
apiVersion: v1                # 오브젝트의 API 버전
kind: Pod                     # 리소스 종류, kubctl api-resources 로 확인
metadata:                     # 리소스의 라벨, 주석 등의 부가정보
  name: my-nginx-pod          # 포드의 이름
spec:                         # 리소스를 생성하기 위한 상세정보
  containers:                 # 포드에서 실행될 컨테이너 정보
  - name: my-nginx-container  # 컨테이너 이름
    image: nginx:latest       # 베이스 이미지
    ports:                    # 컨테이너가 사용할 port
    - containerPort: 80       
      protocol: TCP
```
- yaml 파일은 `kubectl apply - f`로 쿠버네티스에 생성할 수 있다.
```bash
$ kubectl apply -f nginx-pod.yaml
# pod/my-nginx-pod created

$ kubectl get pods
# NAME           READY   STATUS    RESTARTS   AGE
# my-nginx-pod   1/1     Running   0          11m
```
- `kubectl describe`로 생성된 리소스의 자세한 정보를 얻어올 수 있다.
```bash
# kubectl describe pods <pod-name>
$ kubectl describe pods my-nginx-pod

Name:         my-nginx-pod
...
Status:       Running
IP:           10.1.0.10
IPs:
  IP:  10.1.0.10
...
```
- 위 정보에서 `IP: 10.1.0.10` 주소는 외부에서는 접근할 수 없고, 클러스터 내부에서만 접근할 수 있다. 노드중 하나에 접속한 뒤 `curl 10.1.0.10`로 동작을 확인하면 된다.
(로컬 환경에 구성하면 pod을 두개 실행하고 한곳에 들어가서 하면 된다. 로컬 pc는 쿠버네티스 클러스터 밖이기때문에 안된다.)
- `kubectl exec`로 포드 컨테이너에 명령을 전달할 수 있다. `docker exec`와 문법이 거의 비슷하다.
```bash
# 이 문법은 deprecated라고 뜸
$ kubectl exec -it my-nginx-pod bash

# ... {pod} -- {command} 형태가 새 문법
$ kubectl exec -it my-nginx-pod -- bash
```
- `kubectl logs`로 컨테이너 포드의 로그도 확인 가능하다.
```bash
$ kubectl logs my-nginx-pod
```
- `kubectl delete`로 쿠버네티스 오브젝트도 삭제할 수 있다.
```bash
$ kubectl delete -f {YAML}
$ kubectl delete pod {PODNAME}

$ kubectl delete pod my-nginx-pod
```

<br>

### 6.2.2 Pod vs Docker container
- pod에는 여러개의 컨테이너가 있을 수 있다. 굳이 pod라는 단위로 묶어서 쓰는 이유는 여러가지가 있는데 ***pod 내부의 컨테이너들이 서버의 여러 `리눅스 네임스페이스`를 공유할수 있도록 하기 위함***이다.
- 예를들어 pod에 여러개의 컨테이너를 실행시키고 컨테이너에 접속하면 `localhost`로 컨테이너간의 통신이 가능하다. localhost라는 리눅스 네트워크를 공유하기 때문.

<br>

### 6.2.3 완전한 애플리케이션으로써의 Pod
- pod는 기본적으로 하나의 컨테이너만 정의한다. 그런데 설정 리로더 프로세스나 로그수집 등의 기능을 함께 수행해야 할 때도 있다. 이런 포드에 정의된 부가 기능을 위한 컨테이너를 `사이트카(sidecar)컨테이너` 라고 부른다.
- pod내 다른 컨테이너와 네트워크 환경 등을 공유하며 같은 워커노드에서 실행된다.

<br>

### 6.3 레플리카셋(Replica Set) 일정 개수의 Pod을 유지하는 컨트롤러
### 6.3.1 레플리카셋 사용 이유
- 6.2의 방법으로 여러개의 Pod를 생성하려면, yaml 파일에 --- 로 pod 정의를 나눠 여러개를 작성하고 `kubectl apply`로 생성하면 된다.
- 이 때 pod가 생성된 노드에 장애가 발생해서 pod가 종료되면 다른 노드에서 다시 생성되지 않는다. 문제가 된다. 
- ***`replicaset` 오브젝트는 정해진 수의 동일한 포드가 항상 실행되도록 관리한다. 노드 장애 등으로 포드사용이 불가능해지면 다른 노드에서 포드를 다시 생성한다.***

<br>

### 6.3.2 레플리카셋 사용하기
- 여러개의 nginx pod을 관리하는 `replicaset`을 만들어본다. replicaset 오브젝트도 yaml로 정의한다.
```yaml
# replicaset-nginx.yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: replicaset-nginx
spec: 
  replicas: 3                   # 유지할 pod 개수
  selector:
    matchLabels:
      app: my-nginx-pods-label  # 여기까지 레플리카셋 정의
  template:                     # 여기부터 생성할 pod 템플릿 정의
    metadata:
      name: my-nginx-pod
      labels:
        app: my-nginx-pods-label
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
          - containerPort: 80
```
- reaplicaset을 생성하고 pod이 잘 생성되는지 확인한다.
```bash
# 1. replicaset 생성
$ kubectl apply -f replicaset-nginx.yaml
# replicaset.apps/replicaset-nginx 'created'

# 2. replicaset 생성 확인
$ kubectl get rs
# NAME               DESIRED   CURRENT   READY   AGE
# replicaset-nginx   3         3         3       79s

# 3. pod 생성 확인
$ kubectl get po
# replicaset-nginx-46swj   1/1     Running   0          49s
# replicaset-nginx-nlh5q   1/1     Running   0          49s
# replicaset-nginx-qpjnz   1/1     Running   0          49s
```
- pod를 늘리려면 yaml 파일의 `spec.replicas`를 늘리고 yaml을 다시 읽으면 된다.
```yaml
# replicaset-nginx.yaml
...
spec: 
  replicas: 4
...
```
```bash
$ kubectl apply -f replicaset-nginx.yaml
# replicaset.apps/replicaset-nginx 'configured'

$ kubectl get po
# NAME                     READY   STATUS    RESTARTS   AGE
# replicaset-nginx-46swj   1/1     Running   0          3m14s
# replicaset-nginx-nlh5q   1/1     Running   0          3m14s
# replicaset-nginx-qpjnz   1/1     Running   0          3m14s
# replicaset-nginx-vtqns   1/1     Running   0          13s
```
- yaml을 고치는거 말고 `kubectl edit`, `kubectl patch`등의 방법도 있다고 한다.
- replicaset을 제거하면 해당 replicaset이 만든 pod도 모두 제거된다.
```bash

$ kubectl delete rs replicaset-nginx
# replicaset.apps "replicaset-nginx" deleted

$ kubectl get po
# No resources found in default namespace.
```

<br>

### 6.3.3 레플리카셋 동작원리
- 레플리카셋은 포드와 직접 연결되어 있지 않고 느슨한 연결(loosely coupled)을 유지한다. 연결 방법은 레플리카셋 정의중 라벨 셀렉터(Label Selector)를 통해 이뤄진다.
```yaml
# replicaset-nginx.yaml
...
spec: 
  selector:
    matchLabels:                # replicaset이 찾을 라벨
      app: my-nginx-pods-label      
  template:                     
    metadata:
      labels:                   # pod의 라벨
        app: my-nginx-pods-label
...
```
- replicaset은 위 yaml에서 `spec.selector.matchLabels`에 정의된 라벨과 같은 라벨을 가지는 pod이 일정 갯수를 가지도록 유지한다. 만약 실행중인 pod의 라벨을 다른것으로 바꾸면 변경을 잠지해 새로운 pod을 실행시켜 pod수를 유지할것이다.
- [라벨 셀렉터는 `표현식 기반`으로도 작성 가능](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements)하다. 아래 라벨 셀렉터는 values에 정의된 label이 존재하는 pod의 replicas를 유지한다.
```yaml
....
selector:
  matchExpressions:
    - key: app
    values:
      - my-nginx-pods-label
      - your-nginx-pods-label
    operator: In
```
- 현재 공식 문서의 yaml 작성 방법을 보니 yaml에 json문법을 섞어서 쓸수도 있는걸로 확인된다.
- `kubectl get pods --show-labels`로 실행중인 pod의 라벨도 볼 수 있다.
- 예전 버전에서는 레플리케이션 컨트롤러(Replication Controller)라는 오브젝트를 사용해서 pod수를 유지했다고 한다.

<br>

### 6.4 디플로이먼트(Deployment): 레플리카셋, 포드의 배포관리
### 6.4.1 디플로이먼트 사용하기
- 디플로이먼트도 오브젝트다.
- 실전에서는 보통 pod나 replicaset의 yaml을 정의하는게 아닌 deployment의 yaml에 모든걸 정의한다고 한다. pod -> replicaset -> deployment 순으로 상위 오브젝트다.
```yaml
# deployment-nginx.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-nginx
  template:
    metadata:
      name: my-nginx-pod
      labels:
        app: my-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.10
        ports:
        - containerPort: 80
```
```bash
# 1. deployment 생성
$ kubectl apply -f deployment-nginx.yaml

# 2. 생성된 내용 확인
$ kubectl get {deploy|rs|pod}

# 3. deployment 삭제
$ kubectl delete deploy my-nginx-deployment
```

### 6.4.2 디플로이먼트 사용이유
- 애플리케이션 업데이트시 `replicaset` 변경 사항을 저장하는 리비전(revision)을 남겨 롤백 가능    
- `무중단 서비스`를 위한 포드의 롤링 업데이트의 전략 지정 가능
- 예를들어 pod의 컨테이너가 업데이트 될 때, 이전 replicaset은 이전 리비전 정보로 저장하고, 새로운 replicaset을 만들고 pod을 모두 새로 생성한다.
```bash
# 1. nginx 이미지를 1.10 -> 1.11로 업데이트
$ kubectl set image deployment my-nginx-deployment nginx=nginx:1.11 --record
# deployment.apps/my-nginx-deployment image updated

# 2. 레플리카셋 조회
$ kubectl get rs
# NAME                             DESIRED   CURRENT   READY   AGE
# my-nginx-deployment-5f4b77fcb9   0         0         0       21m
# my-nginx-deployment-84cff58bc8   3         3         3       110s

# 3. 리비전 히스토리 조회
$ kubectl rollout history deploy my-nginx-deploym
ent
# REVISION  CHANGE-CAUSE
# 1         kubectl apply --filename=deployment-nginx.yaml --record=true
# 2         kubectl set image deployment my-nginx-deployment nginx=nginx:1.11 --record=true

# 4. 예전 버전의 rs로 롤백(--to-revision)
$kubectl rollout undo deploy my-nginx-deployment
 --to-revision=1
# deployment.apps/my-nginx-deployment rolled back
```
- 롤백하면 이전 rs이 다시 3개의 pod를 생성하고 새로 생성되었던 rs의 pod는 제거된다. rs는 둘 다 남아있다.
- 여러개의 rs가 존재할 수 있는 이유는 **deployment가 해시값을 생성해서 라벨 셀렉터에 `pod-template-hash={hash}`값에 추가하기 때문**이다. `kubectl get pod --show-labels`로 확인 가능하다.

- `kubectl describe deploy my-nginx-deployment` 명령어로 deploy의 리소스를 출력해보면 `Event` 부분에서 ***rs를 교체할 때 replicas를 한개씩 내리고 올리고 하는걸 볼 수 있다.***(=> 롤링 업데이트?)

<br>


### 6.5 서비스(Service): 포드를 연결하고 외부에 노출
- 클러스터 내에서 pod에 접근하려면 `service`라는 쿠버네티스 오브젝트를 생성해야한다. pod의 ip로도 접근은 가능하나 영속적이지 않아 변할 수 있기 때문에 pod끼리 서로를 발견할 수 있는 다른 방법이 필요하다.
- 서비스는 **pod에 접근하기 위한 규칙을 정의**하는데, 핵심 기능 3가지는 아래와 같다.
    - 여러개의 포드에 접근 가능하도록 고유한 `도메인 이름` 부여
    - 여러개의 포드에 접근할 때 요청 분산하는 `로드밸런서 기능` 수행
    - 클라우드 플랫폼의 lb, 클러스터 노드의 포트 등을 통해 포드를 외부로 노출

<br>

### 6.5.1 서비스의 종류
- 서비스의 종류는 크게 3가지가 있다.
  - `ClusterIP` 타입 : 쿠버네티스 내부에서만 포드들에 접근할 때 사용, 외부에 포드를 노출하지 않는다.
  - `NodePort` 타입: 포드에 접근할 수 있는 포트를 클러스터의 모든 노드에 동일하게 개방한다. 따라서 외부에서 포드에 접근할 수 있다. 기본적으로 포트는 랜덤이나 특정값도 설정 가능.
  - `LoadBalancer` 타입: **CP에서 제공하는 로드 밸런서를 동적으로 프로비저닝해 포드에 연결**한다. 외부에서 포드에 접근할 수 있는데, 일반적으로 AWS, GCP같은 클라우드 플랫폼 환경에서만 사용할 수 있다.

<br>

### 6.5.2 ClusterIP 타입 서비스
- `deployment`로 80포트에서 호스트명을 반환하는 애플리케이션 3개를 띄운다. 아래와 같이 yaml파일을 작성한다.
```yaml
# deployment-hostname.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hostname-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webserver
  template:
    metadata:
      name: my-webserver
      labels:
        app: webserver
    spec:
      containers:
      - name: my-webserver
        image: alicek106/rr-test:echo-hostname
        ports:
        - containerPort: 80
```
- deployment를 생성하고 pod의 ip주소를 확인해본다. 서비스 없이도 할당된 IP주소로도 pod에 접근할 수 있다.
```bash
# 1. deployment 생성
$ kubectl apply -f deployment-hostname.yaml

# 2. 생성된 pod 정보 확인
$ kubectl get pod -o wide
# NAME                                  READY   STATUS    RESTARTS   AGE   IP          NODE
# hostname-deployment-9664ffd7f-6vkdt   1/1     Running   0          48m   10.1.0.14   docker-desktop
# ...

# 3. 임시pod을 생성해 클러스터 내부에서 IP로 pod 호출
$ kubectl run -i --tty --rm debug --image=alice106/ubuntu:curl --restart=Never curl 10.1.0.14 | grep Hello
```

- 이번엔 ClusterIP타입의 서비스를 만들고 서비스를 통해 접근해본다. 서비스를 정의하는 yaml을 아래와 같이 작성한다.
```yaml
# hostname-svc-clusterip.yaml
apiVersion: v1
kind: Service
metadata:
  name: hostname-svc-clusterip
spec:
  ports:
    - name: web-port
      port: 8080      # 서비스의 IP에 접근할 때 사용할 포트
      targetPort: 80  # 접근 대상 pod가 사용하고 있는 포트(== containerPort)
  selector:
    app: webserver    # 접근할 pod의 라벨(app=webserver)
  type: ClusterIP     # 서비스 타입
```
- 서비스를 생성하고 생성된걸 조회해본다.
```bash
# 1. 서비스 생성
$ kubectl apply -f hostname-svc-clusterip.yaml 

# 2. 서비스 조회
$ kubectl get services
# NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
# hostname-svc-clusterip   ClusterIP   10.106.189.243   <none>        8080/TCP   18s
# kubernetes               ClusterIP   10.96.0.1        <none>        443/TCP    32h
```
- `kubernetes` 서비스는 기본제공되는 서비스로 포드 내부에서 쿠버네티스 API에 접근하기 위한 서비스다.
- 생성한 `hostname-svc-clusterip`에 `CLUSTER-IP`가 클러스터 내부에서 서비스를 호출할 수 있는 주소다. `10.106.189.243:8080`으로 호출하면 서비스를 호출하고 서비스는 연결된 POD의 설정한 80포트를 호출한다.

```bash
# 1. curl을 날릴 ubuntu 애플리케이션 임시 pod 생성
$ kubectl run -i --tty --rm debug --image=alicek106/ubuntu:curl --restart=Never -- bash

# 2. debug pod에서 서비스 호출
$ curl 10.106.189.243:8080 --silent | grep Hello
$ curl hostname-svc-clusterip:8080 --silent | grep Hello
```
- ***서비스의 IP와 Port를 통해 pod에 접근할 수 있으며, 3개의 pod에 자동으로 요청이 분산된다.(로드밸런싱)***
- `hostname-svc-clusterip:8080`과 같이 이름으로도 접근 가능한데, **쿠버네티스가 자체적으로 내부 DNS를 구동하고 있고 pod들이 자동으로 DNS를 사용하도록 설정되어 있기 때문**이다.
- 추가로, 서비스가 생성될 때 엔드포인트(`endpoint`)라고 불리는 오브젝트를 별도로 생성한다. 연결할 pod의 엔드포인트들을 가지는 오브젝트다.
```bash
$ kubectl get {endpoints | ep}

# NAME                     ENDPOINTS                                AGE
# hostname-svc-clusterip   10.1.0.14:80,10.1.0.15:80,10.1.0.16:80   28m
# kubernetes               192.168.65.4:6443                        33h
```
- 서비스 삭제
```bash
$ kubectl delete svc hostname-svc-clusterip
$ kubectl delete -f hostname-svc-clusterip.yaml
```
 
<br>

### 6.5.3 NodePort 타입의 서비스
- `NodePort` 타입 서비스는 클러스터 외부에서도 접근 가능하다. 모든 Node의 특정 Port를 개방해 서비스에 접근하는 방식이다.
- 서비스 생성을 위해 yaml을 아래와 같이 작성한다.
```yaml
# hostname-svc-nodeport.yaml
apiVersion: v1
kind: Service
metadata:
  name: hostname-svc-nodeport
spec:
  ports:
    - name: web-port
      port: 8080
      targetPort: 80
      # nodePort: 31000   # 원하는 포트 설정 가능
  selector:
    app: webserver
  type: NodePort
```
- Nodeport 서비스를 생성하고 목록을 확인해본다.
```bash
# 1. Nodeport 서비스 생성
$ kubectl apply -f hostname-svc-nodeport.yaml

# 2. 서비스 목록 확인
$ kubectl get svc
# NAME                    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
# hostname-svc-nodeport   NodePort    10.99.49.175   <none>        8080:30348/TCP   2m34s
# kubernetes              ClusterIP   10.96.0.1      <none>        443/TCP          34h

# 3. pod의 ip 목록들확인
$ kubectl get pod -o wide
# NAME                                  READY   STATUS    RESTARTS   AGE    IP          NODE             NOMINATED NODE   READINESS GATES
# hostname-deployment-9664ffd7f-6vkdt   1/1     Running   0          135m   10.1.0.14   docker-desktop   <none>           <none>
# hostname-deployment-9664ffd7f-bvlwx   1/1     Running   0          135m   10.1.0.16   docker-desktop   <none>           <none>
# hostname-deployment-9664ffd7f-xzglm   1/1     Running   0          135m   10.1.0.15   docker-desktop   <none>           <none>

# 4.  각 pod의 IP:{30348} 로 요청 이 가능하다.
$ curl 10.1.0.14:30348 --silent | grep hello
# ??
```
> 나는 4. 에서 막혔다. 아마 도커 데스크탑 환경이라 그런걸로 추정되는데, 추후 클라우드 인스턴스로 클러스터 구성하여 확인이 필요함
- 4.의 경우 GPC나 AWS 환경에서는 각 노드에 `nodeport` 서비스 생성시 할당된 포트로 접근하기 위해 별도로 각각 방화벽 / security inbound 설정이 필요하다.(랜덤포트 말고 nodePort로 할당이 필요할 듯)
- `Nodeport`서비스는 자체로 `ClusterIP` 서비스의 기능을 포함한다. 따라서 클러스터 내부에서 `ClusterIP:8080`으로도 접근이 가능하다.

```bash
# curl용 임시 pod 생성
$ kubectl run -i --tty --rm debug --image=alicek106/ubuntu:curl --restart=Never -- bash
# 요청
$ curl 10.99.49.175:8080
```

- 실제 운영 환경에서 `NodePort`로 서비스를 외부에 제공하지 않는다. 보통 `인그레스(Ingress)`라는 쿠버네티스 오브젝트에서 간접적으로 사용된다. `LoadBalancer`와 `NodePort`를 합치면 `Ingress` 오브젝트를 사용할 수 있다.

<br>

### 6.5.4 Loadbalancer 타입의 서비스
- `Nodeport` 서비스는 각 노드의 IP를 알아야 접근 가능한 방식이었으나, `Loadbalancer`타입의 서비스는 각 CP로부터 도메인과 IP를 할당받기 때문에 쉽게 포드에 접근 가능하다. 하지만, 로드 밸런서를 동적으로 생성하는 기능을 제공하는 AWS, GCP 같은 환경에서만 사용 가능하고, 가상 머신이나 온프레미스 환경에서는 사용하기 어렵다.
- 책은 AWS에서 kops를 통해 설치한 쿠버네티스 환경에서 하지만 나는 로컬에서 흉내내본다. 서비스 yaml을 아래와 같이 작성한다.
```yaml
# hostname-svc-lb.yaml
apiVersion: v1
kind: Service
metadata:
  name: hostname-svc-lb
spec:
  ports:
    - name: web-port
      port: 80
      targetPort: 80
  selector:
    app: webserver
  type: LoadBalancer
```
- 서비스를 실행하고 생성내용을 확인해본다.
```bash
# 1. 서비스 생성
$ kubectl apply -f hostname-svc-lb.yaml

# 2. 서비스 확인
$ kubectl get svc 
# NAME              TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
# hostname-svc-lb   LoadBalancer   10.104.74.125   localhost     80:30625/TCP   2s
# kubernetes        ClusterIP      10.96.0.1       <none>        443/TCP        35h
```
- 확인할 점은 `EXTERNAL-IP` 부분이다. 나는 `localhost`, 이지만 ***클라우드 플랫폼을 사용하고 있다면 플랫폼에서 제공한 도메인이 나올것이다.***

```bash
# 로드밸런서에 요청 세번 날리기
$ curl localhost --silent | grep Hello
# <p>Hello,  hostname-deployment-9664ffd7f-xzglm</p>      </blockquote>
# <p>Hello,  hostname-deployment-9664ffd7f-bvlwx</p>      </blockquote>
# <p>Hello,  hostname-deployment-9664ffd7f-6vkdt</p>      </blockquote>
```
- 3개의 포드로 분산되어 요청이 날아가고 있음을 알 수 있다.(브라우저에서 확인하면 캐싱되어서 응답이 한개만 뜬다.)
- `PORT`에 있는 `30625`값은 각 노드에서 동일하게 접속할 수 있는 포트번호다.(Nodeport의 그것과 같다.) 즉, `curl 10.1.0.14:30625 --silent | grep Hello`로 노드에 접근이 가능하다. 이게 생긴 이유는 `LoadBalancer`의 요청 처리 원리를 보면 알 수 있다.

    **1. LoadBalancer 타입 서비스가 생성됨과 동시에 모든 워커 노드는 포드에 접근할 수 있는 랜덤 포트를 개방한다.(여기서 30625)**

    **2. 로드 밸런서로 요청이 들어오면 요청은 워커 노드중 하나로 전달되며, 이 때 사용되는 포트가 1의 30625 포트다.**
    
    **3. 워커 노드로 전달된 요청은 포드중 하나로 전달되어 처리된다.**

<br>

- 3번을주의하자. `워커노드 !== 포드`이다.
- `2. ~ 3.`의 과정은 `Nodeport 서비스`를 사용했을 때의 동작과 같다.
- AWS를 쓰고있으면 콘솔에서 로드밸런서 정보를 확인해보면 뭐커노드가 로드밸런서에 연결돼 있는걸 확인할 수 있다.

<br>

### 6.5.5 트래픽의 분배를 결정하는 서비스 속성: `externalTrafficPolicy`
- 바로 위 2~3의 동작에서, 요청이 노드에 들어오면 포드 중 하나로 전달된다. ***그런데 워커노드A에 들어온 요청이 워커노드B의 포드로도 전달될 수 있다.*** 딱 봐도 비효율적이다. 베트워크 홉(hop)이 한단계 더 발생하고 노드간 리다이렉트로 인해 트래픽의 출발지 주소가 바뀌는 `SNAT`가 발생하고 이로인해 클라이언트의 IP 주소 또한 보존되지 않는다.
- 이러한 요청 전달 메커니즘은 서비스 속성 중 `{externalTrafficPolicy: Cluster}` 의해 정의된다. 이게 기본값인가보다.
```bash
# -o {yaml, json, wide...} : 출력 형식지정
$ kubectl get svc hostname-svc-lb -o yaml

# ...
#   externalTrafficPolicy: Cluster
# ...
```
- `externalTrafficPolicy: Loacl`로 설정하면 포드가 생성된 노드에서만 포드로 접근할 수 있어, 해당 노드의 로컬에 위치한 포드로만 요청이 전달된다. yaml파일에 명시적으로 설정해줘야한다.
```yaml
# hostname-svc-lb.yaml
...
spec:
  externalTrafficPolicy: Local
...
```
- 설정 변경 적용
```bash
$ kubectl apply -f hostname-svc-lb.yaml 
```
- `externalTrafficPolicy: Local`이 당연히 좋아보이지만, 각 ***노드에 포드가 고르지 않게 스케줄링 됐을 때 요청이 포드별로 고르게 분산되지 않을 수 있다.***(노드에만 고르게 분산된다.) 이런 문제는 쿠버네티스 스케줄링 기능 중 `PodAntiAffinity` 등을 사용해 포드를 최대한 클러스터 노드에 고르게 배포해서 해결할 수 있다.

<br>

### 6.5.6 요청을 외부로 리다이렉트하는 서비스: ExternalName
- `ExternalName` 서비스는 서비스가 외부 도메인을 가리키도록 설정할 수 있다. 아래 설정은 포드들이 externalname-svc라는 이름으로 요청을 보낼 경우 쿠버네티스의 DNS는 my.database.com으로 접근할 수 있도록 CNAME 레코드를 반환한다. 즉 ***externalname-svc로 요청을 보내면 my.database.com에 접근***한다는 말이다.
```yaml
# external-svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: externalname-svc
spec:
  type: ExternalName
  externalName: my.database.com  
```
```bash
$ kubectl apply -f external-svc.yaml 

$ kubectl get svc  
# NAME               TYPE           CLUSTER-IP   EXTERNAL-IP       PORT(S)   AGE
# externalname-svc   ExternalName   <none>       my.database.com   <none>    3m57s
# kubernetes         ClusterIP      10.96.0.1    <none>            443/TCP   35h
```
- 따로 CLUSTER-IP가 없기 때문에 ExternalName 서비스는 어차피 이름(externalname-svc) 으로밖에 접근 못한다. EXTERNAL-IP도 이미 my.database.com로 되어있다.
- `ExternalName` 서비스는 쿠버네티스와 별개로 존재하는 레거시 시스템에 연동해야 하는 상황에서 유용하다.

<br><br>

## 7. 쿠버네티스 리소스의 관리와 설정
### 7.1 네임스페이스(Namespace): 리소스를 **논리**적으로 구분하는 장벽
- 네임스페이스는 포드, 레플리카셋, 디플로이먼트, 서비스 등의 쿠버네티스 리로스들이 묶여 있는 하나의 가상 공간/그룹이다. 네임스페이스를 쓰면 하나의 클러스터에서 여러개의 가상 클러스터를 동시에 사용하는 것처럼 느껴진다
```bash
# 네임스페이스 조회
$ kubectl get {namespaces | ns}

# NAME              STATUS   AGE
# default           Active   2d8h
# kube-node-lease   Active   2d8h
# kube-public       Active   2d8h
# kube-system       Active   2d8h
```
- 기본적으로 4가지의 네임스페이스가 제공되고 있다. 
  - `default`는 사용자가 만드는 오브젝트에 따로 네임스페이스를 할당하지 않을 경우 할당된다.
  
  - `kube-system`은 쿠버네티스 구성을 위해 필요한 오브젝트들에 할당되어 있다.
  ```bash
  $ kubectl get pods {--namespace | -n} kube-system

  # NAME                                     READY   STATUS    RESTARTS         AGE
  # coredns-6d4b75cb6d-58x2k                 1/1     Running   3 (28m ago)      2d8h
  # coredns-6d4b75cb6d-tdrzs                 1/1     Running   3 (28m ago)      2d8h
  # etcd-docker-desktop                      1/1     Running   3 (28m ago)      2d8h
  # kube-apiserver-docker-desktop            1/1     Running   3 (28m ago)      2d8h
  ...

  $ kubectl get svc -n kube-system
  # NAME       TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
  # kube-dns   ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   2d8h

  $ kubectl get deploy -n kube-system
  # NAME      READY   UP-TO-DATE   AVAILABLE   AGE
  # coredns   2/2     2            2           2d8h
  ```
  - 여러개의 `pod`들과 coredns pod을 관리하는 coredns `deploy`, 이름을 통해 오브젝트를 찾을 수 있는 기능을 제공하는 kube-dns 서비스 등이 미리 생성되어 있다. 가급적이면 이런 kube-system 오브젝트들은 건드리지 않는다.

<br>

- 네임스페이스도 오브젝트이므로 yaml로 정의할 수 있다. 그리고 오브젝트 정의 yaml에 `metadata.namespace`에 정의한 네임스페이스를 작성한다.
```yaml
# production-namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production


# hostname-deploy-svc-ns.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hostname-deployment-ns
  namespace: production # 네임스페이스 지정
...
---
apiVersion: v1
kind: Service
metadata:
  name: hostname-svc-clusterip-ns
  namespace: production # 네임스페이스 지정
...
```
- yaml로 `service`, `deployment`를 생성하면 namespace로 검색할 수 있다.
```bash
$ kubectl apply -f hostname-dploy-svc-ns.yaml

# ,를 써서 여러 오브젝트도 한번에 검색 가능
$ kubectl get pods,services,deploy -n production

# --all-namespaces 옵션으로 모든 네임스페이스에 대해 검새 가능(없으면 기본 default만 검색)
$ kubectl get pods --all-namespaces
```

<br>

- 이전에 서비스에서 다뤘듯이, 클러스터 내부에서 `clusterIP`서비스에 서비스 이름을 통해 접근 가능하다. 하지만 네임스페이스를 도입하면 기본적으로 같은 네임스페이스의 서비스에만 접근 가능하다.(`CLUSTER-IP`로의 접근은 그냥 가능)
- 하지만 `<서비스이름>.<네임스페이스이름>.svc`형태로 접근하면 다른 네임스페이스의 서비스에도 접근 가능하다.
```bash
# 1. 서비스 조회
$ kubectl get svc -n production
# NAME                        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
# hostname-svc-clusterip-ns   ClusterIP   10.110.3.163   <none>        8080/TCP   2m21s

# 2. curl용 임시 pod 생성
$ kubectl run -i --tty --rm debug --image=alicek106/ubuntu:curl --restart=Never -- bash

# 3. [실패] 서비스 이름으로 접근 
$ curl hostname-svc-clusterip-ns:8080
# curl: (6) Could not resolve host: hostname-svc-clusterip-ns

# 4. [성공] 네임스페이스 정보가 추가된 서비스 이름으로 접근
$ curl hostname-svc-clusterip-ns.production.svc:8080 --silent | grep Hello
# <p>Hello,  hostname-deployment-ns-9664ffd7f-dldvc</p>   </blockquote>

# 5. [성공] Cluster-IP로 접근
$ curl 10.110.3.163:8080 --silent | grep Hello
# <p>Hello,  hostname-deployment-ns-9664ffd7f-nz2bn</p>   </blockquote>
```

<br>

- 네임스페이스는 논리적으로 오브젝트를 분리하는 단위다. ***모든 오브젝트가 네임스페이스로 구분되는건 아니고 일부는 네임스페이스와 독립적으로 존재한다.*** 각각 아래 명령어로 확인 가능하다.
```bash
# true: 네임스페이스 종속, false: 네임스페이스 독립
$ kubectl api-resources --namespaced={true | false}
```
- `pod`, `serivce`, `deployment`같은 오브젝트들이 대표적인 네임스페이스 종속적인 오브젝트다.
- ***클러스터의 관리를 위한 저수준의 오브젝트들***은 네임스페이스에 종속되지 않는다. `nodes`는 대표적인 네임스페이스 독립적인 오브젝트이다. 

<br>
