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

function draw() {
    let starSize = randomInt(70, 130);
    drawStar(starSize);

    const randPlanetSize = () => randomInt(7, 38);
    const randOrbitDistance = () => randomInt(90, 130);

    let size = randPlanetSize();
    let distance = randOrbitDistance();
    let count = 1;

    while (distance + size <= width / 2) {
        drawPlanet(size, distance, count, '#stars_and_planets');

        size = randPlanetSize();
        distance += randOrbitDistance();
        count ++;
    }
    return document.getElementById('stars_and_planets');
}

function drawStar(size) {
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

    let parent = document.querySelector('#stars_and_planets');
    let star = document.getElementById('star');
    star.style.fill = color;
    star.setAttribute('cx', width / 2);
    star.setAttribute('cy', height / 2);
    star.setAttribute('r', size / 2);
    star.setAttribute('filter', 'url(#saturn)');
    parent.appendChild(star);
}

function drawPlanet(size = 50, distance = 200, count, parentToken) {
    console.log(parentToken);
    const hue = randomInt(0, 360);
    const saturation = randomInt(70, 100);
    const lightness = randomInt(50, 70);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    let parent = document.querySelector('#stars_and_planets');
    let planetNShadow = document.getElementById('planet_g_template');
    let newPlanetNShadow = planetNShadow.cloneNode(true);
    newPlanetNShadow.setAttribute('id', `planet_g_${count}`);

    let newPlanet = newPlanetNShadow.querySelector('.planet');
    let planetShadow = newPlanetNShadow.querySelector('.shadow');

    let shadowClipPath = newPlanetNShadow.querySelector('clipPath');
    shadowClipPath.setAttribute('id', `shadow_clip_path_${count}`);
    let clipPathCirc = shadowClipPath.querySelector('circle');
    console.log(shadowClipPath);
    clipPathCirc.setAttribute('r', size);
    
    planetShadow.setAttribute('id', `${count}_shadow`);
    planetShadow.setAttribute('r', size*5);
    planetShadow.setAttribute('cx', size/.4);
    planetShadow.setAttribute('cy', size/.5);
    planetShadow.setAttribute('clip-path', `url(#shadow_clip_path_${count})`);

    newPlanet.setAttribute('id', `planet_${count}`);
    newPlanet.style.fill = color;
    newPlanet.setAttribute('r', size);
    newPlanet.setAttribute('filter', `url(#${count}_texture)`);


    //filtering set up here
    const turbulenceType = randBool() ? 'fractalNoise' : 'turbulence';
    //the freq x and y values can yileld MANY effects with the 
    //proper constraints
    const baseFrequencyX = random(0.5, 2) / size;
    const baseFrequencyY = random(2, 4) / size;
    const numOctaves = randomInt(3, 10);
    const seed = Math.random();
    //lighting values
    const elevation = randomInt(30, 100);
    const surfaceScale = randomInt(5, 10);

    let filterTemplate = document.getElementById('filter_template');
    let newFilter = filterTemplate.cloneNode(true);

    newFilter.setAttribute('id', `${count}_texture`);
    let turbFilter = document.getElementById('turb_template');
    let newTurbFilter = turbFilter.cloneNode(true);
    newTurbFilter.removeAttribute('id');
    newTurbFilter.attributes.baseFrequency.value = `${baseFrequencyX} ${baseFrequencyY}`;
    newTurbFilter.attributes.type.value = `${turbulenceType}`;
    newTurbFilter.attributes.seed.value = `${seed}`;
    newTurbFilter.attributes.numOctaves.value = `${numOctaves}`;
    
    let lightingFilter = document.getElementById('diff_lighting_template')
                                 .cloneNode(true);

    lightingFilter.setAttribute('lighting-color', color);
    lightingFilter.attributes.surfaceScale.value = `${surfaceScale}`;
    lightingFilter.firstElementChild.attributes.elevation.value = `${elevation}`;

    let composite = document.getElementById('fe_composite_template')
                            .cloneNode(true);

    newFilter.appendChild(newTurbFilter);
    newFilter.appendChild(lightingFilter);
    newFilter.appendChild(composite);

    document.querySelector('defs').appendChild(newFilter);

    let orbitPath = newPlanetNShadow.querySelector('animateMotion');
    //M startPoint a rx,ry 0 1,0 1,0 z
    let path = `M 500,${500-distance} a ${distance},${distance} 0 1,0 1,0`;
    orbitPath.attributes['path'].value = path;
    orbitPath.attributes['dur'].value = randomInt(18, 50);
    // orbitPath.attributes['dur'].value = random(.3, 2);
    orbitPath.attributes['begin'].value = "-3s";
    orbitPath.attributes['repeatCount'].value = "indefinite";
    orbitPath.setAttribute('distance', distance);

    parent.append(newPlanetNShadow);
    return planetNShadow
    // parent.appendChild(newPlanet);
    // parent.appendChild(planetShadow);
}
function refresh() {
    let group = document.querySelector('g');
    while (group.children.length !== 0) {
        group.removeChild(group.firstElementChild);
    }
    draw();
}

let drawAndCleanup = draw();
// drawAndCleanup.remove();

addOrbitListeners();

function swapFirstPlanet(){
    let star = document.getElementById('star');
    let parent = document.querySelector('g');
    star.remove();
    parent.appendChild(star);
}

const refreshButton = document.querySelector('.js-refresh-button');
refreshButton.addEventListener('click', refresh);

//plug the range into the angle of orbit
function addOrbitListeners() {
    let angleAdjust = document.querySelector('input');
    angleAdjust.addEventListener('input', listenerFunc);
}
