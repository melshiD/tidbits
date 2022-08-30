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

    let star = document.getElementById('star');
    star.style.fill = color;
    star.setAttribute('cx', width / 2);
    star.setAttribute('cy', height / 2);
    star.setAttribute('r', size / 2);
    // star.setAttribute('filter', 'url(#saturn)');
}

function drawPlanet(size = 50, distance = 200, count, parentToken) {
    const hue = randomInt(0, 360);
    const saturation = randomInt(70, 100);
    const lightness = randomInt(50, 70);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    let parent = document.querySelector(`#position_${5+count}`);
    let planetNShadow = document.getElementById('planet_g_template');
    let newPlanetNShadow = planetNShadow.cloneNode(true);
    newPlanetNShadow.setAttribute('id', `planet_g_${count}`);

    let newPlanet = newPlanetNShadow.querySelector('.planet');
    let planetShadow = newPlanetNShadow.querySelector('.shadow');

    let shadowClipPath = newPlanetNShadow.querySelector('clipPath');
    shadowClipPath.setAttribute('id', `shadow_clip_path_${count}`);
    let clipPathCirc = shadowClipPath.querySelector('circle');
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
    let duration = randomInt(18, 60);
    orbitPath.attributes['dur'].value = duration;
    orbitPath.attributes['begin'].value = -duration/4;
    orbitPath.attributes['repeatCount'].value = "indefinite";
    orbitPath.setAttribute('distance', distance);

    parent.append(newPlanetNShadow);
    //set up the interval to switch planet positions at apex of orbit
    initilizeInterval(duration*500, newPlanetNShadow, count);
}
function refresh() {
    let group = document.querySelector('g');
    while (group.children.length !== 0) {
        group.removeChild(group.firstElementChild);
    }
    draw();
}

function adjustPosition(element, position2, position1){
    let elementID = element.getAttribute('id');
    let physicalPos1 = document.getElementById(position1);
    let physicalPos2 = document.getElementById(position2);
    if(physicalPos1.querySelector(`#${elementID}`)){
        element.remove();
        physicalPos2.appendChild(element);
    }
    else{
        element.remove();
        physicalPos1.appendChild(element);
    }
}

function initilizeInterval(interval, element, count){
    let position1, position2;
    if(count == 1){
        position1 = 'position_4';
        position2 = 'position_6';
    }
    if(count == 2){
        position1 = 'position_3';
        position2 = 'position_7';
    }
    if(count == 3){
        position1 = 'position_2';
        position2 = 'position_8';
    }
    if(count == 4){
        position1 = 'position_1';
        position2 = 'position_9';
    }
    setInterval(adjustPosition, interval, element, position1, position2);
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
