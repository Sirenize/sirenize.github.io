    const template = document.querySelector('.window').cloneNode(true);

    document.getElementById("openCAE").addEventListener('click', function () {
    openWindow("./programs/test/essay.html", "College App");
    });

    function openWindow(src, windowName) {
    const newWindow = template.cloneNode(true);

    newWindow.querySelector('.header p').textContent = windowName;
    newWindow.querySelector('.windowbody embed').setAttribute('src', src);

    newWindow.style.left = "20%";
    newWindow.style.top = "20%";

    setupWindow(newWindow);
    document.body.appendChild(newWindow);
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
        pane.style.height = window.innerHeight + "px";
    }
    if (event.target.id == "close") {
        pane.remove();
    }
    });

    pane.addEventListener('pointerdown', () => bringToFront(pane));

    header.addEventListener('pointerdown', (event) => {
    pane.classList.add('is-dragging');

    const l = pane.offsetLeft;
    const t = pane.offsetTop;
    const startX = event.pageX;
    const startY = event.pageY;

    const drag = (event) => {
        event.preventDefault();

        // this should work.. but isnt.
        if (pane.classList.contains('maximized')) {
            pane.classList.remove('maximized')

            pane.style.width = 500 + "px";
            pane.style.height = 300 + "px";

            pane.style.left = event.pageX + "px";
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