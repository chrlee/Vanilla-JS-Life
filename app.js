class Canvas {
    constructor(width, height, pixelSize) {
        this.width = width;
        this.height = height;
        this.pixelSize = pixelSize;
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
    updateCanvas() {
        this.canvasContext().putImageData(this.buffer, 0, 0);
    }
};

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;

const canvas = new Canvas(GRID_WIDTH, GRID_HEIGHT, 16);
document.body.append(canvas.canvas);

for(let i = 0; i < GRID_WIDTH; ++i){
    for(let j = 0; j < GRID_HEIGHT; ++j) {
        canvas.setPixel(i, j, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
    }
}

console.log(canvas.canvasImageData());

canvas.updateCanvas();