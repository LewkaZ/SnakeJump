var ctx, cW, cH, y = 0, x = 0, gravity = 15, canvas, ph = 50, ev = 7, bposx = 0, bposy = 0, bposvx = 1, pvx = 0;
var accelerationY = 1; 
var boxes = [];
// Map array test
var mapArray= [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
];

function initCanvas() { 
    ctx = document.getElementById("canvas").getContext("2d");
    window.setInterval(draw, 20);
}
//Objekt att hoppa över
function jumpBox(bposx, bposy, w, h, clr) {
    this.x = bposx;
    this.y = bposy;
    this.w = w;
    this.h = h;
    this.clr = clr;
    this.jbrender = function () {
        ctx.fillStyle = this.clr;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

//Objekt för spelaren
function Player(x, y, w, h, clr) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.clr = clr;
    this.render = function () {
        ctx.fillStyle = this.clr;
        ctx.fillRect(this.x, this.y, this.w, play1.h, this.clr);
    }
}
var play1 = new Player(250, 450, 50, 50, 'blue');

//Tangenbordsevent
function keyHandler(event){
    var key = event.keyCode;
    if (key == 87 && gravity == 15) {
        gravity = -15;
    }
    if (key == 83) {
        play1.h = 25;
    }
    if (key == 82)
    {
        location = location;
    }
    if (key == 68){
        pvx = 7;
    }
    if (key == 65){
        pvx = -7;
    }
    //console.log(key);
}

function keyUp(event){
    var key = event.keyCode;
    if (key == 83) {
        play1.h = 50;
    }
    if (key == 68){
        pvx = 0;
    }
    if (key == 65){
        pvx = 0;
    }
}

//ritfunktion
function draw() {
    cW = ctx.canvas.width;
    cH = ctx.canvas.height;
    ctx.clearRect(0, 0, cW, cH);
    //draw här =)
    //console.log(gravity);
    play1.y += gravity;
    gravity += accelerationY;
    bposx += bposvx;
    if (gravity > 15) {
        gravity = 15
    }
    if (play1.y > cH - play1.h){
        play1.y = cH - play1.h;
    }
    for (var j = 0; j < mapArray.length; j++){

        for (var k = 0; k < mapArray[j].length; k++){

            if(mapArray[j][k]==1){

                boxes = [new jumpBox(50 * k, 50 * j, 50, 50, 'green')];

    if(boxes.length > 0) {
        function box(){
            for(var i = 0; i < boxes.length; i++) {

                bposx += -5;
                boxes[i].jbrender();

                if (boxes[i].x + (boxes[i].w * (boxes.length + 1)) < 0) {
                    boxes.splice(boxes, boxes[i]);
                }

                //collision

                if (play1.x + play1.w > boxes[i].x && play1.x < boxes[i].x + boxes[i].w && play1.y + play1.h > boxes[i].y && play1.y < boxes[i].y){
                    play1.y = (boxes[i].y - play1.h);
                }

                else if (play1.x < boxes[i].x + boxes[i].w  && play1.x + play1.w  > boxes[i].x &&
                         play1.y < boxes[i].y + boxes[i].h && play1.y + play1.h > boxes[i].y) {
                    //alert('död');
                }
            }
            }
        }
    }
}
}
    play1.x += pvx;
    play1.render();
    console.log();
}