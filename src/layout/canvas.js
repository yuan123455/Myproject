// 定义一个花构造函数,用于重复绘制更多的花
const flower = function flower(cas, arrx, arry) {
    this.startX = random(arrx);
    this.startY = random(arry);
    this.spedd = 2;
    this.cas = cas;
}
// 花朵的移动方法
flower.prototype = {
    show: function () {
        // this.cas.clearRect(0, 0, 500, 500);
        this.startX -= this.spedd;
        this.startY += this.spedd;
        draw(this.cas, this.startX, this.startY);
    }

}
//绘制花朵
function draw(cas, x, y) {
    cas.fillStyle = "pink";
    cas.font = "20px SimHei";
    cas.fillText("❀", x, y);
    cas.stroke();
}
//绘制桃树
const drawtree = function () {

}

function random(arr) {
    let [max, min] = [...arr];
    return Math.floor(Math.random() * Math.abs((max - min))) + min;
}
module.exports = {
    flower,
    drawtree
}