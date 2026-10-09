const windowtemplate = document.querySelector('.window').cloneNode(true);
//const navbuttontemplate = document.querySelector('.navbutton').cloneNode(true);

//const navbuttons = document.querySelector('.navbar .nav__buttons')

// programs

document.getElementById("openWELCOME").addEventListener('click', function () {
openWindow("./programs/welcome/index.html", "welcome.txt");
});

document.getElementById("openCAE").addEventListener('click', function () {
openWindow("./programs/collegeapp/index.html", "College App Essay");
});

document.getElementById("openECLIPSE").addEventListener('click', function () {
openWindow("./programs/eclipsed/index.html", "Eclipsed - Poem Assignment");
});

document.getElementById("openPOEMBOOK").addEventListener('click', function () {
openWindow("./programs/poembook/index.html", "Poem Book");
});

document.getElementById("openRHETORICAL").addEventListener('click', function () {
openWindow("./programs/rhetoricalsituation/index.html", "Rhetorical Situation Writing");
});

document.getElementById("openIKWYTOM").addEventListener('click', function () {
openWindow("./programs/ikwytom/index.html", "I Know What You Think of Me Writing");
});

document.getElementById("openHUMOR").addEventListener('click', function () {
openWindow("./programs/humor/index.html", "Humor Writing");
});

document.getElementById("openMUNDANE").addEventListener('click', function () {
openWindow("./programs/mundane/index.html", "Mundane Writing");
});

document.getElementById("openBURSTS").addEventListener('click', function () {
openWindow("./programs/shortbursts/index.html", "Short Bursts Writing");
});

document.getElementById("openNEON").addEventListener('click', function () {
openWindow("./programs/neon/index.html", "Neon Gravestones - AP Lit Poem");
});

// end of programs

function openWindow(src, windowName) {
const newWindow = windowtemplate.cloneNode(true);
//const newButton = navbuttontemplate.cloneNode(true);

newWindow.querySelector('.header p').textContent = windowName;
newWindow.querySelector('.windowbody embed').setAttribute('src', src);
//newButton.querySelector('.navbutton p').textContent = windowName;

newWindow.style.left = "20%";
newWindow.style.top = "20%";

setupWindow(newWindow);
document.body.appendChild(newWindow);
//navbuttons.appendChild(newButton);
bringToFront(newWindow);
}

function setupWindow(pane) {
const header = pane.querySelector('.header');
const corner = pane.querySelector('.corner');
const buttons = pane.querySelector('.buttons');

buttons.addEventListener('click', function (event) {
if (event.target.id == "maximize") {
    pane.classList.add('maximized');

    pane.style.left = 0;
    pane.style.top = 0;
    pane.style.width = window.innerWidth + "px";
    pane.style.height = window.innerHeight - 30 + "px";
}
if (event.target.id == "close") {
    pane.remove();
}
});

pane.addEventListener('pointerdown', () => bringToFront(pane));

header.addEventListener('pointerdown', (event) => {
pane.classList.add('is-dragging');

let l = pane.offsetLeft;
let t = pane.offsetTop;
let startX = event.pageX;
let startY = event.pageY;

const drag = (event) => {
    event.preventDefault();

    if (pane.classList.contains('maximized')) {
        pane.classList.remove('maximized')

        pane.style.width = 500 + "px";
        pane.style.height = 300 + "px";

        l = event.pageX - 250;
        t = 0;
        startX = event.pageX;
        startY = event.pageY;
    }

    const maxLeft = window.innerWidth - pane.offsetWidth;
    const maxTop = window.innerHeight - pane.offsetHeight;

    pane.style.left = Math.min(Math.max(l + (event.pageX - startX), 0), maxLeft) + "px";
    pane.style.top = Math.min(Math.max(t + (event.pageY - startY), 0), maxTop) + "px";
};

const pointerup = () => {
    pane.classList.remove('is-dragging');
    document.removeEventListener('pointermove', drag);
    document.removeEventListener('pointerup', pointerup);
    document.removeEventListener('pointercancel', pointerup);
};

document.addEventListener('pointermove', drag);
document.addEventListener('pointerup', pointerup);
document.addEventListener('pointercancel', pointerup);
});

corner.addEventListener('pointerdown', (event) => {
const w = pane.clientWidth;
const h = pane.clientHeight;
const startX = event.pageX;
const startY = event.pageY;

const drag = (event) => {
    event.preventDefault();
    pane.style.width = w + (event.pageX - startX) + 'px';
    pane.style.height = h + (event.pageY - startY) + 'px';
};

const pointerup = () => {
    document.removeEventListener('pointermove', drag);
    document.removeEventListener('pointerup', pointerup);
    document.removeEventListener('pointercancel', pointerup);
};

document.addEventListener('pointermove', drag);
document.addEventListener('pointerup', pointerup);
document.addEventListener('pointercancel', pointerup);
});
}

document.querySelectorAll('.window').forEach(setupWindow);

function bringToFront(pane) {
const all = [...document.querySelectorAll(".window")]
.filter(p => p !== pane)
.sort((a, b) => (+a.style.zIndex || 0) - (+b.style.zIndex || 0));

all.push(pane);
all.forEach((p, i) => (p.style.zIndex = i + 1));
}

openWindow("./programs/welcome/index.html", "welcome.txt");