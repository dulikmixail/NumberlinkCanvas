var body = document.getElementById("body");
var html = document.getElementById("html");
var height;
var width;
var isMouseDown;
var loadedLevel;
var loadedCells;
var selectedCell;
var selectedCells;
var cellSpacing;
var whField;
var whBox;
var whCell;
var wStepLine;

body.style.overflow = "hidden";


if (screen.width < screen.height) {
    //вертикальная ориентация (смартфоны, планшеты)
    height = screen.width * 16 / 9;
    width = screen.width;
} else {
    //гозизонтальная ориентация (PC)
    height = screen.height;
    width = screen.height * 9 / 16
}

function Level(size, points) {
    this.size = size;
    this.points = points;
}

function Point(key1, key2, value, color) {
    this.key1 = key1 - 1;
    this.key2 = key2 - 1;
    this.value = value;
    this.color = color !== undefined ? color : false;
}

function Cell() {
    this.x = 0;
    this.y = 0;
    this.xCenter = 0;
    this.yCenter = 0;
    this.size = 1;
    this.color = false;
    this.index = 0;
    this.point = false;
    this.center = function () {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2
        };
    }
}


var lvl1 = new Level(
    5,
    [
        new Point(6, 9, 1, "rgb(230, 129, 151)"),
        new Point(5, 8, 2, "rgb(201, 230, 129)"),
        new Point(1, 14, 3, "rgb(157, 129, 230)"),
        new Point(21, 25, 4, "rgb(129, 230, 207)")
    ]
);

var lvl2 = new Level(
    5,
    [
        new Point(2, 17, 1, "rgb(30, 179, 217)"),
        new Point(4, 25, 2, "rgb(161, 30, 217)"),
        new Point(1, 12, 3, "rgb(217, 68, 30)"),
        new Point(9, 11, 4, "rgb(86, 217, 30)")
    ]
);

var lvl3 = new Level(
    7,
    [
        new Point(3, 36, 1, "rgb(92, 57, 225)"),
        new Point(4, 7, 2, "rgb(190, 225, 57)"),
        new Point(10, 14, 3, "rgb(118, 52, 154)"),
        new Point(9, 25, 4, "rgb(154, 67, 52)"),
        new Point(17, 30, 5, "rgb(52, 139, 154)"),
        new Point(20, 45, 6, "rgb(88, 154, 52)"),
        new Point(27, 43, 7, "rgb(161, 139, 31)")
    ]
);


html.style.width = width + "px";
html.style.height = height + "px";
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

var o100 = createCanv(width, width, (height - width) / 2);

// o3.ctx.fillStyle = "rgb(255,100,100)";
// o3.ctx.fillRect(20, 20, 100, 20);


function factoryField(sizeField) {
    var cells = [];
    cellSpacing = 20 / sizeField;
    whField = o2.canv.width;
    whBox = (whField - cellSpacing) / sizeField;
    whCell = whBox - cellSpacing;
    wStepLine = 0.4 * whBox;
    var i = 0;

    for (var y = cellSpacing; y < (whField - whBox / 2); y += whBox) {
        for (var x = cellSpacing; x < (whField - whBox / 2); x += whBox, i++) {
            var cell = new Cell();
            cell.size = whCell;
            cell.x = x;
            cell.y = y;
            cell.color = "rgb(255,255,180)";
            cell.index = i;
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


function loadLevel(lvl) {
    loadedLevel = lvl;
    var cells = factoryField(lvl.size);
    loadedCells = cells;
    createField(cells);
    loadPoint(cells, lvl.points);
    viewerPoints(cells);
}

function loadPoint(cells, points) {
    for (var i = 0; i < points.length; i++) {
        cells[points[i].key1].point = points[i];
        cells[points[i].key1].color = points[i].color;
        cells[points[i].key2].point = points[i];
        cells[points[i].key2].color = points[i].color;
    }
}

function viewerPoints(cells) {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].point) {
            if (cells[i].color) {
                o2.ctx.fillStyle = cells[i].color;
                o2.ctx.fillRect(cells[i].x, cells[i].y, cells[i].size, cells[i].size);
            }
            o3.ctx.textBaseline = "middle";
            o3.ctx.textAlign = "center";
            o3.ctx.fillStyle = "black";
            o3.ctx.font = cells[i].size * 0.8 + "px serif";
            o3.ctx.fillText(cells[i].point.value, cells[i].center().x, cells[i].center().y)
        }
    }
}

loadLevel(lvl2);


function launchFullScreen(element) {
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
}

var nextGameStep = (function () {
    return requestAnimationFrame ||
        webkitRequestAnimationFrame ||
        mozRequestAnimationFrame ||
        oRequestAnimationFrame ||
        msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        }
})();

function drawRect() {
    o2.ctx.clearRect(0, 0, 50, 50);
    o2.ctx.fillRect(0, 0, 50, 50)
};

// body.onclick = function () {
// //     // launchFullScreen(o1.canv);
// //     launchFullScreen(body);
// // };


function gameEngineStart(callback) {
    gameEngine = callback;
    gameEngineStep();
}

function gameEngineStep() {
    gameEngine();
    nextGameStep(gameEngineStep);
}

function setGameEgine(callback) {
    gameEngine = callback;
}

// gameEngineStart(gameLoopRight);


function clickedCell(e) {
    for (var i = 0; i < loadedCells.length; i++) {
        if (loadedCells[i].point) {
            if (
                loadedCells[i].x < e.offsetX &&
                loadedCells[i].y < e.offsetY &&
                loadedCells[i].x + loadedCells[i].size > e.offsetX &&
                loadedCells[i].y + loadedCells[i].size > e.offsetY
            ) {
                selectedCell = loadedCells[i];
            }
        }

    }
    if (selectedCell) {
        o2.ctx.fillStyle = "red";
        o2.ctx.clearRect(selectedCell.x, selectedCell.y, selectedCell.size, selectedCell.size);
        o2.ctx.fillRect(selectedCell.x, selectedCell.y, selectedCell.size, selectedCell.size);
    }

}

function unClickedCell() {
    o2.ctx.fillStyle = selectedCell.color;
    o2.ctx.clearRect(selectedCell.x, selectedCell.y, selectedCell.size, selectedCell.size);
    o2.ctx.fillRect(selectedCell.x, selectedCell.y, selectedCell.size, selectedCell.size);
    selectedCell = false;
}


function clicked(e) {
    isMouseDown = true;
    clickedCell(e);
}

function unClicked(e) {
    isMouseDown = false;
    unClickedCell();
}

function baseStep(startCell, xEnd, yEnd) {
    var x = startCell.center().x;
    var y = startCell.center().y;
    o2.ctx.beginPath();
    o2.ctx.moveTo(x, y);
    o2.ctx.lineTo(xEnd, yEnd);
    o2.ctx.lineWidth = wStepLine;
    o2.ctx.stroke();
}

function rightStep(startCell) {
    o2.ctx.fillStyle = "black";
    baseStep(startCell, loadedCells[startCell.index + 1].center().x, loadedCells[startCell.index + 1].center().y);
}

function leftStep(startCell) {
    o2.ctx.fillStyle = "black";
    var x = startCell.center().x;
    var y = startCell.center().y;
    baseStep(startCell, loadedCells[startCell.index - 1].center().x, loadedCells[startCell.index - 1].center().y);
}

rightStep(loadedCells[3]);

leftStep(loadedCells[5]);

// function findCellByMousePozition(x,y){
//
// }


o100.canv.addEventListener("mousedown", clicked);
// o100.canv.addEventListener("touchstart", clicked);

o100.canv.addEventListener("mouseup", unClicked);
// o100.canv.addEventListener("touchend", unClicked);
// o100.canv.addEventListener("mousemove", printMouseLine);
// o100.canv.addEventListener("mousedown", printMouseLine);
//
// o100.ctx.lineWidth = 2;
//
// function printMouseLine(e) {
//     if (isMouseDown) {
//         o100.ctx.lineTo(e.offsetX, e.offsetY);
//         o100.ctx.stroke();
//
//         o100.ctx.beginPath();
//         o100.ctx.arc(e.offsetX, e.offsetY, 1, 0, Math.PI * 2);
//         o100.ctx.fill();
//
//         o100.ctx.beginPath();
//         o100.ctx.moveTo(e.offsetX, e.offsetY);
//     }
//
// }


//
// var gameLoopLeft = function () {
//     drawRect();
//     x -= 1;
//     if (x <= 0) {
//         setGameEgine(gameLoopRight)
//     }
// };
//

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
