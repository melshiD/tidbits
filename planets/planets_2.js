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
    let orbits = document.querySelectorAll('animateMotion');
    [...orbits].forEach(orbit => {
        let distance = orbit.getAttribute('distance');
        console.log(distance);
        let newDist = distance / ev.target.value;
        let path = `M 500,${500-newDist} a ${distance},${newDist} 0 1,0 1,0`;
        orbit.setAttribute('path', path);
    });
};

function draw(parentToken = '.js-svg-wrapper') {
    let starSize = randomInt(70, 130);
    drawStar(starSize, parentToken);

    const randPlanetSize = () => randomInt(7, 38);
    const randOrbitDistance = () => randomInt(90, 130);

    let size = randPlanetSize();
    let distance = randOrbitDistance();
    let count = 1;

    while (distance + size <= width / 2) {
        drawPlanet(size, distance, count, 'g');

        size = randPlanetSize();
        distance += randOrbitDistance();
        count ++;
    }
    // addOrbitListeners();
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
    let star = document.getElementById('star');
    star.style.fill = color;
    star.setAttribute('cx', width / 2);
    star.setAttribute('cy', height / 2);
    star.setAttribute('r', size / 2);
    star.setAttribute('filter', 'url(#saturn)');
    parent.appendChild(star);
}

function drawPlanet(size = 50, distance = 200, count, parentToken = 'g') {
    const hue = randomInt(0, 360);
    const saturation = randomInt(70, 100);
    const lightness = randomInt(50, 70);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    let parent = document.querySelector(parentToken);
    let planet = document.querySelector('.planet');
    let newPlanet = planet.cloneNode(true);
    newPlanet.setAttribute('id', `planet_${count}`);
    newPlanet.style.fill = color;
    newPlanet.setAttribute('r', size);
    newPlanet.setAttribute('id', `planet_${count}`);

    let orbitPath = newPlanet.querySelector('animateMotion');
    console.log(orbitPath);
    //M startPoint a rx,ry 0 1,0 1,0 z
    let path = `M 500,${500-distance} a ${distance},${distance} 0 1,0 1,0`;
    orbitPath.attributes['path'].value = path;
    orbitPath.attributes['dur'].value = randomInt(5, 20);
    orbitPath.attributes['begin'].value = "-3s";
    orbitPath.attributes['repeatCount'].value = "indefinite";
    orbitPath.setAttribute('distance', distance);

    parent.appendChild(newPlanet);
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
    let angleAdjust = document.querySelector('input');
    angleAdjust.addEventListener('input', listenerFunc);
}
