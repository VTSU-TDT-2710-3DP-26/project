let f = 30;
let pos = vector(-900, 0, 2950);
let disabled = false;
window.checkPosition = function (t, player) {
    if ( f <= 0 )
        return;
    push();
    translate(pos.x, pos.y, pos.z);
    scale(.5);
    rotateY(60);
    let d = pos.minus(player).mag();
    console.log(d);
    if (d < 600) {
        monster(t);
        f--;
    } else {
        push();
        fill(0, 0, 0, 0);
        strokeWeight(2);
        stroke(0);
        translate(0, 55, 0);
        rotateX(Math.random() * 50);
        rotateY(Math.random() * 50);
        rotateZ(Math.random() * 50);
        scale(Math.random() / 4 + 1);
        sphere(20, 3, 3);
        pop();
    }
    pop();
}

function monster(t) {

    push();
    stroke(0, 0, 0);  //Make the stroke black

    scale(1, 1.4, 1);
    fill(0, 0, 0, 0);

    let l = function (...n) {
        n = n.map(i => i + Math.random() * 10 - 5);
        line(...n);
    }

    let rf = [50, 0, 0];
    let lf = [-50, 0, -40];
    let rk = [40, -100, 0];
    let lk = [-40, -100, 40];
    let g = [0, -180, 0];

    let k = [0, -300, 0];

    let rs = [40, -300, 0];
    let ls = [-40, -300, 0];

    let re = [100, -240, 0];
    let le = [-60, -200, 0];

    let rw = [120, -50, 60];
    let lw = [-120, -20, 80];

    for (let i = 0; i < 6; i++) {
        strokeWeight(Math.random() * 5); //Make it thin
        l(...rf, ...rk);
        l(...rk, ...g);

        l(...lf, ...lk);
        l(...lk, ...g);
        l(...g, ...k);

        l(...k, ...rs)
        l(...k, ...ls);

        l(...rs, ...re);
        l(...re, ...rw);

        l(...ls, ...le);
        l(...le, ...lw);
        push();
        translate(0, -330, 0);
        scale(1.2, .8, 1);
        rotateX(Math.random() * 50);
        rotateY(Math.random() * 50);
        rotateZ(Math.random() * 50);
        scale(Math.random() / 4 + 1);
        sphere(40, 3, 3);
        pop();

    }


    pop();
}
