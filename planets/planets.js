//utility functions for randomness
function random(min, max) {
    const diff = max - min;
    return min + diff * Math.random();
}

function randomInt(min, max) {
    return Math.round(random(min, max));
}

function randBool(odds = 0.5) {
    return Math.random() > odds;
}

function randFromArray(array) {
    return array[randomInt(0, array.length - 1)];
}

//draw a satellite object and append it to the group
const svgNs = "http://www.w3.org/2000/svg";
const width = 1000;
const height = 1000;

const listenerFunc = (ev) => {
    let orbits = document.querySelectorAll('ellipse');
    console.log(orbits);
    [...orbits].forEach(orbit => {
        orbit.setAttribute('ry', orbit.getAttribute('orbit') / ev.target.value);
    });
};

function draw(parentToken = '.js-svg-wrapper') {
    let starSize = randomInt(70, 130);
    drawStar(starSize, parentToken);

    const randPlanetSize = () => randomInt(7, 38);
    const randOrbitDistance = () => randomInt(90, 130);

    let size = randPlanetSize();
    let distance = randOrbitDistance();

    while (distance + size <= width / 2) {
        drawPlanet(size, distance, 'g');
        drawOrbit(distance, 'g');

        size = randPlanetSize();
        distance += randOrbitDistance();
    }
    addOrbitListeners();
}

function drawStar(size, parentToken) {
    const hueRange = randFromArray([
        [330, 390],
        [40, 60],
        [190, 240]
    ]);

    let hue = randomInt(...hueRange);
    if(hue > 360){
        hue = hue - 360;
    }
    const saturation = randomInt(90, 100);
    const lightness = randomInt(60, 80);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    let parent = document.querySelector('g');
    let circle = document.createElementNS(svgNs, 'circle');
    circle.style.fill = color;
    circle.setAttribute('cx', width / 2);
    circle.setAttribute('cy', height / 2);
    circle.setAttribute('r', size / 2);
    circle.setAttribute('filter', 'url(#saturn)');
    //appending circle would NOT draw if I set attributes using .setAttributeNS
    parent.appendChild(circle);
}

function drawPlanet(size = 50, distance = 200, parentToken = 'g') {

    const hue = randomInt(0, 360);
    const saturation = randomInt(70, 100);
    const lightness = randomInt(50, 70);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    let parent = document.querySelector(parentToken);
    let circle = document.createElementNS(svgNs, 'circle');
    circle.style.fill = color;
    circle.setAttribute('cx', width / 2 + distance);
    circle.setAttribute('cy', height / 2);
    circle.setAttribute('r', size);
    circle.classList.add('planet');
    parent.appendChild(circle);
}

function drawOrbit(distance = 200, parentToken = 'g') {
    let parent = document.querySelector(parentToken);
    let ellipse = document.createElementNS(svgNs, 'ellipse');
    ellipse.style.fill = "none";
    ellipse.style.stroke = "white";
    ellipse.style.strokeWidth = "1px";
    ellipse.setAttribute('cx', width / 2);
    ellipse.setAttribute('cy', height / 2);
    ellipse.setAttribute('rx', distance);
    ellipse.setAttribute('ry', distance);
    ellipse.setAttribute('orbit', distance);
    parent.appendChild(ellipse);
}

function refresh() {
    let group = document.querySelector('g');
    while (group.children.length !== 0) {
        group.removeChild(group.firstElementChild);
    }
    draw();
}
draw();


const refreshButton = document.querySelector('.js-refresh-button');
refreshButton.addEventListener('click', refresh);

//plug the range into the angle of orbit
function addOrbitListeners() {
    let angleAdjust = document.getElementById('orbit_angle');
    angleAdjust.addEventListener('input', listenerFunc);
}

//animation code
let tween;
let path = document.querySelector('ellipse');
let planet = document.querySelector('.planet');
// let motionPath = MorphSVGPlugin.pathDataToBezier(path, { align: planet });

//offest the balloon by half width and half height to make it appear centered on path
// TweenLite.set(planet, { xPercent: -50, yPercent: -50 });

// console.log(motionPath)

// document.querySelector("#createAnimation").click(function () {

//     tween = TweenLite.to(planet, 2, { bezier: { values: motionPath, type: "cubic" }, onUpdate: updateSlider });

// });
function animatePlanet(){
    let planet = document.querySelector('.planet');
    let orbit = document.querySelector('ellipse');

    let orbitBBox = orbit.getBBox();
    console.log(orbitBBox);
}

function posYValue(xValue){
    
}