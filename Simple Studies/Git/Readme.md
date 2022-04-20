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
