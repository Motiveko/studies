# Naver D2 - TECH CONCERT: FRONT END 2019 - 오늘부터 나도 FE 성능분석가
- https://www.youtube.com/watch?v=cpE1dwJgS4c

## 1. 성능이란
- LAI(Loading AND Interaction)
1. 초기 로딩 속도
  - 얼마나 페이지를 빨리 볼 수 있는지

2. 인터렉션 속도
  - 스크롤이 버벅거리는지
  - 키보드 입력이 버벅거리는지
  - 얼마나 매끄럽게 애니메이션이 동작하는지

<br>

## 2. 성능 개선 PLAN

1. 대상 선정하기
- 서비스에서 가장 많이 사용하는 화면이 무엇인가?
- 서비스에서 사용자에게 가치있는 화면이 무엇인가?

2. 성능 개선 프로세스
- 측정(Measure)
- 분석(Analytic)
- 최적화(Optimize)
- 측정,분석,최적화...

3. 언제까지?
- 목표에 도달할 때 까지.
- 네이버 : 초기로딩속도 -> 모바일 1.5s / PC 2s
- 구글 : 반응성, animation, idle time, load time 등에 대해서 세분화

<br>

## 3. 로딩

1. 로딩 속도 측정/분석 하기
Waterfall 차트 개선
  - 높이를 줄이고, 
  - 폭을 줄이고, 
  - 간격을 좁힌다.
  - 이걸 반복한다.

<br>

2. 가장 효과적인 방법 
초기 로딩시 불필요한 자원은 삭제하거나 Lazy loading 한다.
- 실수로 요청하는 자원 제거
- 초기 로딩시 필요없는 js 제거
- 뷰포트 바깥에 있는 이미지(carousel 등)

<br>

Waterfall 차트 각각의 상세에서 `Initial connection`, `Waiting(TTFB)`, `Content Download`를 개선하면 된다.

<br>

3. Initial connection : 초기 커넥션 개수
  - 웹 기술로는 개선 불가. 프로토콜을 개선해야함
  - `http1.1` : 도메인당 커넥션 하나(keep alive)
  - `http2` : 커넥션 하나에 여러개의 stream을 함께 보낼 수 있다.(Multiplexing)

<br>

4. Waiting(TTFB Time to First Byte)
  - 서버에서 시간이 그만큼 돌았다는 것. 서버 튜닝이 필요한 요소다

<br>

5. Content Download
  - 컨텐츠 크기를 줄여서 개선
    - `Minify`(공백/주석 제거) 
    - `Obfuscation`(변수명 변경, 난독화)
    - `gzip ` 적용(content-encoding : gizp)
    - 위 세개 다 적용하면 80%정도 줄일 수 있다.
  - 이미지 크기 줄이기
    - 보여지는 해상도로 줄이기
    - 이미지의 여러 meta-data 지우기
    - 레티나(ratio x 2) 대응-> 그냥 눈 딱감고 두배 해상도로 불러오자.

<br>

## 4. 랜더링 성능 개선
### 4.1 랜더링 과정
1. 서버로부터 HTML을 Stream으로 받음
2. `<head>` 태그에 포함된 자원을 병렬로 다운로드
3. `<head>` 태그에 포함된 자원을 모두 실행
4. `<body>` 태그부터 화면 그리기 시작
5. DOM 구성이 완료되면 `DOMContentLoaded` 이벤트 발생
6. 모든 자원의 로딩 완료되면 `load` 이벤트 발생(`window.load`)

```html
<html>
  <head>
    <!-- A -->
  </head>
  <body>
    <p>Hello world (1) <img src="word1.png" /></p>
    <!-- B -->
    <p>Hello world (1) <img src="word1.png" /></p>
    <!-- C -->
  </body>
</html>
```
- 위 케이스에서는 
  1. A head 안의 모든 자원 병렬 로딩
  2. B JS,CSS 실행시 페이지 랜더링 Block
  3. C 화면에 보여줄 것 다 그려짐. 이미지는 아직 로딩되지 않음

- 성능 개선
  - head 태그에는 CSS와 필수 JS만 넣어라
  - JS는 body 태그 마지막에 넣어라.(중간중간에 넣지마라! 랜더링에 블로킹이 발생한다, 물론 defer, async 쓰면 되긴한다.)
    - `defer`는 DOM 제어와 관련이 있는 스크립트, body 파싱 후에 실행된다.
    - `async`는 의존성이 없는 스크립트, 로딩은 논블로킹으로 하나 로딩 완련되면 body 파싱 완료되지 않아도 실행해버린다.
  - `<link>`에 `preload` 속성을 사용하자.

    ```html
    <!-- 예 -->
    <link rel="preload" 
      href="https://example.com/fonts/font.woff" 
      as="font" crossorigin
    >
    ```
    - `preload`를 쓰면 CSS와 함께 내부의 이미지와 폰트를 로딩한다.(안쓰면 css전체 로딩 후 내부의 폰트와 이미지 로딩)

  - 서버측에서 **HTTP2 Server Push** 기능을 이용하면 Client에서 HTML을 파싱해서 CSS, JS, 이미지를 요청하는게 아닌, HTML을 내려줄 때 서버에서 필요한 자원을 한꺼번에 다 푸시 해줄수도 있다.

<br>

## 5. 체감속도 높이기
- First Paint(FP) : HEAD 태그 종료 후,
- First Meaningful Paint(FMP): Hero 엘리먼트(앱의 가장 중요한 요소)가 보이는 시기, 구글은 이 지점을 로드 속도의 기준으로 본다.
- Time to Interactive(TTI): 사용자가 앱을 사용할 수 있기 시작하는 시점
- Hero Element란? => 앱의 가장 중요한 요소, Lazy하게 처리하면 안된다. 서비스 개발자 또는 오너가 정해야 하는 요소다.
- Hero Element를 정하고 빠르게 보여주도록 해야한다.
- 너무 큰 css, js 등의 요소가 있다면 다른 요소들과 균일한 크기로 맞추도록 튜닝한다.

<br>

## 6. 인터렉션 속도
- 인터렉션 속도의 개선은 모두 ***브라우저 Main Thread를 괴롭히지 않는것으로 귀결***된다.
- Main Thread에 의해 `Rendering Pipeline`이 동작한다! Rendering Pipeline은 아래와 같다.
  0. start : JS에 의해 DOM이 변경된다
  1. Style recalculate : DOM의 최종 스타일을 계산
      - 개발자 도구에서 요소 선택시 computed에서 중첩 사각형으로 margin, border, ... 계산해놓은거
  2. Layout : DOM의 배치와 크기 계산
  3. Paint : 화면에 그리기
  4. Composite : 레이어 조합하기(GPU), 비용이 별로 크진 않다.(웹페이지는 수많은 레이어가 이 단계에 합쳐져서 보여지는것이다)

1. Layout 발생하는 속성 건드리지 않기 
  - https://csstriggers.com
  - `transform`같은 속성은 `Composite`만 건든다. 이렇게 layout/paint 없이 composite만 변경되도록 인터렉션을 만들어야한다.

2. GPU 도움을 받기 위해 레이어 만들기
  - 브라우저가 규칙에 따라 레이어 구성
    - `position: fixed`
  - 명시적으로 레이어 구성하기
    - `translated3d`, `scale3d`, `matrix3d`, `will-change`
  - GPU의 SideEffect
    - 레이어를 초기 구성하는 작업은 CPU(Main Thread)가 진행한다.
    - 레이어에 원래 비트맵 정보를 복사하기 때문에 메모리가 2배 필요하다.
    - 따라서 꼭 필요한 부분만 레이어로 만든다.
3. `requestAnimationFrame`
  - 16ms(60fps 기준)의 비동기 주기를 보장해준다.
