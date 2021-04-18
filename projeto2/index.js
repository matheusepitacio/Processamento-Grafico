//ALUNO: MATHEUS EPITÁCIO BARROS DE LUCENA

let drawPolygons = true;
let drawPoints = true;
let drawCurve = true;

NumberOfAvaliations = 100;

$("#number-of-avaliations").on("input", function () {
    NumberOfAvaliations = $(this).val();
});


$(function () {
    $('#polygons').change(function () {
        drawPolygons = !drawPolygons;
    });
});

$(function () {
    $('#points').change(function () {
        drawPoints = !drawPoints;
    });
});

$(function () {
    $('#curves').change(function () {
        drawCurve = !drawCurve;
    });
});


let sketch = function (p) {

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Bezier {
        constructor(index) {
            this.points = [];
            this.index = index;
        }

        isSamePoint(x, y) {
            let dX = Math.abs(x - this.points[this.points.length - 1].x);
                let dY = Math.abs(y - this.points[this.points.length - 1].y);
                if (dX <= 10 && dY <= 10) {
                    return true;
            }
            return false;
        }


        drawPoints() {
            if (drawPoints) {
                for (let i in this.points) {
                    p.strokeWeight(5);
                    if (this.index == currentIndex) {
                        p.stroke("red");
                    } else {
                        p.stroke("gray");
                    }
                    p.point(this.points[i].x, this.points[i].y)
                }
            }
        }

        deCasteljau(t) {
            let points = new Map();
            points.set(0, this.points);
            for (let i = 0; i < this.points.length - 1; i++) {
                let p1 = [];
                for (let j = 0; j < points.get(i).length - 1; j++) {
                    let x = (1 - t) * points.get(i)[j].x + t * points.get(i)[j + 1].x;
                    let y = (1 - t) * points.get(i)[j].y + t * points.get(i)[j + 1].y;
                    p1.push(new Point(x, y));
                }
                points.set(i + 1, p1);
            }
            return points.get(this.points.length - 1)[0];
        }

        drawCurve() {
            if (drawCurve && NumberOfAvaliations > 0) {
                p.strokeWeight(2);
                if (this.index == currentIndex) {
                    p.stroke("black");
                } else {
                    p.stroke("gray");
                }
                if (this.points.length > 1) {
                    let lastPoint = this.points[0];
                    for (let t = 0; t <= 1; t += 1 / NumberOfAvaliations) {
                        let point = this.deCasteljau(t);
                        this.drawLine(lastPoint, point);
                        lastPoint = point;
                    }
                    this.drawLine(lastPoint, this.points[this.points.length - 1]);
                }
            }
        }

        drawLine(a, b) {
            p.line(a.x, a.y, b.x, b.y);
        }

        drawPolygons() {
            if (this.points.length > 1 && drawPolygons) {

                for (let i = 0; i < this.points.length - 1; i++) {
                    p.strokeWeight(2);
                    if (this.index == currentIndex) {
                        p.stroke("blue");
                    } else {
                        p.stroke("gray");
                    }
                    this.drawLine(this.points[i], this.points[i + 1]);
                }
            }
        }

        getPoint(x, y) {
            for (i in this.points) {
                let dX = Math.abs(x - this.points[i].x);
                let dY = Math.abs(y - this.points[i].y);
                if (dX <= 10 && dY <= 10) {
                    return i;
                }
            }
            return -1;
        }

    }

    let curves = [];
    let currentIndex = -1;

    $('#new-curve').click(function () {
        curves.push(new Bezier(curves.length));
        currentIndex = curves.length - 1;
        $("#choose-curve").empty();
        for (i in curves) {
            $("#choose-curve").append(`<option value="${curves[i].index}">${curves[i].index}</option>`);
        }
        $("#choose-curve").val(`${currentIndex}`);
        $("#command").val(`0`);
        command = 0;
    });

    $('#delete-curve').click(function () {
        curves.splice(currentIndex, 1);
        currentIndex = 0;
        if (curves.length == 0) {
            currentIndex = -1;
        }
        for (i in curves) {
            curves[i].index = i;
        }
        $("#choose-curve").empty();
        for (i in curves) {
            $("#choose-curve").append(`<option value="${curves[i].index}">${curves[i].index}</option>`);
        }
        $("#choose-curve").val(`${currentIndex}`);
    })

    $("#choose-curve").change(function () {
        currentIndex = $("#choose-curve").val();
    })

    let command = 0;

    $("#command").change(function () {
        command = $("#command").val();
    })


    p.setup = function () {
        p.createCanvas(screen.width, screen.height - 5);
        p.background(203);
        p.frameRate(60);
    }

    p.draw = function () {
        p.background(203);
        p.strokeWeight(3);

        if (p.mouseX >= 0 && p.mouseY >= 0) {
            if (command == 0) { //adicionar ponto
                if (p.mouseIsPressed && currentIndex >= 0) {
                    console.log(p.mouseX, p.mouseY)
                    if (curves[currentIndex].points.length > 0 && !curves[currentIndex].isSamePoint(p.mouseX, p.mouseY)) {
                        curves[currentIndex].points.push(new Point(p.mouseX, p.mouseY));
                    } else if (curves[currentIndex].points.length == 0) {
                        curves[currentIndex].points.push(new Point(p.mouseX, p.mouseY));
                    }

                }
            } else if (command == 1) { //mover ponto
                if (p.mouseIsPressed) {
                    i = curves[currentIndex].getPoint(p.mouseX, p.mouseY);
                    if (i != -1) {
                        curves[currentIndex].points[i] = new Point(p.mouseX, p.mouseY);
                    }

                }
            } else { //remover ponto
                if (p.mouseIsPressed) {
                    i = curves[currentIndex].getPoint(p.mouseX, p.mouseY);
                    if (i != -1) {
                        curves[currentIndex].points.splice(i, 1);
                    }
                }
            }

        }

        for (i in curves) {
            curves[i].drawPoints();
            curves[i].drawPolygons();
            curves[i].drawCurve();
        }
    }
};

new p5(sketch, window.document.getElementById('container-canvas'));
