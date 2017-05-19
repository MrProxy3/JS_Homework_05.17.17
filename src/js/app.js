/*
 Переписати програму зі створення обєктів машин (5 машин, model, brand, engineDisplacement)
 на використання класів (функцій-конструкторів)
 */

function Cars() {
    this.car = [];
}

Cars.prototype.addCar = function () {
    for (var i = 0; i < 5; i++) {
        this.car.push({
            firmName: prompt("Type firm name of your car."),
            modelName: prompt("Type model name of your car."),
            engine: parseFloat(prompt("Engine?"))
        });
    }
    console.log(this.car);
};

Cars.prototype.chooseEngine = function (engineValue) {
    var carEngine = [];
    for (var k = 0; k < this.car.length - 1; k++) {
        if (this.car[k].engine > engineValue) {
            carEngine.push(this.car[k]);
        }
    }
    console.log(carEngine);
};

var someValue = new Cars();