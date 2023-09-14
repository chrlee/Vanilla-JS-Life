class Canvas {
    constructor(animate, width, height, fps = 2) {
        this.width = width;
        this.height = height;
        this.fps = fps;
        this.element = this.createCanvas();
        this.buffer = this.canvasImageData();
        this.paused = true;

        window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;
        document.addEventListener('keydown', () => {
            console.log(this.paused);
            this.paused = !this.paused;
        })
        this.startAnimation(animate);
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
        return this.element.getContext('2d');
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
    startAnimation(update) {
        const animate = this.startAnimation.bind(this);
        if(!this.paused){
            update();
        }

        setTimeout(() => {
            requestAnimationFrame(() => animate(update));
        }, 1000 / this.fps);
    }
};

class Life {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.canvas = new Canvas(this.setAllPixels.bind(this), width, height, 30);
        this.gridBuf = [...Array(height)].map(() => Array(width).fill(false));
        this.gridState = this.gridBuf.map((arr) => arr.slice());
        this.visited = this.gridBuf.map((arr) => arr.slice());
        this.centerWeightedSeed();
    }

    colors = {
        black: [17, 17, 17, 255],
        visitedBlack: [50, 50, 50, 255],
        white: [200, 200, 200, 255],
        red: [200, 17, 17, 255],
        green: [17, 200, 17, 255],
        getBlack(visited) {
            return visited ? this.visitedBlack : this.black;
        }
    }
    centerWeightedSeed() {
        const center = [Math.floor(this.width / 2), Math.floor(this.height / 2)];
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                const dCenter = Math.sqrt(Math.pow(center[0] - x, 2) + Math.pow(center[1] - y, 2));
                const live = Math.floor(Math.random() * dCenter) < 2 ;
                this.gridBuf[y][x] = live;
            }
        }
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                const color = this.gridBuf[y][x] ? this.colors.white : this.colors.black;
                this.canvas.setPixel(x, y, ...color);
            }
        }
        this.gridState = this.gridBuf.map((arr) => arr.slice()); 
        this.canvas.updateCanvas(); 
    }
    randomSeed() {
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                const live = Math.floor(Math.random() * 20) < 1 ;
                this.gridBuf[y][x] = live;
            }
        }
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                const color = this.gridBuf[y][x] ? this.colors.white : this.colors.black;
                this.canvas.setPixel(x, y, ...color);
            }
        }
        this.gridState = this.gridBuf.map((arr) => arr.slice()); 
        this.canvas.updateCanvas();
    }
    setSinglePixel(x, y) {
        this.gridBuf[y][x] = true;
        this.gridState[y][x] = true;
        this.canvas.setPixel(x, y, ...this.colors.white);
        this.canvas.updateCanvas();
    }
    setAllPixels() {
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                const live = this.checkPixel(x, y);
                this.gridBuf[y][x] = live[0];
                this.visited[y][x] = this.visited[y][x] || live[0];
                this.canvas.setPixel(x, y, ...live[1]);
            }
        }
        this.gridState = this.gridBuf.map((arr) => arr.slice());
        this.canvas.updateCanvas();
    }
    checkPixel(x, y) {
        const live = this.gridState[y][x];
        const liveNeighbors = this.getValidNeighbors(x, y).reduce((acc, curr) => acc + curr, 0);
        if(liveNeighbors < 2) return [false, live ? this.colors.red : this.colors.getBlack(this.visited[y][x])];
        else if(liveNeighbors == 2 && live) return [true, this.colors.white];
        else if(liveNeighbors === 3) return [true, live ? this.colors.white : this.colors.green];
        return [false, live ? this.colors.red : this.colors.getBlack(this.visited[y][x])];
    }
    getValidNeighbors(x, y) {
        const neighborTranslation = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0], /* pix */ [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ]
        const topEdge = y === 0;
        const bottomEdge = y === this.height - 1;
        const leftEdge = x === 0;
        const rightEdge = x === this.width - 1;

        if(topEdge) {
            neighborTranslation[0] = false;
            neighborTranslation[1] = false;
            neighborTranslation[2] = false;
        }
        if(bottomEdge) {
            neighborTranslation[5] = false;
            neighborTranslation[6] = false;
            neighborTranslation[7] = false;
        }
        if(leftEdge) {
            neighborTranslation[0] = false;
            neighborTranslation[3] = false;
            neighborTranslation[5] = false;
        }
        if(rightEdge) {
            neighborTranslation[2] = false;
            neighborTranslation[4] = false;
            neighborTranslation[7] = false;
        }
        return neighborTranslation.reduce((acc, neighbor) => {
            if(neighbor) acc.push(this.gridState[y + neighbor[1]][x + neighbor[0]]);
            return acc;
        }, [])
    }
}

const GRID_WIDTH = 300;
const GRID_HEIGHT = 300;

const life = new Life(GRID_WIDTH, GRID_HEIGHT);
document.body.append(life.canvas.element);

life.canvas.element.addEventListener('mousedown', event => {
    const bb = life.canvas.element.getBoundingClientRect();
    const x = Math.floor( (event.clientX - bb.left) / bb.width * life.canvas.element.width );
    const y = Math.floor( (event.clientY - bb.top) / bb.height * life.canvas.element.height );
    
    console.log({
        x,
        y,
        live: life.gridState[y][x],
        validNeighbors: life.getValidNeighbors(x, y),
        liveNeighbors: life.getValidNeighbors(x, y).reduce((acc, curr) => acc + curr, 0)
    });

    life.setSinglePixel(x, y);
})
