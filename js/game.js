let rightPosition = 0;
let imgBlockPosition = 0;
let direction = "right";
let hit = false;
let jump = false;
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;

let jumpBlock = window.document.querySelector("#jumpBlock");
let hitBlock = window.document.querySelector("#hitBlock");
let heroImg = window.document.querySelector("#heroImg");
let imgBlock = window.document.querySelector("#imgBlock");
let canvas = window.document.querySelector("#canvas");
let fsBtn = window.document.querySelector("#fsBtn");

jumpBlock.style.top = `${
    document.documentElement.clientHeight / 2 - 144 / 2
}px`;
hitBlock.style.top = `${document.documentElement.clientHeight / 2 - 144 / 2}px`;

// jumpBlock.style.top = `${window.screen.height / 2 - 140 * 3}px`;
// hitBlock.style.top = `${window.screen.height / 2 - 140 * 3}px`;

heroImg.onclick = (event) => {
    event.preventDefault();
};
fsBtn.onclick = () => {
    if (window.document.fullscreen) {
        fsBtn.src = "./img/fullscreen.png";
        window.document.exitFullscreen();
    } else {
        fsBtn.src = "./img/cancel.png";
        canvas.requestFullscreen();
    }
};
jumpBlock.onclick = () => {
    jump = true;
};
hitBlock.onclick = () => {
    hit = true;
};

//ФУНКЦИИ
const rightHandler = () => {
    heroImg.style.transform = "scale(-1,1)";
    rightPosition = rightPosition + 1;
    imgBlockPosition = imgBlockPosition + 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = "-192px";
    imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const leftHandler = () => {
    heroImg.style.transform = "scale(1,1)";
    rightPosition = rightPosition + 1;
    imgBlockPosition = imgBlockPosition - 1;
    if (rightPosition > 5) {
        rightPosition = 0;
    }
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = "-192px";
    imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const standHandler = () => {
    heroImg.style.transform = "scale(-1,1)";
    switch (direction) {
        case "right":
            heroImg.style.transform = "scale(-1,1)";
            if (rightPosition > 4) {
                rightPosition = 1;
            }
            break;
        case "left":
            heroImg.style.transform = "scale(1,1)";
            if (rightPosition > 3) {
                rightPosition = 0;
            }
            break;
        default:
            break;
    }

    rightPosition = rightPosition + 1;
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = "0px";
};

const hitHandler = () => {
    heroImg.style.transform = "scale(-1,1)";
    switch (direction) {
        case "right":
            heroImg.style.transform = "scale(-1,1)";
            if (rightPosition > 4) {
                rightPosition = 1;
                hit = false;
            }
            break;
        case "left":
            heroImg.style.transform = "scale(1,1)";
            if (rightPosition > 3) {
                rightPosition = 0;
                hit = false;
            }
            break;
        default:
            break;
    }

    rightPosition = rightPosition + 1;
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = "-288px";
};

const jumpHandler = () => {
    heroImg.style.transform = "scale(-1,1)";
    switch (direction) {
        case "right":
            heroImg.style.transform = "scale(-1,1)";
            if (rightPosition > 4) {
                rightPosition = 1;
                jump = false;
            }
            break;
        case "left":
            heroImg.style.transform = "scale(1,1)";
            if (rightPosition > 3) {
                rightPosition = 0;
                jump = false;
            }
            break;
        default:
            break;
    }

    rightPosition = rightPosition + 1;
    heroImg.style.left = `-${rightPosition * 96}px`;
    heroImg.style.top = "-96px";
};

//ОБРАБОТЧИКИ СОБЫТИЙ
let onTouchStart = (event) => {
    clearInterval(timer);
    x =
        event.type === "mousedown"
            ? (x = event.screenX)
            : (x = event.touches[0].screenX);

    timer = setInterval(() => {
        if (x > halfWidth) {
            direction = "right";
            rightHandler();
        } else {
            direction = "left";
            leftHandler();
        }
    }, 130);
};
let onTouchEnd = (event) => {
    clearInterval(timer);
    lifeCycle();
};

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;

const lifeCycle = () => {
    timer = setInterval(() => {
        if (hit) {
            hitHandler();
        } else if (jump) {
            jumpHandler();
        } else {
            standHandler();
        }
    }, 200);
};

const addTiles = (i) => {
    let tile = window.document.createElement("img");
    let tileBlack = window.document.createElement("img");
    tile.src = "./Assets/1 Tiles/Tile_01.png";
    tileBlack.src = "./Assets/1 Tiles/Tile_04.png";
    tile.style.position = "absolute";
    tile.style.left = i * 32 + "px";
    tile.style.bottom = "32px";
    tileBlack.style.position = "absolute";
    tileBlack.style.left = i * 32 + "px";
    tileBlack.style.bottom = 0;
    canvas.appendChild(tile);
    canvas.appendChild(tileBlack);
};

const start = () => {
    lifeCycle();
    for (let i = 0; i < document.documentElement.scrollWidth / 32; i++) {
        addTiles(i);
    }
};
start();
