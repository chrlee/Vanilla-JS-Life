class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas();
        this.buffer = this.canvasImageData();
    }
    createCanvas() {
        const canvas = document.createElement('canvas');
        const scale = window.devicePixelRatio;
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.setAttribute('color', 'black');
        canvas.ctx = canvas.getContext("2d");
        canvas.ctx.scale(scale, scale);
        canvas.ctx.imageSmoothingEnabled = false;
        return canvas;
    }
    canvasContext() {
        return this.canvas.getContext('2d');
    }
    canvasImageData() {
        return this.canvasContext().getImageData(0, 0, this.width, this.height);
    }
    setPixel(x, y, r, g, b, a) {
        const index = 4 * (x + y * this.width);
        this.buffer.data[index] = r;
        this.buffer.data[index + 1] = g;
        this.buffer.data[index + 2] = b;
        this.buffer.data[index + 3] = a;
    }
    randomizePixels(){
        for(let i = 0; i < this.width; ++i){
            for(let j = 0; j < this.height; ++j) {
                this.setPixel(i, j, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
            }
        }
    }
    updateCanvas() {
        this.canvasContext().putImageData(this.buffer, 0, 0);
    }
};

class Life extends Canvas {
    constructor(width, height){
        super(width, height);
        this.paused = true;

        window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;
        document.addEventListener('keydown', () => {
            console.log(this.paused);
            this.paused = !this.paused;
        })
        const start = this.startAnimation();
    }
    startAnimation() {
        const animate = this.startAnimation.bind(this);
        if(!this.paused){
            this.randomizePixels();
            this.updateCanvas();
        }

        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 1000);
    }

}

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;

const canvas = new Life(GRID_WIDTH, GRID_HEIGHT);
document.body.append(canvas.canvas);
canvas.randomizePixels();
canvas.updateCanvas();
console.log(canvas.canvasImageData());
