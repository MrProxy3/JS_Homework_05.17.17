/*
 Написати клас Point, яка приймає в конструктор дві точки - "х" та "у".
 Цей клас повинен мати наступні методи:
 - add(otherPoint) - додає координати другої точки і повертає нову точку
 (наприклад, var a=  new Point(10, 10); var b = new Point(5, 5), то результатом виклику a.add(b) буде Point(15, 15))
 - subtract(otherPoint) - аналогічно до add, але робить віднімання
 - getX() - повертає X
 - getY() - повертає Y
 - equals(otherPoint) - повертає true, якщо дві точки мають одинакові координати
 (var a = new Point(10, 10); var b = new Point(10, 10) -> a.equals(b) === true)
 - toString() -> Point{x=10, y=10} - переопреділяє метод так, щоб вивід був, як в прикладі
 - valueOf - повертає суму двох точок
 */

function Point(x, y) {

    return {
        x: x,
        y: y,
        add: function (x2, y2) {
            return "addPoint {" + (this.x + x2) + "; " + (this.y + y2) + "}";
        },
        subtract: function (x2, y2) {
            return "subtractPoint {" + (this.x - x2) + "; " + (this.y - y2) + "}";
        },
        getX: function () {
            return "getX = " + this.x;
        },
        getY: function () {
            return "getY = " + this.y;
        },
        equals: function (x2, y2) {
            return (this.x === x2 && this.y === y2)
        },
        toString: function () {
            return "Point{x=" + this.x + ", y=" + this.y + "}";
        },
        valueOf: function () {
            return "valueOf = " + (this.x + this.y);
        }
    }
}


var point2 = new Point(17, 23);
console.log(point2.add(8, 14));
console.log(point2.subtract(5, 10));
console.log(point2.getX());
console.log(point2.getY());
console.log(point2.equals(17, 24));
console.log(point2.toString());
console.log(point2.valueOf());
