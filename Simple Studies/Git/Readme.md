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

## Basic
- 깃 레포지토리 생성. folder_name을 적으면 해당 폴터를 루트 디렉토리로 해서 `.git` 파일이 생성된다.
```bash
git init [folder_name]
```

- Git Status
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
- 파일 추가하기(staging area) : [`add`](https://git-scm.com/docs/git-add)
```bash
git add <file>...
```

- 커밋하기 : [`commit`](https://git-scm.com/docs/git-commit)
```bash
# core editor
git commit

# inline
git commit -m "메시지"
```
- 커밋 아이디는 SHA-1 아이디라고 한다.

- 커밋 히스토리 보기 : [`log`](https://git-scm.com/docs/git-show), [`show`](https://git-scm.com/docs/git-show)
```bash
git log
git show
```
- log는 커밋 히스토리를 보여주고, show는 커밋히스토리를 포함하는 여러 객체를 보여준다.

- git이 tracking하고 있는 파일 보기 [`ls-files`](https://git-scm.com/docs/git-ls-files)
```bash
git ls-files
```

- tracking중인 파일의 변경을 staging + commit 한번에 하기: `commit -a`
```bash
git commit -am "message"
```