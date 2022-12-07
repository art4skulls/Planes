

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

function computeNaturalLine(start, end, divizions,nfactor) {
    divizions=[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9];
    let lineLength = start.dist(end);
    let angle = angleOfLine(start,end);
    pa=[];
    pa.push(createVector(start.x,start.y));
    for (let i = 0; i <1 ; i=i+0.001) {
        let dist = lineLength*0.001;
        let xInterval = ( (dist)) * cos(angle);
        let yInterval = ( (dist)) * sin(angle);

        let xWobble=xInterval; xWobble=random(xWobble)-(xWobble/2);
        let yWobble=yInterval; yWobble=random(yWobble)-(yWobble/2);

        start.x=start.x+xInterval+xWobble;
        start.y=start.y+yInterval+yWobble;
        pa.push(createVector(start.x,start.y));
    }
    pa.push(end);
    console.log(pa);
    return pa;
}


//
function computeNaturalLinea(start, end, divizions,nfactor) {
    divizions=20;
    let ox=start;
    let oy=start;
    let lineLength = start.dist(end);
    let bitsPerLine = lineLength / divizions;
    let angle = atan2(end.y - start.y, end.x - start.x);
    let xInterval = bitsPerLine * cos(angle);
    let yInterval = bitsPerLine * sin(angle);

    for (let i = 1; i < divizions-1 ; i++) {
        let offset=random(1)
        let xOffset = offset * cos(angle - PI / 2);
        let yOffset = offset * sin(angle - PI / 2);
        let x = start.x + xInterval * i;
        let y = start.y + yInterval * i;

        let xn = start.x + (xInterval * (i-1)) + random(xInterval);
        let yn = start.y + (yInterval * (i-1)) + random(yInterval);
        strokeWeight(random(2));
        stroke(random(255),random(255),random(255),random(255));
        line (ox,oy,x,y);
        ox=xn;
        oy=yn;
    }

}

function computeNaturalLineaa(start, end, divizions,nfactor) {
    if (!nfactor) nfactor = 0.1;
    nfactor=1.9;
    let lineLength = start.dist(end);
    let bitsPerLine = lineLength / divizions;
    let pa=[];

    console.log(start.x+","+start.y+" - "+end.x+","+end.y);
    // We need to know the angle of the line so that we can determine the x
    // and y position for each point along the line, and when we offset based
    // on noise we do so perpendicular to the line.
    let angle = atan2(end.y - start.y, end.x - start.x);
    console.log(" >>>> "+angle);
    let xInterval = bitsPerLine * cos(angle);
    let yInterval = bitsPerLine * sin(angle);
    let x = start.x ;
    let y = start.y;

    for (let i = 1; i < divizions-1 ; i++) {

        // calculate the offset distance using noise
        let offset = noise(i) * nfactor;
        //console.log("off:"+offset)

        // Translate offset into x and y components based on angle - 90°
        // (or in this case, PI / 2 radians, which is equivalent)
        let xOffset = offset * cos(angle - PI / 2);
        let yOffset = offset * sin(angle - PI / 2);
        // xOffset=(0-(xOffset/2))+(xOffset/2);
        // yOffset=(0-(yOffset/2))+(yOffset/2);
        // x=x+xOffset; y=y+yOffset;
        push();
        // stroke("green");
        fill("green");
        // stroke(random(255),random(255),random(255));
        //console.log("X: "+(x + xOffset));
        // line (ox,oy,x,y);
        // ellipse(x + xOffset, y + yOffset,0.5+random(1));

        // draw a line to N x
        i=i+int(random(10));
        let ox=x+xOffset;let oy=y+yOffset;
        x = start.x + xInterval * i;
        y = start.y + yInterval * i;
        offset = noise(i) * nfactor;
        xOffset = offset * cos(angle - PI / 2);
        yOffset = offset * sin(angle - PI / 2);
        line(ox,oy,x,y);
        // ellipse(20,20,20);
        // ellipse(x,y);
        pop();
        ox=x;
        oy=y;
    }

    return pa;
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
