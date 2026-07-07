import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

// Variables 
const length = 6
const width = 6
let Movement = vector(0, -0.2, 0);
let grid = [
    [2, 1, 1, 1, 1, 3],
    [0, 1, 6, 2, 5, 3],
    [2, 0, 0, 0, 1, 3],
    [0, 5, 2, 1, 0, 3],
    [0, 1, 5, 0, 0, 3],
    [4, 4, 4, 4, 4, 7],

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
    movement();
    //  floor();
    wall();


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
            
            }
            pop();
        }



    }

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
function movement() {
    let x = 0;
    let y = -.2;
    let z = 0;
    {

        if (keyIsDown(LEFT_ARROW)) {
            Movement.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            Movement.x += 5;
        }
        if (keyIsDown(UP_ARROW)) {
            Movement.z -= 5;
        }
        if (keyIsDown(DOWN_ARROW)) {
            Movement.z += 5;
        }
        push();
        fill(255, 64, 255);
        translate(Movement.x, y, Movement.z);
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

        pop();
        scale(1.5, 1.5, 1.5);

    }
}
