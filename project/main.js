import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

// Variables 
const length = 7
const width = 7
let position = vector(0, -0.2, 0);
let velocity = vector(0, 0, 0);
let gravity = vector(0, 9.8, 0);
let grid = [
    [2, 1, 1, 1, 1, 1, 3],
    [0, 1, 1, 2, 5, 0, 3],
    [2, 0, 0, 0, 1, 0, 3],
    [0, 5, 2, 1, 0, 0, 3],
    [0, 1, 5, 0, 2, 5, 3],
    [0, 1, 1, 0, 1, 1, 3],
    [4, 4, 4, 4, 4, 4, 7],

];


export function preload() {

}

export function setup() {
    camera(300, -200, 700);

}

export function draw(t, dt) {
    background(30, 30, 30);
    orbitControl();
    ambientLight(80, 80, 80);

    directionalLight(255, 255, 255, 1, 1, -1);

    drawGrid();
    drawAxes();

    stroke(0);
    strokeWeight(1);
    movePlayer2(t, dt);
    drawPlayer();
    //  floor();
    wall();
    push();
    translate(455, -10, 475);
    end();
    pop();


}
function floor() {
    push();
    fill('black');
    translate(-50 + width * 50, 0, -50 + length * 50);
    box(width * 100, 3, length * 100);
    pop();
}
function wall() {
    for (let x = 0; x < length; x++) {
        for (let z = 0; z < width; z++) {
            push();
            translate(x * 100, 0, z * 100)
            if (grid[z][x] == 0) {
                fill('black');
                box(100, 5, 100);
                translate(-50, -25, 0)
                fill('grey');
                box(5, 50, 100)


            }
            if (grid[z][x] == 1) {
                fill('black');
                box(100, 5, 100);
                translate(0, -25, -50)
                fill('grey');
                box(100, 50, 5)
            }
            if (grid[z][x] == 2) {
                fill('black');
                box(100, 5, 100);
                push();
                translate(-50, -25, 0)
                fill('grey');
                box(5, 50, 100)
                pop();
                translate(0, -25, -50)
                fill('grey');
                box(100, 50, 5);


            }
            if (grid[z][x] == 3) {
                push();
                translate(-50, -25, 0)
                fill('grey');
                box(5, 50, 100)
                pop();

            }
            if (grid[z][x] == 4) {
                push();
                translate(0, -25, -50)
                rotateY(90);
                fill('grey');
                box(5, 50, 100)
                pop();

            }
            if (grid[z][x] == 5) {
                fill('black');
                box(100, 5, 100);
            }
            if (grid[z][x] == 6) {
                fill('black');
                box(100, 5, 100);
                translate(-50, -25, 0)
                rotateY(90);
                fill('grey');
                box(100, 50, 5)
            }

            pop();
        }



    }

}



function movePlayer2(t, dt) {
    if (keyIsDown(LEFT_ARROW)) {
        velocity.x -= 3;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        velocity.x += 3;
    }

    if (keyIsDown(UP_ARROW)) {
        velocity.z -= 3;
    }

    if (keyIsDown(DOWN_ARROW)) {
        velocity.z += 3;
    }

    position = position.plus(velocity.times(dt));
    velocity = velocity.plus(gravity.times(dt));

    if (position.y == 0) {
        velocity.x = velocity.x * .95;
        velocity.z = velocity.z * .95;
    }

    if (position.y > 0) {
        position.y = 0;
        velocity.y = 0;
    }

    push();
    fill(0, 0, 0);
    scale(1, 0, 1);
    translate(position.x, 0, position.z);
    pop();

    fill(255, 64, 64);
    translate(0, -.4, 0);
    if (position.y == 0) {
        translate(0, - Math.sin(3 * t) * .05, 0);
    }
    console.log("position", position.x, position.z);
    let gridX = Math.floor((position.x + 75) / 150);
    let gridZ = Math.floor((position.z + 75) / 150);
    let localX = position.x - gridX * 150;
    let localZ = position.z - gridZ * 150;
    console.log("grid", gridX, gridZ);
    let northWall = grid[gridZ][gridX] == 1 || grid[gridZ][gridX] == 2;
    let southWall = grid[gridZ + 1][gridX] == 1 || grid[gridZ + 1][gridX] == 2;
    let southWallblank = grid[gridZ + 1][gridX] == 4 || grid[gridZ + 1][gridX] == 2;
    let westWall = grid[gridZ][gridX] == 0 || grid[gridZ][gridX] == 2;
    let eastWall = grid[gridZ][gridX + 1] == 0 || grid[gridZ][gridX + 1] == 2;
    let eastWallblank = grid[gridZ][gridX + 1] == 3 || grid[gridZ][gridX + 1] == 2;
    let westWallblank = grid[gridZ][gridX] == 4 || grid[gridZ][gridX] == 2;
    console.log("local", localX, localZ, "north", northWall, "south", southWall, "east", eastWall, "west", westWall);
    if (northWall == true) {
        if (localZ < -60) {
            position.z = position.z + 5;
            velocity = vector(0, 0, 0);
        }
    }
    if (southWall == true) {
        if (localZ > 60) {
            position.z = position.z - 5;
            velocity = vector(0, 0, 0);
        }
    }
    if (southWallblank == true) {
        if (localZ > 60) {
            position.z = position.z - 3;
            velocity = vector(0, 0, 0);
        }
    }
    if (eastWall == true) {
        if (localX > 60) {
            position.x = position.x - 3;
            velocity = vector(0, 0, 0);
        }
    }
    if (westWall == true) {
        if (localX < -60) {
            position.x = position.x + 3;
            velocity = vector(0, 0, 0);
        }
    }
    if (eastWallblank == true) {
        if (localX > 60) {
            position.x = position.x - 3;
            velocity = vector(0, 0, 0);
        }
    }
    if (westWallblank == true) {
        if (localX < -60) {
            position.x = position.x + 3;
            velocity = vector(0, 0, 0);
        }
    }
}
function drawPlayer() {
    push();
    fill('yellow');
    translate(position.x, position.y, position.z);
    push();
    translate(0, -60, 0);
    rotateZ(180);
    fill('green');
    cone(20, 15);
    pop();
    translate(0, -45, 0);
    fill(225, 220, 177);
    sphere(15);
    translate(0, 20, 0);
    cylinder(10, 50);
    pop();
    scale(1.5, 1.5, 1.5);
}
function end() {
    scale(0.4);
    translate(0, 0, 0)
    strokeWeight(4);
    stroke('white');
    line(0, 0, 0, 0, 0, 100);
    line(50, 0, 0, 0, 0, 0);
    line(50, 0, 50, 0, 0, 50);
    line(50, 0, 100, 0, 0, 100);
    line(75, 0, 0, 75, 0, 100);
    line(75, 0, 0, 125, 0, 100);
    line(125, 0, 100, 125, 0, 0);
    line(150, 0, 0, 150, 0, 100);
    line(150, 0, 0, 185, 0, 25);
    line(150, 0, 100, 185, 0, 75);
    line(185, 0, 25, 185, 0, 75);
}

