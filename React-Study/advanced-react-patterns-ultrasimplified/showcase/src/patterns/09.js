import React, { useCallback, useLayoutEffect, useState, useRef, useEffect } from 'react';
import mojs from 'mo-js';
import styles from './index.css'
import userStyles from './usage.css'

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

/**
 * Custom Hook for animation
 */
const useClapAnimation = ({ clapEl, clapCountEl, clapTotalEl }) => {
  
  
  // lazy-initial-state(https://ko.reactjs.org/docs/hooks-reference.html#lazy-initial-states), 훅 밖에 변수로 선언하는것과 동일한 효과
  const [animationTimeline, setAnimationTimeline] = useState(() => new mojs.Timeline())
  
  useLayoutEffect(() => {
    if(!clapEl || !clapCountEl || !clapTotalEl) return;
    const tlDuration = 300;
    const scaleButton = new mojs.Html({
      el: clapEl, // target element
      duration: tlDuration, // 에니메이션 시간
      scale: { 1.3: 1 }, // { start: end }로 작성한다
      easing: mojs.easing.ease.out,
    });

    const triangleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50 : 95}, 
      count: 5,
      angle: 30,  // 전체 파티클의 회전
      children: {
        shape: 'polygon', // 모양
        radius: {6: 0},  // 크기
        stroke: 'rgba(211, 54, 0, 0.5)', // 색깔
        strokeWidth: 2,
        angle: 210, // 각 파티클의 회전
        speed: 0.2,
        delay: 30,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration
      }
    });

    const circleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50 : 75}, 
      angle: 25,  // 전체 파티클의 회전
      duration: tlDuration,
      children: {
        shape: 'circle', // 모양
        fill: 'rgba(149, 165, 166, 0.5)', // 색깔
        delay: 30,
        speed: 0.2,
        radius: { 3: 0},  // 크기
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration
      }
    });

    const countAnimation = new mojs.Html({
      el: clapCountEl,
      opacity: { 0: 1},
      y: {0: -30},
      duration: tlDuration,
    }).then({ // 앞이 끝나면 then을 수행한다.
      opacity: {1: 0},
      y: -80, // 80px up
      delay: tlDuration/2,
    })

    const countTotalAnimation = new mojs.Html({
      el: clapTotalEl,
      opacity: {0: 1},
      delay: (3 * tlDuration)/2,
      duration: tlDuration,
      y: {0: -3}
    })

    // 초기 scale 1로 설정, 이걸 안하면 최초 1.3인 상태다.
    if(typeof clapEl === 'string') {
      const clap = document.getElementById('clap');
      clap.style.transform = 'scale(1,1)';
    } else {
      clapEl.style.transform = 'scale(1,1)';
    }

    const newAnimationTimeline = animationTimeline.add([
      scaleButton, 
      countAnimation, 
      triangleBurst, 
      circleBurst,
      countTotalAnimation
    ]);
    setAnimationTimeline(newAnimationTimeline);
  }, [clapEl, clapCountEl, clapTotalEl]);

  return animationTimeline;
}

/**
 * custom useDOMRef Hook
 */
const useDOMRef = () => {
  const [DOMRef, setRefState ] = useState({});

  const setRef = useCallback((node) => {
    setRefState(prevRefState => ({
      ...prevRefState,
      [node.dataset.refkey]: node
    }))
  }, [])
  return [DOMRef, setRef];
}

const callFnsInSequence = (...fns) => (...args) => {
  fns.forEach(fn => fn && fn(...args));
}

/**
 * custom hook for getting previous prop/state
 */
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value 
  });
  console.log('usePrevious',ref.current)
  return ref.current;
}

/**
 * custom useClapState Hook
 */
const useClapState = (initialState = INITIAL_STATE) => {
  const MAXIMIUM_USER_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);
  const { count } = clapState;
  const updateClapState = useCallback(() => {
    setClapState(({count, countTotal}) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMIUM_USER_CLAP), 
      countTotal: 
        count < MAXIMIUM_USER_CLAP 
          ? countTotal + 1 
          : countTotal
    }))
  }, [])

  const initialStateRef = useRef(initialState);


  const prevCount = usePrevious(count);

  const resetRef = useRef(0);
  const reset = useCallback(() => {
    if(prevCount !== count) {
      setClapState(initialStateRef.current);
      resetRef.current++;
    }
  }, [prevCount, count, resetRef.curent]);

  const getTogglerProps = ({onClick, ...otherProps} = {}) => ({
    onClick: callFnsInSequence(updateClapState, onClick),
    'aria-pressed': clapState.isClicked,
    ...otherProps
  });

  const getCounterProps = ({...otherProps}) => ({
    count: clapState.count,
    'aria-valuemax': MAXIMIUM_USER_CLAP,
    'aria-valuemin': 0,
    'aria-valuenow': clapState.count,
    ...otherProps
  });
  return {
    clapState, 
    setClapState, 
    getTogglerProps, 
    getCounterProps, 
    reset,
    resetDeps: resetRef.current
  };
}

/**
 * custom useEffectAfterMount Hook
 */
const useEffectAfterMount = (cb, deps) => {
  const componentDidMount = useRef(true);
  useEffect(()=> {
    if(!componentDidMount.current) {
      return  cb();
    }
    componentDidMount.current = false;
    // lint 꺼줘야함
  }, deps)
}

const ClapContainer = ({children, setRef, onClick, ...restProps }) => {
  return <button 
    ref={setRef} 
    className={styles.clap} 
    onClick={onClick}
    {...restProps}
  >
    {children}
  </button>
}

/**
 * subcomponents -> stateless component
 */

const ClapIcon = ({ isClicked }) => {
  return <span>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="-549 338 100.1 125" 
      className={`${styles.icon} ${isClicked && styles.checked}`}

    >
      <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
      <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" />
    </svg>
  </span>  
}

const ClapCount = ({ count, setRef, ...restProps }) => {
  return <span ref={setRef} className={styles.count} {...restProps}>
    + {count}
  </span>
}

const CountTotal = ({ countTotal, setRef, ...restProps }) => {
  return <span ref={setRef} className={styles.total} {...restProps}>
    {countTotal}
  </span>
}

const userInitialState = {
  count: 0,
  countTotal: 1000,
  isClicked: false
}

/**
 * Usage
 */
const Usage = () => {
  const {clapState, reset, getTogglerProps, getCounterProps, resetDeps} = useClapState(userInitialState);
  const { count, isClicked, countTotal } = clapState;
  const [{clapRef, clapCountRef, clapTotalRef}, setRef] = useDOMRef();
  
  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    clapCountEl: clapCountRef,
    clapTotalEl: clapTotalRef
  });

  useEffectAfterMount(() => {
    animationTimeline.replay();
  }, [animationTimeline, clapState.count]);

  // side effect of reset
  const [uploadingReset, setUpload] = useState(false);
  useEffectAfterMount(() => {
    console.log('resetDeps : ',resetDeps)
    setUpload(true);
    // 서버에 요청을 보내고 3초뒤 응답 받는다고 가정한다.
    const id = setTimeout(() => {
      setUpload(false);
    }, 3000);

    return () => clearTimeout(id);
  }, [resetDeps])


  return (
    <>
      <div style={{ width: '100%' }}>
        <ClapContainer 
          setRef={setRef} 
          data-refkey="clapRef" 
          {...getTogglerProps()}
        >
          <ClapIcon isClicked={isClicked}/> 
          <ClapCount setRef={setRef} data-refkey="clapCountRef" {...getCounterProps()} />
          <CountTotal setRef={setRef} countTotal={countTotal} data-refkey="clapTotalRef"/>
        </ClapContainer>
        
        <section>

          <button onClick={reset} className={userStyles.resetBtn}>
            reset
          </button>
          <pre className={userStyles.resetMsg}>
            {JSON.stringify({count, countTotal, isClicked})}
          </pre>
          {uploadingReset && <pre className={userStyles.resetMsg}>
            {`uploading reset ${resetDeps}...`}
          </pre>}
        </section>

        
      </div>
    </>
  )
}

export default Usage;