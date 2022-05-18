# Git을 제대로 알고쓰자

## Config
- 계정설정 
```sh
git config --global user.name 'user-name'
git config --global user.email 'email@email.com'
```
- core editor 설정(sublime text로)
```sh
sudo ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
git config --global core.editor "subl -w"

# or

git config --global core.editor "'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl' -n -w"
```
- core editor 작동확인
```sh
git config --global -e
```
- `diff tool`, `merge tool`을 VSCODE로 설정
```bash
# git 설정을 편집기로 열기
git config --global -e

# 아래 설정 추가
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
[merge]
    tool = vscode
[mergetool "vscode"]
    cmd = code --wait $MERGED
```

<br>

- git의 설정파일은 아래와 같이 3종류가 있다.(Mac 기준)
  - `/etc/gitconfig` : 시스템의 모든 사용자와 모든 저장소가 공유하는 설정. `git config --system`으로 이 파일을 읽고 쓸 수 있다.
  - `~/.gitconfig` : 현재 사용자에게만 적용되는 설정. `git config --global`로 이 파일을 읽고 쓸 수 있다.
  - `.git/config` : 이 파일은 git 디렉토리에 있고 현재 저장소에만 적용된다. `--local`옵션으로 이 팡ㄹ을 읽고 쓸 수 있따.
- 설정 파일의 적용 우선순위는 아래에서 위로다.



<br><br>

## Basic Concepts
- 깃 레포지토리 생성. folder_name을 적으면 해당 폴터를 루트 디렉토리로 해서 `.git` 파일이 생성된다.
```bash
git init [folder_name]
```

<br>

### Git Status
  - Local Git States
    - Working Directory : 전체 디렉토리
    - Staging Area : 커밋 할 파일을 올리는 단계
    - Repository(.git folder) : 전체 커밋된 파일들
  - Remote
    - 원격 저장소

  - 상태 보기(루트 디렉토리에서)
  ```bash
  git status
  ```

<br>

### 파일 추가하기(staging area)
- [`add`](https://git-scm.com/docs/git-add)
```bash
# 파일 추가
git add <file>...

# 현재 디렉토리 전체 추가(tracking + untracking)
git add .
git add -A

# tracking중인 파일 중 변경있는 파일만 추가
git add -u
```
- 하나의 파일에 군대군대 수정이 있을 때 일부(chunk)만 stage 할 수 있다. : [patch](https://git-scm.com/docs/git-add#Documentation/git-add.txt---patch)
```
git add -p
```
- chunk별로 stage 할건지 물어본다. y/n으로 대답하면 된다.


<br>

### Staging 영역의 파일을 Unstaging 영역으로 이동
- [`reset`](https://git-scm.com/docs/git-reset)
- [`restore`](https://git-scm.com/docs/git-restore)
```bash
git reset HEAD <file>...

git restore --staged <file>...
```
- 둘 다 똑같은 역할을 한다.

<br>

### 커밋하기 
- [`commit`](https://git-scm.com/docs/git-commit)
```bash
# core editor 실행
git commit
```
- 커밋 아이디는 SHA-1 아이디라고 한다.
- commit은 Subject와 Body로 구성된다. 에디터상에서 첫줄은 subject로 인식하고 subject에서 한 줄 띄어서 쓰는 내용은 자동으로 body로 인식한다.
- `# 내용`은 주석으로 무시한다.

```bash
# inline
git commit -m "메시지"
```
- tracking중인 파일의 변경을 staging + commit 한번에 하기: `commit -a`
```bash
git commit -am "message"
```

<br>

- 최근에 커밋을 했는데, 메시지를 잘못 적었거나 빠트린 파일이 있다는걸 알아차렸다. `--amend` 옵션으로 해당 커밋을 수정할 수 있다.(최근 커밋만 수정 가능하다.)
```bash
# 빼먹은 파일 staging에 추가(메시지만 바꿀거라면 필요하지 않다)
git add <forgotten_files>

# 커밋 되돌리기
git commit --amend

# 만약에 최신 커밋이 원격지에 푸시된 상태였다면, push --force로 원격지 커밋도 바꿀 수 있다.
git push --force
```




<br>

### 커밋 히스토리 보기 
- [`log`](https://git-scm.com/docs/git-show), [`show`](https://git-scm.com/docs/git-show)
```bash
git log
git show
```
- **log는 커밋 히스토리를 보여주고, show는 커밋히스토리를 포함하는 여러 객체를 보여준다.**
- `log`의 다양한 옵션
```bash
# log에 적용 가능한 다양한 옵션 보기
git help log

# 각 커밋을 한줄씩, graph로, 어떤커밋이 어떤브랜치것인지, 현재 repo에서 볼 수 있는 모든 브랜치에 대해, 출력한다.
git log --oneline --graph --decorate --all
```

<br>

### git이 tracking하고 있는 파일 보기 
- [`ls-files`](https://git-scm.com/docs/git-ls-files)
```bash
git ls-files
```

<br>

### 수정한 파일을 repository의 최근 커밋으로 되돌리기
-  [`checkout`](https://git-scm.com/docs/git-checkout)
```bash
git checkout -- <filename>
```



### 깃 커맨드의 `alias` 만들기 
- [`config`](https://git-scm.com/docs/git-config)
```bash
# 형식
git config --global alias.NAME "COMMAND"

# 예
git config --global alias.hist "log --oneline --graph --decorate --all"

# 확인
git config --global --list | grep alias

# 실행
git hist
```

<br>

### tracking중인 파일의 파일명 변경 
- [`mv`](https://git-scm.com/docs/git-mv)
- `mv`는 staging까지 해준다. 커밋은 따로 해줘야함
- 단순히 os에서 파일명 변경하는건 git에서 `파일 삭제 + 생성`으로 인식한다.(스테이징하면 rename으로 인식하긴 함)
```bash
git mv sample.txt demo.txt
git commit -m "sample.txt 파일명 demo.txt로 변경"
```

<br>

### tracking중인 파일 제거 
- [`rm`](https://git-scm.com/docs/git-rm)
- `rm`역시 staging까지만 해준다. 커밋은 따로.
```bash
git rm demo.txt
git commit -m "demo.txt 제거"
```

- tracking하지 않을 파일을 추가 : [`.gitignore`](https://git-scm.com/docs/gitignore)
- `node_modules/`나 `log파일`같은 파일을 실수로 커밋해버렸을 때 이걸 git에서만 추적하지 않도록 하려면 **.gitignore 에 추가**하면서 하드디스크에는 파일을 남겨두고 git snaphot에서만 삭제해야한다.
```bash
# --cached 옵션은 디스크상에서는 파일을 남겨둔 채 파일 삭제한것을 staging한다.
git rm --cached <file>

git rm --cached log/\*.log
```

<br>

### 파일 이름 변경
- [`mv`](https://git-scm.com/docs/git-mv)는 추적중인 파일 이름을 변경한다.
```bash
git mv <source> <destination>

# README.md -> README
git mv README.md README
```
- 사실 mv는 `rm` + `add`와 같다. 

<br>

## Advanced Concepts

### 커밋별로 변경 내용 확인하기
- [`difftool`](https://git-scm.com/docs/git-difftool)
```bash
# 커밋 목록 확인
git hist

# 현재 working directory와 HEAD 비교
git difftool

# 커밋별로 비교
git difftool <commit> <commit>
```

<br>

### Types of Merge
- Fast Foward
  - 가장쉬운 케이스
  - 브랜치 분기 이후 자식 브랜치에만 작업되고 부모브랜치에는 변경 없을경우
  - disable 할 수 있다.
  - merge하면 마치 부모 브랜치에서 작업한 것 처럼 합쳐준다.(merge commit이 없다)
- Automatic Merge
  - Confilct가 일어나지 않는 merge
  - 양쪽 timeline(branch)가 모두 유지된다.
  - merge commit은 destination에 생긴다.
- Manual Merge
  - Conflict가 발생해 Auto merge가 불가능
  - 사용자가 conflict를 resolve하면 merge commit에 반영된다.

<br>

### Marker
- Marker는 Pointer 같은 것이다.
- HEAD: `HEAD`는 보통 현재 브랜치의 최근 커밋을 가리킨다. 물론 옮길수도 있다.

### Branch
- [`branch`](https://git-scm.com/docs/git-branch)
- [`checkout`](https://git-scm.com/docs/git-checkout)
```bash
# 브랜치 목록
git branch

# 브랜치 생성 및 checkout 
git checkout -b <branch>

# 예
git checkout -b updates

# merge하기
# 1. destination에 checkout
git checkout <branch>
git checkout master

# 2. merge할 브랜치 merge
git merge <branch>
git merge updates


# 브랜치 삭제
git branch -d <branch>
git branch -d updates
```

<br>

### Manual Merge
- merge시 Conflict가 발생한다. mergetool을 열어 resolve하자.
```bash
# 머지툴
git mergetool

# ...저장

# 커밋
git commit -m "Resolving Conflict"
```
- 여기까지 수행 후, `git status` 를 실행해보면 Conflict된 파일의 `~.orig`파일이 추가된 걸 볼 수 있다. 이건 원본파일을 의미하는데, untracked 되고 있는 상태다. 이게 나중에 repository에 포함되면 안되니 `.gitignore`에 추가하고, 해당 파일은 삭제하자.(나는 `BACKUP`, `LOCAL`, `REMOTE`가 붙은 파일들도 생성된다.)
- sublime merge 같은데서는 이걸 자동으로 다 지워줬던 모양이다.

<br>

### Tagging
- 태그는 브랜치에 label을 다는걸 말한다. 커밋할 때 기본적으로는 HEAD에 추가되는데, 특정 태그에 commit하도록 할 수도 있다?
- `lightweight tag`: 태그명만 있는 태그
- `annotated tag`: 태그에 부수정보들이 들어있는 태그
- [`tag`](https://git-scm.com/docs/git-tag)
```bash
# 태그 생성
git tag <tagname>
git tag mytag

# annotated tag 생성
git tag -a <tagname> -m <message>
git tag -a v1.0 -m "Release 1.0"

# 태그 확인
git tag --list

# 태그 제거
git tag -d <tagname>
```

- 보통 `Annotated Tag`를 많이 활용한다. ***버전 release마다 태그를 붙여서, 해당 release의 milestone을 바로 확인할 수 있게 한다.***
```bash
# tag가 붙은 커밋의 정보확인
git show <tagname>
git show v1.0
```

<br>

### Stashing
- 작업하던걸 당장 커밋에 반영하지 않고 잠시 빼놓는데 사용한다. [`stash`](https://git-scm.com/docs/git-stash)로 저장하면 해당 내용은 커밋되진 않고 잠시 stash에 저장된 상태로, 파일에서는 해당 내용이 다 제거된다.(현재 상태 : WIP, Work In Progress)
- stash한 후 `git hist`로 로그 확인해보면 statsh한 index와 현재의 WIP가 생성된걸 알 수 잇따.

```bash
# 현재 작업(HEAD)을 저장 (name 생략가능)
git stash <name>
# save -m 옵션으로 stash 메시지 작성
git stash save -m <message>
# save -u 옵션으로 untracked file도 stash할 수 있다.
git stash save -u

# stash 목록 확인
git stash list

# statsh 다시 가져오기(pop = apply + drop)
git stash pop

# 현재 stash list 목록 확인 -> {이름}: {브랜치}: {메시지}
git stash list
# stash@{0}: On design-system: 디자인 시스템 임시 정리
# stash@{1}: WIP on design-system: 591d89b Section3 - Monorepositories

# stack의 꼭대기가 아니라 원하는 이름의 stash를 가져올 수 있다.(유용)
git stash pop <name>

# 특정 파일만 stash하기, 역시 glob 지원
git stash push -m "description" 경로  
git stash push -m "세개 저장하기" /src/one.vue  /src/two.vue   /src/three.vue
git stash push -m "한번에 저장하기" /src/*
```
- `apply`는 stash에서 내용을 가져와 현재 working dir에 반영하는것
- `drop`은 stash에서 내용을 지우는 것, `pop`은 apply하고 drop한다.
- `pop`이라는 단어에서 알 수 있듯이, stash는 일종의 스택으로 관리된다고 한다. 
- `stash`는 staged + unstaged 모두 stash에 저장하는데, pop을 해도 staged/unstaged 상태는 복구되지 않는다고 한다.
- stash는 브랜치와 별개로 존재하기 때문에 모든 브랜치에서 공유하고 있다고 보면 된다. 

<br>

### Time Travel With `Reset` and `Reflog`
- [공식문서 - Reset 명확하게 알기](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0#_git_reset)
- [`reset`](https://git-scm.com/docs/git-reset)은 현재 HEAD가 가리키는 브랜치가 가리키는 커밋 객체를 변경하는 동작이다.
- Index(Staging)과 Working Directory를 어떤 상태로 만드느냐에 따라 `soft`, `mixed(default)`, `hard` 세가지 옵션이 있다.
  - `soft` : reset 전 commit의 내용을 working directory에 복사하고, staging한다.
  - `mixed` : reset 전 commit의 내용을 working directory에 복사하지만, staging 하지 않는다.(기본값)
  - `hard` : reset 전 commit의 내용은 모두 무시된다.
- reset하면 해당 브랜치가 가리키는 커밋(최신커밋)이 바뀌므로 그 이후의 커밋은 `hist`로 볼 수 없다. `reflog`로 봐야 한다.
```bash
# 특정 커밋으로 돌아가기
git reset <commit> --<soft|mixed|hard>
```
- [`reflog`](https://git-scm.com/docs/git-reflog)는 HEAD의 참조 변경 내역을 보여준다. 이걸 Reference logs(reflog)라고 한다. 예를 들어 `HEAD@{2}`는 헤드가 2번 전에 움직인곳을 의미한다. 그냥 최신 기준으로 1씩 증가한다고 보면 된다.
- `<commit>`에 `HEAD~`를 넣으면 현재 커밋의 부모 커밋(이전 최신 커밋)으로 이동한다.
- `<commit>`에 경로(파일)은 `mixed`로만 동작한다. index 영역(staging)의 해당 파일을 unstage하는 효과를 지닌다.(status시 unstage하려면 이렇게 하라고 나옴)

```bash
git reflog
```

- Reset의 옵션을 잘 이용하면 특정 두 커밋을 합칠수도 있따. [여기](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0#_git_reset)
- [`reset`](https://git-scm.com/docs/git-reset)의 합치기를 보도록 하자. 좀만 생각하면 응용할 수 있으므로 정리하지 않는다.

<br>

### Checkout vs Reset
- `reset`은 HEAD가 기리키는 브랜치의 Refs를 업데이트한다.
- `checkout`은 HEAD를 업데이트한다. : HEAD가 가리키는 브랜치의 변경
- dev에 chekout 한 상태에서 `git reset master`를 하면 어떻게 될까?
![reset_결과](https://git-scm.com/book/en/v2/images/reset-checkout.png)
- 현재 브랜치는 그대로 dev인 상태로 dev 브랜치의 최신 커밋이 master와 동일하게 갱신된다.


<br>

### Linking to remote repository
- [`remote`](https://git-scm.com/docs/git-remote)는 추적중인 레포지토리를 관리한다.
```bash
# 관리 중인 repository 확인하기
gir remote -v

# repository 추가하기
git remote add [-t <branch>] [-m <master>] <name> <URL>
git remote add origin git@github.com:Motiveko/demo.git

# repoistory 지우기
git remote remove <name>

# 원격지 주소 변경(레포지토리 명 변경 등으로 인해 URL 변경시)
git remote set-url <name> <URL>
git remote set-url origin https://github.com/Motiveko/website
```
- 관례상 첫벗째/가장 중요한 레포지토리는 이름을 `origin`이라고 짓는다. 

<br>

### Pushing Changes
- [`push`](https://git-scm.com/docs/git-push)를 이용해서 원격 repository에 변경을 push할 수 있다.
```bash
git push -u <name> <branch> --tags

git push -u origin main
```
- `-u`는 local과 remote의 싱크를 맞춰준다. push하기 전 `git-pull`을 수행하는 방식이라고 한다.
- `--tags` local에 있는 모든 tag를 remote에 보낸다.

### ssh 설정하기
- ssh는 private + public 키 쌍으로 통신한다. 내가 소유한 pc에서 이걸 만들고 사용하므로서 내가 소유한 기기인지 판단할 수 있게 된다.
```bash
# public/private key 생성
ssh-keygen -t rsa -C "rhehdrla@naver.com"
```
- passphrase(비번같은거)를 등록할 수 있다. 
- `-t`는 타입, `-C`는 common name 
- `id_ras`, `id_ras.pub` 파일이 생성되고, 각각 private/public 키다.  `id_ras.pub`를 github의 ssh에 등록하면 된다.
- 아래 명령어로 ssh 통신 가능한지 확인할 수 있다
```bash
ssh -T git@github.com
```

<br>

### clone
- [`clone`](https://git-scm.com/docs/git-clone)을 이용해 원격 repo 프로젝트를 가져올 수 잇다
```bash
# clone하기, folder-name으로 폴더를 만들 수 있다.
git clone <URL> <folder-name>
```

<br>

### fetch vs pull
- [`pull`](https://git-scm.com/docs/git-pull) 은 remote repo와 local repo를 integrate한다. 쉽게말해 [`fetch`](https://git-scm.com/docs/git-fetch) + `merge`를 동시수행한다고 할 수 있는것이다
- auto merge가 안되면 conflict가 발생하고 이걸 수정해줘야한다. 
- fetch하면 대략 이렇게 나온다. origin은 브랜치가 갈라진 상태인걸 확인할 수 있다
![fetch](https://velog.velcdn.com/images/motiveko/post/ead88db6-c06e-4202-a3fa-dbf0f64e9aaa/image.png)

<br>

### show를 이용해 특정 커밋 기록 보기
- [`show`](https://git-scm.com/docs/git-show)는 여러가지 타입의 object를 볼 수 있다. 그 중 하나가 커밋이다.
```bash
git show <commit-id>
```

<br>

## 추가 Git for Professionals Tutorial
> [Git for Professionals Tutorial](https://www.youtube.com/watch?v=Uszj_k0DGsg&list=LL&index=6&t=490s)를 보고 여기 정리한다.

### Branching Stragtegies

브랜치는 자유롭게 사용할 수 있다. 단지 협업시, 팀에서 Convention을 정하고 이걸 문서화 해야 한다. 

브랜치를 분류할 수 있는 방법은 몇가지가 있다.
- 구조?에 따라
  1. Mainline Development
    - Always be Interating
    - 소수의 브랜치(작은규모에서는 1개의 main 브랜치)
    - commit이 상대적으로 작다.
    - High Quality Testing & QA Standards

  2. State, Release, and Feature Branches
    - 메인라인이 아닌 다른 브랜치들
  
- 수명에 따라
  1. Long-Running Branch
    - Integration 브랜치들(main, development, staging, production)
    - 이 브랜치에는 커밋이 직접적으로 이뤄지지 않고 integration을 통해서만 이뤄진다.(Code Quality, Realese Schedule)
  2. Short-lived Branch
    - topic, feature, bug-fix 등의 브랜디
    - Long-Running Branch에 integration 된 후 제거된다.

<br>

대표적인 두가지 Branching Strategies가 있다.
1. Github FLow
![Github Flow](https://blog.kakaocdn.net/dn/70a1a/btrAAZMILka/BwnRKBTeZX1UWI8sddApdK/img.png)
- 아주 간단한 브랜치 전략. 1개의 long-running(main)과 feature 브랜치만 가지고 개발한다. 
- 모든 feature 브랜치는 main에서 나와 main으로 merge된다. merge는 pull request를 통해 코드리뷰/테스트 등을 통해 진행한다.
- 따로 hotfix/feature/topic.. 같은 구분이 없기때문에 브랜치 생성시 브랜치 명에 해당 브랜치의 목적을 명확하게 적어줘야한다.  

2. Gitflow
![Gitflow](https://blog.kakaocdn.net/dn/UwrHH/btrAAcyJxeV/xkIF2PeoqBSQESWcivaxb0/img.png)
- Github Flow보다 훨씬 구조화된 브랜치 전략
- 브랜치 구성은 대략 아래와 같다.
  ![Gitflow 브랜치](https://blog.kakaocdn.net/dn/bQA8c1/btrACMzkbRN/0fFHCPKTR1LhKZUKSPSti1/img.jpg)
  - master : 라이브 서버에 제품으로 출시되는 브랜치.
  - develop : 다음 출시 버전을 대비하여 개발하는 브랜치.
  - feature : 추가 기능 개발 브랜치. develop 브랜치에 들어간다.
  - release : 다음 버전 출시를 준비하는 브랜치. develop 브랜치를 release 브랜치로 옮긴 후 QA, 테스트를 진행하고 master 브랜치로 합친다.
  - hotfix : master 브랜치에서 발생한 버그를 수정하는 브랜치.


<br>

### Pull Request 
- pull request: review code from others
  - 엑세스 권한이 없는 open source repository 등에 기여할 때 많이 쓴다.
  - pull request는 branch 단위로 한다.
- fork: personal copy of a git repository
- Pull Request는 git hosting 제공사마다 조금씩 구조가 다르다. 
- Github기준으로, fork repo에서 어떤 브랜치든 작업한 후 remote에 푸시하고 나서 해당 레포지토리에 가보면 pull request를 만들것을 제안해준다. pull request 생성시 ***어떤 repository의 어떤 branch에*** pull request 할 것인지 선택할 수 있고, 메시지를 작성해서 날리면 해당 repository의 관리자에게 pr이 왔다고 알림이 갈것이다.

<br>

### Merge Conflict
- 단지 Merge할 때만 발생하는게 아니라 rebase, cherry-pick, stash apply 등 여러 경우에 발생할 수 있다.
- merge 시도시 conflict 발생할 경우 `git status`를 하면 `unmerged paths`가 있다고 말해준다. 충돌난 파일들이다.
- 이걸 resolve해도 되지만, 하기 실으면 `git {merge|rebase} --abort`로 취소할 수도 있다.
- merge => conflict 발생 => resolve => merge commit 메시지 작성 및 commit 과정이다.
- `git mergetool`을 하면 지정한 머지툴로(vscode) resolve를 할 수 있는데, 이거 하면 뭐 자꾸 conflict가 남아있는 .orig 파일이 생성된다. 이거 어째 해결하는지는 모르겠다. resolve를 중간에 잘못했을때를 대비한 `saftey copy`라고 하는데, 이거는 지우고 커밋해야한다. sublime merge는 깔끔하게 resolve해준다.

<br>

### Merge vs Rebase
- 브랜치를 병합할 땐 git은 세개의 브랜치를 본다. 
  - 1. 각 브랜치의 최신 커밋
  - 2. 병합하는 두 브랜치의 가장 최근 공통 커밋(분기점)
- `Fast foward`
   - 공통 커밋이 한 브랜치의 최신 커밋이면, 해당 브랜치에 병합하는 브랜치의 커밋이 쭉 나열된다.(간단한 케이스)
   - 두 브랜치는 동일한 commit history를 가진다.
- `Merge Commit`
  - git이 확인하는 세개의 브랜치가 전부 다른경우, 두 브랜치간의 차이를 commit하는데, 이를 `merge commit` 이라고 한다.
  - ***일반 커밋은 사람이 작성하지만 merge commit은 git이 자동으로 작성해준다.***

- `Rebase`
  - 브랜치를 합치면서 생기는 merge commit이 싫을 경우 `Rebase`할 수 있다. merge commit이 없기 때문에 마치 하나의 브랜치에서 계속 작업한 것 처럼 보인다.(깔끔)
  - `Rebase branch B into branch A`를 한다고 해보자. Rebase는 아래의 과정으로 이뤄진다.
    1. git은 `branch A`에서 양 브랜치의 공통 커밋 이후의 모든 커밋을 제거한다.
    2. `branch B`의 커밋을 `branch A`에 반영한다. 이 시점에서 두 브랜치는 똑같아 보인다.
    3. 반영된 커밋 다음에 branch A의 기존 커밋을 반영한다.
  - 이렇게 하면 `merge commit`없이 `branch B` 작업 후 `branch A` 작업한 것 처럼 커밋이 구성된다. 이 말은 ***branch A의 `commit history`를 재작성 한다는 것이다.*** `*`표시가 남는다.
  - rebase 과정에서 뭔가 문제가 있어서 되돌리고 싶다면 어떻게 할까? [`reflog`와 `reset`을 이용해서 rebase를 되돌릴 수 있다.](https://www.delftstack.com/ko/howto/git/undo-rebase-in-git/)
  - Rebase는 조심히 사용해야 한다. 이 케이스에서 ***Rebase 전에 원격지에 branch A의 커밋 내역을 푸시했다면 Rebase 하면 안된다. Rebase는 `'LOCAL'` commit history를 깔끔하게 만들때에만 사용해야한다.***

  - Rebase의 적절한 사용 시점중 하나는 내가 `feature branch`에서 작업하고 있다가, 이걸 integration 하려고 할 때, 부모 브랜치를 pull 한 뒤 local에서 Rebase하면 `부모` -> `feature` 순으로 커밋이 재조정되므로 깔끔해진다.