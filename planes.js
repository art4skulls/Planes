// planes.js  7-12-2022  v0.3
// Just a little experiment in colour blending
// by @dr_lee_nft (art4skulls)
// Licence: CC-BY-SA

let scale;
let C;
let seed=Date.now();
let errorValue=0;
let reflectionPos=0.6;
let selection=0;
let structures=[];

function pallets() {
    let struct= {
        "name" : "Hillside",
        "pallet":
            [
                color(168, 176, 79),
                color(108, 122, 67),
                color(65, 81, 39),
                color(193, 184, 141),
                color(43, 36, 16),
                color(108, 122, 67),
                color(79,146,220),
                color(200,200,220),
                color(99,166,240),
            ],
        "ratio": [0, 0.15, 0.35, 0.6, 0.75, 0.8, 0.9,0.91,0.92],
        "effect": "grid",
        "accent" : color(225,201,126),
        "rotate" : false
    };
    structures.push(struct);

    struct= {
        "name" : "Ice",
        "pallet":
            [
                color(227, 242, 253),
                color(255, 255, 255),
                color(200, 200,210),
                color(255, 255, 255),
                color(230, 240, 251),
                color(5, 5, 5),
                color(0, 119, 182),
                color(21, 101, 192),
                color(13, 71, 161, 1)
            ],
        "ratio": [0, 0.18, 0.34, 0.46, 0.55, 0.6, 0.75, 0.82, 0.9],
        "effect": "blizzard",
        "accent": color(168, 218, 220),
        "rotate" : true
    };
    structures.push(struct);

    struct= {
        "name":"Vacation",
        "pallet":
            [
                color(255, 212, 96),
                color(255, 252, 193),
                color(13, 247, 219),
                color(35, 176, 189),
                color(237, 113, 123),
                color(232, 154, 116),
                color(207.163, 138)
            ],
        "ratio": [0, 0.25, 0.45, 0.6, 0.74, 0.83, 0.95],
        "effect": "reflect",
        "accent": color(200,200,200),
        "rotate" : true
    };
    structures.push(struct);

    struct= {
        "name": "Abyss",
        "pallet":
            [
                color(3, 7, 30),
                color(55, 6, 23),
                color(106, 4, 15),
                color(157, 2, 8),
                color(208, 0, 0),
                color(157, 2, 8),
                color(106, 4, 15),
                color(55, 6, 23),
                color(3, 7, 30)
            ],
        "ratio": [0, 0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
        "effect": "monobloc",
        "accent": color(155,0,0),
        "rotate" : true
    };
    structures.push(struct);

    struct= {
        "name": "Volcanic",
        "pallet":
            [
                color(228,92,34),
                color(218,82,24),
                color(241,52,10),
                color(241,22,8),
                color(198,101,43),
                color(240,127,40),
                color(200,103,47),
                color(240,191,140),
                color(246,237,222)
            ],
        "ratio": [0,0.45,0.5,0.52,0.6,0.65,0.7,0.8,0.85],
        "effect": "pix",
        "accent": color(228,92,34),
        "rotate" : true
    };
    structures.push(struct);
}

function setup() {
    pallets();
    selection=parseInt(prompt("Enter Pallet [0-"+(structures.length-1)+"]","0"));
    if (!selection && selection !=0) selection =  floor(random(0, structures.length));
    let forceSeed=parseInt(prompt("Enter Seed (enter for random)","0"));
    if (forceSeed) {
        seed=forceSeed;
    }

    pixelDensity(2);
    console.log("Seed: "+seed);
    console.log("Pallet: "+selection);

    reseed(seed);
    errorValue=0.9+random(0.04);
    reseed(seed);
    let canvasSize=800;
    C = createCanvas(canvasSize, canvasSize);
    scale=C.width/600;
    C.parent("canvas");
    setCanvas(C);

    setAppName("Planes~"+structures[selection].name+"_"+selection+"-"+seed);


}





function draw() {
    background(color("white"));
    stroke(0,0,0);
    let y=true;
    let step = scale;
    background("black");


    reseed(seed);

    let chunker = 0.5;
    let palPos=0; // The color we're starting with
    let pallets=structures[selection].pallet;
    let palletDiff=structures[selection].ratio;
    for (let i=0; i<height; i=i+chunker) {
        // Get the percent along we are
        let perc = i/height;

        if (palPos<palletDiff.length-1 && perc>palletDiff[palPos+1] ) {
            palPos++;
        }
        let colorP=pallets[palPos];
        let palPosA=palPos==palletDiff.length-1 ? palPos : palPos+1;
        let colorA=pallets[palPosA];

        let percentStart=palletDiff[palPos];
        let percentEnd=palPos==palletDiff.length-1 ? percentStart :palletDiff[palPos+1];
        let percSpan=map(perc,percentStart,percentEnd,0,1,true);


        let brightness=1.01;
        let red_ =(red(colorP)+ ((red(colorA)-red(colorP))*percSpan))*brightness;
        let green_ =(green(colorP)+ ((green(colorA)-green(colorP))*percSpan))*brightness;
        let blue_ =(blue(colorP)+ ((blue(colorA)-blue(colorP))*percSpan))*brightness;
        push();
        strokeWeight(random(2));
        colx= color(red_,green_,blue_,255);
        stroke(colx);
        noFill();
        for (let ii=0; ii < random(5); ii++) {
            if (structures[selection].rotate) {rotate(random(-PI/100)); }
            ellipse(random(width),height-i,width,random(45));
        }

        push();
        if (random(1)>errorValue) {
            strokeWeight(random(2));
            colx= color(220+random(35));
            stroke(colx);
            noFill();
            for (let ii=0; ii < random(5); ii++) {
                rotate(random(-PI/100));

                colx= brightnessAdj(structures[selection].accent,1+(random(1)-0.5));
                stroke(colx);

                ellipse(random(width),height-i,random(width),random(45));
            }
        }
        pop();

        push();
        colx= color(200,200,200,random(41));
        rotate(random(3));
        stroke(colx);

        pop();
        pop();
    }

    // Effect
    reseed(seed);
    eval("effect_"+structures[selection].effect)();

    noLoop();

}

function effect_pix() {
    pixelate();
}

function effect_monobloc() {
    push();
    drawingContext.filter = 'blur(5px)';
    stroke(0);
    fill(0);
    strokeWeight(10);
    rect(width*0.47,height*0.4,width*0.06,height*0.14);
    drawingContext.filter = 'none';
    pop();

    // stroke(255);
    // line(0,height/2,width,height/2);
    // line(width/2,0,width/2,height);
}


function effect_grid() {
    push();
    stroke(0);
    strokeWeight(3);
    line(0,height/3,width,height/3);
    line(0,2*height/3,width,2*height/3);
    line(width/3,0,width/3,height);
    line(2*width/3,0,2*width/3,height);
    pop();
}

function effect_blizzard() {
    push();
    drawingContext.filter = 'blur(2px)';
    for (let u=0; u<400+random(300); u++) {
        strokeWeight(random(0.5));
        stroke(200,200,200,100+random(155));
        ellipse(random(width),random(height),random(4));
    }
    drawingContext.filter = 'none';
    pop();
}

function effect_reflect() {
    push();
    drawingContext.filter = 'blur(5px)';
    noStroke();
    // draw things you want to be blurred
    let xxx=random(width);
    let yyy=random(height);
    let nMax=80+random(30);
    let w2=width/2;
    let h2=height/2;
    for (let nn=0; nn<nMax; nn++) {
        let u = 200+random(55);
        colx= color(u,u,u,200);
        // strokeWeight(random(2));
        fill(colx);
        // stroke(colx);
        // noStroke();
        let dist=random(1);
        let dir=random(1)>0.5 ? 1 :-1;
        dist=dist*dir;
        colx.setAlpha(200*dist*random(4));
        fill(colx);
        circle(random(width),(height-height*reflectionPos)+((dir*random(300)-150)),8+random(50));
    }
    drawingContext.filter = 'none';
    pop();

}


function pixelate() {
    let gx=50;
    let prx=10000;
    let gg=true;
    var glitch=int(random(-gx,gx));
    loadPixels();

    for (let i = 0; i < prx; i++) {
        var x = int(random(width));
        var y = int(random(height));
        var b = getPixel(x, y, pixels);

        var h=  dist(0,0,0,hue(b),saturation(b),lightness(b));
        var ny = int((h/400)*height);
        var nx = int(random(width));

        nx=nx+glitch;
        ny=ny+glitch;
        setPixel(nx, ny, b, pixels);
        setPixel(ny, nx, b, pixels);
    }
    updatePixels();

}
