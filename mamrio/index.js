import platform from './Assets/platform.png'


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const GRAVITY = 0.1;
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100,
        };

        this.velocity = {
            x: 0,
            y: 0,
        };
        this.width = 40;
        this.height = 40;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.draw();

        if (this.position.y + this.velocity.y + this.height <= canvas.height)
            this.velocity.y += GRAVITY;
        else this.velocity.y = 0;
    }
}

class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y,
        };

        this.width = 200;
        this.height = 20;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();
const platforms = [
    new Platform({
        x: 100,
        y: 200
    }),
    new Platform({
        x: 400,
        y: 400
    })];

const keys = {
    right: {
        pressed: false,
    },

    left: {
        pressed: false,
    },
};

let scrollOffset = 0;

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platforms.forEach((platform) => {
        platform.draw();
    });

    if (keys.right.pressed && player.position.x < 400)
        player.velocity.x = 2;

    else if (keys.left.pressed && player.position.x >= 100)
        player.velocity.x = -2;

    else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
            scrollOffset += 2;
            platforms.forEach((platform) => {
                platform.position.x -= 2;
            });
        }

        else if (keys.left.pressed) {
            scrollOffset -= 2;
            platforms.forEach((platform) => {
                platform.position.x += 2;
            });
        }
    }

    console.log(scrollOffset);

    platforms.forEach((platform) => {
        if (
            (player.position.y + player.height <= platform.position.y) &&
            (player.position.y + player.height + player.velocity.y >= platform.position.y) &&
            (player.position.x + player.width >= platform.position.x) &&
            (player.position.x <= platform.position.x + platform.width)
        ) {
            player.velocity.y = 0;
        }  
    });

}

animate();

window.addEventListener("keydown", ({ key }) => {
    console.log(key);
    switch (key) {
        case "a":
        case "A":
            keys.left.pressed = true;
            console.log("move left");
            break;

        case "d":
        case "D":
            keys.right.pressed = true;
            console.log("move right");
            break;

        case "w":
        case "W":
            player.velocity.y -= 5;
            console.log("Jump");
            break;
    }
});

window.addEventListener("keyup", ({ key }) => {
    console.log(key);
    switch (key) {
        case "a":
        case "A":
            keys.left.pressed = false;
            console.log("move left");
            break;

        case "d":
        case "D":
            keys.right.pressed = false;
            console.log("move right");
            break;

        case "w":
        case "W":
            console.log("down");
            break;
    }
});
