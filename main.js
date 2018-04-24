var body = document.getElementById("body");
var width = 360;
var height = 640;

var x = 10;
var y = 10;

function Level(size, points) {
    this.size = size;
    this.points = points;
}

function Point(key, value) {
    this.key = key - 1;
    this.value = value;
    this.color = false;
}

function Cell() {
    this.x = 0;
    this.y = 0;
    this.xCenter = 0;
    this.yCenter = 0;
    this.size = 1;
    this.color = false;
    this.center = function () {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2
        };
    },
        this.point = false
}


var lvl1 = new Level(
    5,
    [
        new Point(1, 3),
        new Point(5, 2),
        new Point(6, 1),
        new Point(8, 2),
        new Point(9, 1),
        new Point(14, 3),
        new Point(21, 4),
        new Point(25, 4)
    ]
);

var lvl2 = new Level(
    5,
    [
        new Point(1, 3),
        new Point(2, 1),
        new Point(4, 2),
        new Point(9, 4),
        new Point(11, 4),
        new Point(12, 3),
        new Point(17, 1),
        new Point(25, 2)
    ]
);

var lvl3 = new Level(
    7,
    [
        new Point(3, 1),
        new Point(4, 2),
        new Point(7, 2),
        new Point(9, 4),
        new Point(10, 3),
        new Point(14, 3),
        new Point(17, 5),
        new Point(20, 6),
        new Point(25, 4),
        new Point(27, 7),
        new Point(30, 5),
        new Point(36, 1),
        new Point(43, 7),
        new Point(45, 6)
    ]
);

body.style.width = width + "px";
body.style.height = height + "px";

function Canv() {
    this.canv = false;
    this.ctx = false;
}

function createCanv(w, h, top) {
    var myCanv = new Canv();
    var canv = document.createElement("canvas");
    canv.innerHTML = "Your browser is not supported canvas";
    canv.style.position = "absolute";
    canv.width = w;
    canv.height = h;
    canv.style.border = "1px solid red";
    canv.style.top = top + "px";
    body.appendChild(canv);
    var ctx = canv.getContext("2d");
    myCanv.canv = canv;
    myCanv.ctx = ctx;
    return myCanv;
};

var o1 = createCanv(width, height);

o1.ctx.fillStyle = "rgb(255,100,100)";
o1.ctx.fillRect(0, 0, 50, 50);

var o2 = createCanv(width, width, (height - width) / 2);
o2.ctx.fillStyle = "rgb(255,100,100)";
o2.ctx.fillRect(20, 20, 100, 20);

var o3 = createCanv(width, width, (height - width) / 2);
// o3.ctx.fillStyle = "rgb(255,100,100)";
// o3.ctx.fillRect(20, 20, 100, 20);


function factoryField(sizeField) {
    console.log(o2.canv.width);
    var cells = [];
    var cellSpacing = 20 / sizeField;
    var whField = o2.canv.width;
    var whBox = (whField - cellSpacing) / sizeField;
    var whCell = whBox - cellSpacing;
    var i = 0;

    for (var y = cellSpacing; y < (whField - whBox / 2); y += whBox) {
        for (var x = cellSpacing; x < (whField - whBox / 2); x += whBox, i++) {
            var cell = new Cell();
            cell.size = whCell;
            cell.x = x;
            cell.y = y;
            cell.color = "rgb(255,255,180)";
            cells[i] = cell;
        }
    }
    return cells;
}

function createField(cells) {
    o2.ctx.clearRect(0, 0, o2.canv.width, o2.canv.height);
    for (var i = 0; i < cells.length; i++) {
        o2.ctx.fillStyle = cells[i].color;
        o2.ctx.fillRect(cells[i].x, cells[i].y, cells[i].size, cells[i].size)
    }
}

// createField(factoryField(6));

function loadLevel(lvl) {
    var cells = factoryField(lvl.size);
    createField(cells);
    loadPoint(cells, lvl.points);
    viewerPoints(cells);
}

function loadPoint(cells, points) {
    for (var i = 0; i < points.length; i++) {
        cells[points[i].key].point = points[i];
        cells[points[i].key].color = "red";
    }
}

function viewerPoints(cells) {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].point) {
            if (cells[i].color) {
                o2.ctx.fillStyle = cells[i].color;
                o2.ctx.fillRect(cells[i].x,cells[i].y,cells[i].size,cells[i].size);
            }
            o3.ctx.textBaseline = "middle";
            o3.ctx.textAlign = "center";
            o3.ctx.fillStyle = "black";
            o3.ctx.font = cells[i].size * 0.8 + "px serif";
            o3.ctx.fillText(cells[i].point.value, cells[i].center().x, cells[i].center().y)
        }
    }
}

loadLevel(lvl1);


// var gField = {
//     width: canv.width*0.9,
//     height: canv.width*0.9
// };
//
//
//
//

//

//

//
// var drawRect = function () {
//     ctx.clearRect(0, 0, canv.width, canv.height);
//     ctx.fillRect(x, y, 50, 50)
// };
//
// var nextGameStep = (function () {
//     return requestAnimationFrame ||
//         webkitRequestAnimationFrame ||
//         mozRequestAnimationFrame ||
//         oRequestAnimationFrame ||
//         msRequestAnimationFrame ||
//         function (callback) {
//             window.setTimeout(callback, 1000 / 60)
//         }
// })();

var launchFullScreen = function (element) {
    if (element.requestFullScreen) {
        element.requestFullScreen()
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.oRequestFullScreen) {
        element.oRequestFullScreen()
    } else if (element.msRequestFullScreen) {

    } else {
        alert("Для елемента " + element.toString() + " недоступен полноэкранный режим")
    }
};

body.onclick = function () {
    // launchFullScreen(o1.canv);
    launchFullScreen(body);
};


//
// var gameEngineStart = function (callback) {
//     gameEngine = callback;
//     gameEngineStep();
// };
//
// var gameEngineStep = function () {
//     gameEngine();
//     nextGameStep(gameEngineStep);
// };
//
// var setGameEgine = function (callback) {
//     gameEngine = callback;
// };
//
// var gameLoopRight = function () {
//     drawRect();
//     x += 1;
//     if (x >= 250) {
//         setGameEgine(gameLoopLeft);
//     }
// };
//
// var gameLoopLeft = function () {
//     drawRect();
//     x -= 1;
//     if (x <= 0) {
//         setGameEgine(gameLoopRight)
//     }
// };
//
// // gameEngineStart(gameLoopRight);
//
// var loadAudio = function (arr) {
//     var audio = document.createElement("audio");
//     for (var i = 0; i < arr.length; i++) {
//         var source = document.createElement("source");
//         source.src = arr[i];
//         audio.appendChild(source);
//     }
//
//     var o = {
//         dom: false,
//         state: 'stop',
//         play: function () {
//             this.dom.play();
//             this.state = 'play';
//         },
//         pause: function () {
//             this.dom.pause();
//             this.state = 'pause';
//         },
//         stop: function () {
//             this.dom.pause();
//             this.dom.currentTime = 0;
//             this.state = 'stop'
//         }
//     }
//
//     o.dom = audio;
//     return o;
// };
//
// var a1 = loadAudio(["audio/audio1.mp3"]);
// // a1.play();
// setTimeout(function () {
//     a1.stop();
// }, 4000);
