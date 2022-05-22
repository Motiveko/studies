# Will Boyd - Silky Smooth Animation with CSS
> https://www.youtube.com/watch?v=bEoLCZzWZX8

- 결론 : GPU Acceleration 을 잘 활용하자!

## Rendering Flow
- html 파싱후 DOM 트리 생성
- css읽어서 DOM과 함께 랜더 트리 생성, 랜더 트리에는 <head>나 display:none 등 랜더링 될 필요 없는게 사라진다.
- 랜더트리를 만들고 Layout을 계산한다.(reflow) 이건 비용이 매우 크다.
- 레이아웃 계산 후 페인팅을한다.
	- 요소를 픽셀로 만들기위해 drawRect(), drawText(), drawCircle() 와 같은 함수를 호출한다.(resterization, rester쓰레드에서 수행)
	- 픽셀을 만들면 이걸 메모리에 올린다.
	- GPU가 스크린에 표시한다.

<br>

## Reflows
- caused by changes in geometry
- easily causes chain reactions

## Repaints
- forces pixels to be redrawn
	- color, background-color, box-shadow, background-position, border-radius, 	- width, height, margin, padding, top, bottom, left, right, font-size, ...
...

- Repaint는 Reflow를 발생시키지 않는다. 하지만 Reflow는 일반적으로 Repaint를 발생시킨다.

<br>

## GPU ACCELERATED
- no reflows, no repaints
- extremely efficient
	- transform, filter, opacity


- Reflow/Repaint는 브라우저 메인스레드에서 이뤄진다. 브라우저 메인스레드에는 자바스크립트도 돌아간다.
	-> 자바스크립트에서 while(true){} 등을 수행해서 스레드를 블록하면 에니메이션이 멈춘다!!?!

- GPU Accelerated는 GPU 스레드에서 이뤄진다. 자바스크립트와 별개로 이뤄진다.
	-> 자바스크립트에서 스레드 블록해도 에니메이션에 영향이 없다!