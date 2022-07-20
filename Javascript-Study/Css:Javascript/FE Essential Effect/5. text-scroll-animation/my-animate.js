/**
 * 구현 방식 설명듣고 내가 한 구현(2개만)
 * setTimeout을 60fps로 해서 1px씩 translateX 변수값 증가시키는 방식.
 */
const pTag1 = document.querySelector('.first-parallel')
    const pTag2 = document.querySelector('.second-parallel')
    const pTag3 = document.querySelector('.third-parallel')
    const pTag4 = document.querySelector('.forth-parallel')

    const textArr1 = 'Yummy Tasty Delicious Useful Coding Yummy Yummmmy Yummmmmmmmmy yum'.split(' ')
    const textArr2 = 'Chicken Hamburger Pizza Salad Sushi Bibimbab Gimbab JJajangmyeon'.split(' ')
    const textArr3 = "Let's Dive Into This Tutorial Take It Easy! Don't Worry".split(' ')
    const textArr4 = 'Pure Moral Conscientious Meritorious Worthy Exemplary Upright '.split(' ')

    function initTexts(element, textArray) {
      textArray
        .concat(textArray)
        .forEach(text => element.innerText += `${text}\u00A0\u00A0\u00A0\u00A0`);
    }

    initTexts(pTag1, textArr1)
    initTexts(pTag2, textArr2)
    initTexts(pTag3, textArr3)
    initTexts(pTag4, textArr4)

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    const total1 = pTag1.scrollWidth / 2;
    const total2 = pTag2.scrollWidth / 2;
    const total3 = pTag3.scrollWidth / 2;
    const total4 = pTag4.scrollWidth / 2;

    function slideText() {
      count1 = count1 >= total1 ? 1
        : count1 + 1 > total1
          ? total1
          : count1 + 1;
      pTag1.style.setProperty('--x1', `-${count1}px`);

      count2 = count2 >= total2 ? 1
        : count2 + 1 > total2
          ? total2
          : count2 + 1;
      pTag2.style.setProperty('--x2', `-${count2}px`);
    }

    setInterval(() => {
      slideText();
    }, 16.6);

    console.log('얌?')

    document.addEventListener('scroll', () => {
      console.log('슷크롤')
      slideText();
    });
