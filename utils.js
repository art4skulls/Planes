

function reseed(seed) {
    randomSeed(seed);
    noiseSeed(seed);
}


let pa;
let __canvas;
let __appName;

function angleOfLine(start,end) {
    return atan2(end.y - start.y, end.x - start.x);
}

function brightnessAdj(c,v) {
    return color(
        red(c)*v,
        green(c)*v,
        blue(c)*v
    );
}

function setCanvas(canv) {
    _canvas=canv;
}

function setAppName(a) {
    __appName=a;
}


function keyTyped() {
    if (key === 's') {
        saveCanvas( __appName, 'png');
    }
}

function setPixel(x,y,col,p) {
    let d = pixelDensity();
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            index = 4 * ((y * d + j) * width * d + (x * d + i));
            p[index] = red(col);
            p[index+1] = green(col);
            p[index+2] = blue(col);
            p[index+3] = alpha(col);
        }
    }
}

function getPixel(x,y,p) {
    let d = pixelDensity();
    index = 4 * ((y * d ) * width * d + (x * d ));
    return color( p[index] ,p[index+1] , p[index+2],  p[index+3]);
}
