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

<br>

### 파일 제거하기(unstaging) 
- [`reset`](https://git-scm.com/docs/git-reset)
- [`restore`](https://git-scm.com/docs/git-restore)
```bash
git reset HEAD <file>...

git restore --staged <file>...
```

<br>

### 커밋하기 
- [`commit`](https://git-scm.com/docs/git-commit)
```bash
# core editor
git commit

# inline
git commit -m "메시지"
```
- 커밋 아이디는 SHA-1 아이디라고 한다.
- tracking중인 파일의 변경을 staging + commit 한번에 하기: `commit -a`
```bash
git commit -am "message"
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
# 현재 작업(HEAD)을 저장
git stash

# stash 목록 확인
git stash list

# statsh 다시 가져오기(pop = apply + drop)
git stash pop
```
- `apply`는 stash에서 내용을 가져와 현재 working dir에 반영하는것
- `drop`은 stash에서 내용을 지우는 것, `pop`은 apply하고 drop한다.

<br>

### Time Travel With `Reset` and `Reflog`
- [`reset`](https://git-scm.com/docs/git-reset)은 `soft`, `mixed(default)`, `hard` 세가지 옵션이 있다.
  - `soft` : HEAD를 특정 commit으로 옮기고, 현재 working dir 내용은 staging한다.
  - `mixed` : HEAD를 특정 commit으로 옮기고, 현재 working dir 내용은 staging 하지 않는다.
  - `hard` : HEAD를 특정 commit으로 옮기고, 현재 working dir 내용은 다 유실된다.(destructive).
- 이 때, 정확한 기준은 못찾겠으나, tag붙은것 이후의 commit들은 hist로는 안보이는데, `reflog`로 볼 수 있다.
```bash
# 특정 커밋으로 돌아가기
git reset <commit> --<soft|mixed|hard>
```
- [`reflog`](https://git-scm.com/docs/git-reflog)는 repository에서 했던 모든 액션들을 보여준다.
```bash
git reflog
```