import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

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

    box(); //Draw a box
}