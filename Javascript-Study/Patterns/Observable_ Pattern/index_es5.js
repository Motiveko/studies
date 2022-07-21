function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
  return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
  return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
  var i = startIndex;
  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i;
    }
    i++;
  }
  return -1;
};

ObserverList.prototype.removeAt = function (index) {
  this.observerList.splice(index, 1);
};

function Subject() {
  this.observerList = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
  this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
  this.observers.removeAt(this.observers.indexOf(observer, 0));
};

Subject.prototype.notify = function (context) {
  var observerCount = this.observers.count();
  for (var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context);
  }
};

function Observer() {
  this.update = function () {
    //...
  };
}

// es5에서의 상속 구현
function extend(obj, extension) {
  // for in으로 프로토타입 프로터티까지 스캔할 수 있다!
  for (var key in extension) {
    obj[key] = extension[key];
  }
}

var addBtn = document.getElementById("addNewObserver");
var container = document.getElementById("observersContainer");
var controlCheckbox = document.getElementById("mainCheckbox");
extend(controlCheckbox, new Subject());
controlCheckbox.onclick = function(){
  controlCheckbox.notify( controlCheckbox.checked );
};

addBtn.addEventListener("click", function () {
  const check = document.createElement("input");
  check.type = "checkbox";
  extend(check, new Observer());
  check.update = function (value) {
    this.checked = value;
  };

  controlCheckbox.addObserver(check);
  container.appendChild(check);
});
