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

function hitbox() {



}

function oldwall() {
    for (let p = 0; p < length; p++) {
        push()
        for (let m = 0; m < width; m++) {
            fill("grey");
            push();
            translate(-50 + p * 100, -25, m * 100);
            box(5, 50, 100);
            pop();
        }
        pop()
        for (let i = 0; i < length; i++) {
            fill("grey");
            push();
            translate(i * 100, -25, -50 + p * 100);
            rotateY(90);
            box(5, 50, 100);
            pop();
        }
        push();
        translate(-50 + length * 100, -25, -50 + length * 50);
        box(5, 50, length * 100);
        pop();
        push();
        translate(-50 + width * 50, -25, -50 + width * 100);
        rotateY(90);
        box(5, 50, width * 100);
        pop();
    }
}

function movePlayer() {

    if (keyIsDown(LEFT_ARROW)) {
        position.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        position.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        position.z -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        position.z += 5;
    }
}
function movePlayer2(t, dt) {
    if (keyIsDown(LEFT_ARROW)) {
        velocity.x -= 5;
    }

    //If right arrow is pressed then the velocity goes up to the right or possitive x 
    if (keyIsDown(RIGHT_ARROW)) {
        velocity.x += 5;
    }

    // if the up arrrow is pressed then the z velocity goes down
    if (keyIsDown(UP_ARROW)) {
        velocity.z -= 5;
    }

    // z velocity goes up when down arrow is pressed
    if (keyIsDown(DOWN_ARROW)) {
        velocity.z += 5;
    }

    // if space bar is pressed and y position is zero then you can jump 
    if (keyIsDown(32) && position.y == 0) {
        velocity.y = 5;
    }

    //calculate position and stuff
    position = position.plus(velocity.times(dt));
    velocity = velocity.plus(gravity.times(dt));

    //if  your on the ground then your speed of movement is velocity x time 0.95
    if (position.y == 0) {
        velocity.x = velocity.x * .95;
        velocity.z = velocity.z * .95;
    }

    // if position y is greater than zero then your y movement is stalled and you cant gain more than what the jump gives you as y velocity 
    if (position.y > 0) {
        position.y = 0;
        velocity.y = 0;
    }

    //moves and creates the sphere
    push();
    fill(0, 0, 0);
    scale(1, 0, 1);
    translate(position.x, 0, position.z);
    sphere(.3);
    pop();

    // starting the position for the floating part
    push();
    fill(255, 64, 64);
    translate(0, -.4, 0);
    if (position.y == 0) {
        //makes the ball move up and down
        translate(0, - Math.sin(3 * t) * .05, 0);
    }
    translate(position.x, position.y, position.z);
    sphere(.3);
    pop();




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
        //Z-
        if (localZ < -60) {
            position.z = position.z + 5;
            velocity = vector(0, 0, 0);
        }
    }
    if (southWall == true) {
        //Z+
        if (localZ > 60) {
            position.z = position.z - 5;
            velocity = vector(0, 0, 0);

        }

    }
    if (southWallblank == true) {
        //Z+
        if (localZ > 60) {
            position.z = position.z - 5;
            velocity = vector(0, 0, 0);

        }

    }
    if (eastWall == true) {
        //Z+
        if (localX > 60) {
            position.x = position.x - 5;
            velocity = vector(0, 0, 0);

        }

    }
    if (westWall == true) {
        //Z+
        if (localX < -60) {
            position.x = position.x + 5;
            velocity = vector(0, 0, 0);

        }

    }
    if (eastWallblank == true) {
        //Z+
        if (localX > 60) {
            position.x = position.x - 5;
            velocity = vector(0, 0, 0);

        }

    }
    if (westWallblank == true) {
        //Z+
        if (localX < -60) {
            position.x = position.x + 5;
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

