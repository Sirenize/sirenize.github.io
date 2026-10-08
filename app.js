// start button code
document.getElementById("startbutton").addEventListener('click', function() {
  window.location.reload();
})

const windows = document.querySelectorAll(".window");

windows.forEach(win => {

  win.addEventListener('mousedown', () => {
    bringToFront(win)
  })

  const header = win.querySelector(".windowheader");
  const corner = win.querySelector(".corner")

  header.addEventListener("mousedown", (event) => {
    win.classList.add("is-dragging");

    const startLeft = win.offsetLeft;
    const startTop = win.offsetTop;
    const startX = event.pageX;
    const startY = event.pageY;

    const drag = (event) => {
      event.preventDefault();
      const newLeft = startLeft + (event.pageX - startX);
      const newTop = startTop + (event.pageY - startY);

      const maxLeft = window.innerWidth - win.offsetWidth;
      const maxTop = window.innerHeight - win.offsetHeight;

      win.style.left = Math.min(Math.max(newLeft, 0), maxLeft) + "px";
      win.style.top = Math.min(Math.max(newTop, 0), maxTop) + "px";
    };

    const mouseup = () => {
      win.classList.remove("is-dragging");

      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", mouseup);
  });

  corner.addEventListener("mousedown", (event) => {

    const startWidth = win.clientWidth;
    const startHeight = win.clientHeight;
    const startX = event.pageX;
    const startY = event.pageY;

    const drag = (event) => {
      event.preventDefault();
      win.style.width = startWidth + (event.pageX - startX) + "px";
      win.style.height = startHeight + (event.pageY - startY) + "px";
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", mouseup);
  });

});

function bringToFront(win) {
  const all = [...document.querySelectorAll(".window")]
    .filter(w => w !== win)
    .sort((a, b) => (+a.style.zIndex || 0) - (+b.style.zIndex || 0));

  all.push(win); // clicked window goes last, so it gets the highest value
  all.forEach((w, i) => (w.style.zIndex = i + 1));
}