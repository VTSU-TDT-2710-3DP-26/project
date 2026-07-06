import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

// Variables 
const length = 30
const width = 30
let Movement = vector(0, -0.2, 0);

//We can use this to load textures or sounds
export function preload() {

}

//Called once when program loads
export function setup() {
    camera(300, -200, 700);
}

//Called every frame
export function draw(t, dt) {
    background(30, 30, 30); //Clear the background to dark grey 
    orbitControl(); //Enable mouse movement in the scene
    ambientLight(80, 80, 80);  //Add some ambient light to the scene

    directionalLight(255, 255, 255, 1, 1, -1); //Add a white directional light

    drawGrid(); //Draw the grid
    drawAxes(); //Draw the axes

    stroke(0);  //Make the stroke black
    strokeWeight(1); //Make it thin
    movement();
    floor();
    wall();
 



}
function floor() {
    push();
    fill('blue');
    translate(-25 + 30 * 50 / 2, 0, -25 + 30 * 50 / 2);
    box(30 * 50, 3, 30 * 50);
    pop();
}
function wall() {
    for (let p = 0; p < length; p++) {
        //translate(0, 0, p + 50);
        push()
        for (let m = 0; m < width; m++) {
            fill("red");
            push();
            translate(-25 + p * 50, -25, m * 50);
            box(5, 50, 50);
            pop();
            //if (m == width) {
            ///   p = p + 1;
            //}
        }
        pop()
        for (let i = 0; i < length; i++) {
            fill("green");
            push();
            translate(i * 50, -25, -25 + p * 50);
            rotateY(90);
            box(5, 50, 50);
            pop();
        }
        push();
        translate(-25 + 30 * 50, -25, -25 + 30 * 25);
        box(5, 50, 30 * 50);
        pop();
        push();
        translate(-25 + 30 * 25, -25, -25 + 30 * 50);
        rotateY(90);
        box(5, 50, 30 * 50);
        pop();

        p = p + 1;


    }

}
function movement() {
    let x = 0;
    let y = -.2;
    let z = 0;
    {

        if (keyIsDown(LEFT_ARROW)) {
            Movement.x -= 10;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            Movement.x += 10;
        }

        if (keyIsDown(UP_ARROW)) {
            Movement.z -= 10;
        }

        if (keyIsDown(DOWN_ARROW)) {
            Movement.z += 10;
        }


        push();
        fill(255, 64, 255);
        translate(Movement.x, y, Movement.z);
        sphere(30);
        pop();

    }
}
