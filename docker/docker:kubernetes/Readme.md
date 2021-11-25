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
- commit:second는 commit:first의 레이어를 공유하기때문에, commit:second 컨테이너가 사용중인 동안은 commit:first를 지울 수 없다.
```bash
# docker rmi commit_test:first

======
Error response from daemon: conflict: unable to remove repository reference "commit_test:first" (must force) - container 0be2e9e2f7e8 is using its referenced image 12a60b0b321c
```
- `-f`옵션을 추가해 강제로 지울 수 있으나, 이미지 레이어 파일이 실제로 삭제되지 않고 이름만 삭제되므로 의미는 없다. commit:second 컨테이너를 정지/제거하고 commit:first 이미지를 제거하면 아래와 같은 메시지를 받는다.
```bash
# docker stop commit_test2 && docker rm commit_test2
# docker rmi commit_test:first
======
Untagged: commit_test:first
```

- Untagged의 의미는 실제 레이어 파일을 삭제하지 않고 레이어에 부여된 이름만 삭제했음을 의미한다. 삭젤하려는 레이어를 참조중인 이미지가 존재하기 때문. 결국 하위 이미지를 지우지 않고 상위 이미지는 완전히 지울수는 없다. 아래와 같이 commit:second를 지우면 비로소 실제 이미지를 제거할 수 있게된다.

```bash
# docker rmi commit_test:second

======
Untagged: commit_test:second
Deleted: sha256:fb82fecec95ca0dc4d48fe691c2872f56b48b44920658940a9f10e690f6448fd
Deleted: sha256:2926df9220caf50085fdd614a98bba217e78e56e4475b0720b1d3edbd616a726
Deleted: sha256:12a60b0b321c7f9c7ab4ad47311d7b63ba47ca73f253a6d0d43ddc45a3d7db3d
Deleted: sha256:bdccd66a95b7fd62f8e06c1f26cb51f18b1f7f6c36ff3b4dbbad0e4dff8fa764
```


> 못지우는 이미지를 강제로 지우는 등 이미지 생성/삭제에서 오류가 발생하면 해당 이미지는 목록에서 `<none>`으로 보이는데, `dangling image`라고 한다. 이런 이미지들은 `docker rmi $(docker images -f "dangling=true" q)`로 지울 수 있다.

> ❗️ `docker image prune`으로 더 쉽게 지울수 있다.

<br>

### 2.3.3 이미지 추출
- `save` 명령어를 이용하면 이미지를 추출해 파일로 저장할 수 있다. `-o` 옵션은 추출할 파일명이된다.
```bash
# docker save -o ubuntu_14_04.tar ubuntu:14.04
```
- 추출된 이미지는 `load` 명령어로 다시 도커에 로드할 수 있다. 파일에는 추출한 이미지의 모든 메타데이터가 포함되므로 **이전 이미지와 완전히 동일한 이미지가 도커 엔진에 생성된다.**
```bash
# docker load -i ubuntu_14_04.tar
```
- 비슷한 명령어로 **컨테이너를 추출/저장** 하는 `export`, `save`가 있다.  `commit`으로 컨테이너를 이미지로 만들면 컨테이너 변경사항 외 컨테이너 생성시 설정한 커맨드같은 컨테이너 설정이 포함되는데, `export`는 컨테이너 및 이미지에 대한 설정 정보를 저장하지 않는다. 이 말은 ***기존 이미지의 나눠진 레이어를 하나로 통합한다는 말이다.*** 추출된 이미지를 `import`로 다시 저장하면서 이미지 이름을 새로 설정할 수 있다.

```bash
# docker run --name test ubuntu:14.04

# docker export -o test.tar test
# docker import test.tar test

# docker inspect test

======
...
"Layers": [
    "sha256:86c4a57a558b5672935b23c1a6c43c5f205ce40654bc072110409b869e94b1e3"
]
...
```
- 이미지를 파일로 관리하는것은 별로 좋은방법이 아니다.

<br>

### 2.3.4 이미지 배포
- 브라우저로 docker hub에 접속하여 Repository를 만든다. 여기서는 **my-image-name** 으로 생성했다.
- 도커허브에 배포하는 법만 알아본다. 우선 `commit`으로 배포할 이미지를 생성한다
```bash
# docker run -it  --name commit_container1 ubuntu:14.04
# echo first push >> test

# docker commit commit_container1 my-image-name:0.0
```

- `tag` 명령어로 이미지의 이름을 추가할 수. `docker tag [기존이미지먕] [새로운이미지명]`. **기존 이름이 사라지진 않고 같은 이름을 가리키는 새로운 이름이 추가되는 것이다.** 이름은 [사용자이름]/[저장소이름]:버전 으로 만든다ㅏ.
```bash
# docker tag my-image-name:0.0 rhehdrla/my-image-name:0.0
```
- `login`으로 로그인을 할 수 있다.
```bash
# docker login

... username/pw 를 입력한다.
```

- `push` 명령어로 이미지를 저장소에 올린다. my-image-name Repo로 알아서 업로드한다.
```bash
# docker push rhehdrla/my-image-name:0.0
```
- 브라우저에서 레포지토리를 들어가 업로드를 확인해보거나 아래 명령어로 docker hub에 올라갔는지 확인 가능하다.
```bash
# docker search rhehdrla 

======
NAME                     DESCRIPTION                STARS     OFFICIAL   AUTOMATED
rhehdrla/my-image-name   image for testing docker   0     
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
# Dockerfile

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
# docker build -t mybuild:0.0 ./

실행
# docker run -d -P --name myserver mybuild:3.0
```
- label로 지정한 내용을 이용해 `--filter` 옵션으로 필터링 할 수 있다.
```bash
# docker images --filter "label=purpose=practice"
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
# docker build --no-cache -t mybuild:0.0 .
```
- 또한 캐시로 사용할 이미지를 지정할 `--cache-from [이미지]`옵션으로 지정할 수 있다. 다음은 docker hub의 nginx:latest 이미지를 캐시로 사용하는 Dockerfile 빌드 명령어다.
```bash
# docker build --cache-from nginx -t my_extend_nginx:0.0 .
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
# docker build -t envtest ./
# docker run -it --name test -e test=myvalue envtest
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
# docker build -t myvolume
# docker run -itd --name volume_test myvolume

# docker volume ls

======
DRIVER   VOLUME NAME
local    3d26fa42......
```
- 어떻게 사용하는지는 아직 잘 모르겠다..ㅎㅎ

<br>

### 3. ARG




### 2.4.4.2 `Onbuild`, `Stopsignal`, `Healthcheck`, `Shell`
### 2.4.4.3 `ADD`, `COPY`
### 2.4.4.4 `ENTRYPOINT`, `CMD`



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
