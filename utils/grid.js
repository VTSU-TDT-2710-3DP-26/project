// drawGrid()
// Draws a flat grid on the XZ plane (the "floor") centered at the origin.
//
// Parameters:
//   size      — total width and depth of the grid (default 400)
//   divisions — how many cells to divide it into (default 10)
//   col       — line colour as [r, g, b] (default dim grey)
 
export function drawGrid(size = 500, divisions = 10, col = [80, 80, 80]) {
  const step = size / divisions;
  const half = size / 2;
 
  push();
    stroke(...col);
    strokeWeight(1);
    noFill();
 
    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step;
      line(pos, 0, -half,  pos, 0,  half);  // lines along Z
      line(-half, 0, pos,  half, 0, pos);   // lines along X
    }
  pop();
}