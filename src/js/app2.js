/*
 Написати клас ArrayWrapper.
 Це клас, який в конструктор приймає масив і надає наступні методи роботи з цим масивом:
 // - generateRandom(itemsAmount) - генерує масив з випадкових чисел вказаної довжини
 // - convertToString(delimiter) - обєднує всі елементи в строку розділені вказаним роздільником
 // - getCount() - повертає кількість елементів
 // - getSourceArray() - повертає копію масиву на базі якого він створений
 - initializeFrom(sourceArray) - ініціалізується з переданого масиву
 // - remove(index) - видаляє елемент по індексу
 // - add(item) - додає новий елемент
 // - contains(target) - перевіряє чи такий елемент є
 // - indexOf(item) - повертає індекс переданого елемента
 // - getAllOccurrences(item) - повертає масив індексів, під якими зустрічається переданий елемент
 */

function ArrayWrapper() {
    this.arr = [];
}

ArrayWrapper.prototype.generateRandom = function (lengths) {
    this.arr.splice(0, this.arr.length);
    for (var i = 0; i < lengths; i++) {
        this.arr.push(Math.round(Math.random() * 100));
    }
    console.log(this.arr);
};

ArrayWrapper.prototype.convertToString = function (delimiter) {
    var str = this.arr[0] + delimiter + " ";
    for (var i = 1; i < this.arr.length; i++) {
        str = str + (this.arr[i] + delimiter + " ");
    }
    str = str.slice(0, -2);
    console.log(str);
};

ArrayWrapper.prototype.getCount = function () {
    console.log(this.arr.length);
};

ArrayWrapper.prototype.getSourceArray = function () {
    console.log(this.arr.slice(0));
};

ArrayWrapper.prototype.initializeFrom = function (sourceArray) {
    console.log(this.arr = sourceArray);
};

ArrayWrapper.prototype.remove = function (index) {
    this.arr.splice(index, 1);
    console.log(this.arr);
};

ArrayWrapper.prototype.add = function (item) {
    this.arr.push(item);
    console.log(this.arr);
};

ArrayWrapper.prototype.contains = function (target) {
    var i = this.arr.length;
    while (i--) {
        if (this.arr[i] === target) {
            return true;
        }
    }
    return false;
};

ArrayWrapper.prototype.indexOf = function (item) {
    console.log(this.arr.indexOf(item));
};

ArrayWrapper.prototype.getAllOccurrences = function (item) {
    var newArr = [];
    for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i] === item) {
            newArr.push(i);
        }
    }
    console.log(newArr);

    // var newArr = [];
    // for (var i = this.arr.indexOf(item); i !== -1; i = this.arr.indexOf(item, i++)) {
    //     newArr.push(i);
    // }
};

var randArray = new ArrayWrapper();

