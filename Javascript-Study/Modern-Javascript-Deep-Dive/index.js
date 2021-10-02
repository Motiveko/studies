(function(a) {
    'use strict';
    a = 2;  // argument 재할당.
    console.log(a)
    // arguments 객체에는 반영되지 않는다.
    console.log(arguments);  // { 0: 1, length : 1}
  }(1))