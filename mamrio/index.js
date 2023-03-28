const canvas = document.querySelector('canvas');
// console.log(canvas);

const ctx = canvas.getContext('2d');
// console.log(ctx)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y:100
        }

        this.width = 100;
        this.height = 100;
    }

    draw() {
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
}


const player = new Player();
player.draw();