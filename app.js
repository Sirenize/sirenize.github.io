// start button
document.getElementById("startbutton").addEventListener('click', function() {
  window.location.reload();
})

// windows
const panes = document.querySelectorAll('.window')

panes.forEach((pane) => {
  const header = pane.querySelector('.header')
  const corner = pane.querySelector('.corner')
  const buttons = pane.querySelector('.buttons')
  const navbar = pane.querySelector('.navbar')

  buttons.addEventListener('click', function (event) {
    if (event.target.id == "maximize") {
      pane.style.width = window.innerWidth + "px";
      pane.style.height = window.innerHeight - 30 + "px";
    }})

  pane.addEventListener('mousedown', () => {
    bringToFront(pane)
  })

  header.addEventListener('mousedown', (event) => {
    pane.classList.add('is-dragging')

    let l = pane.offsetLeft
    let t = pane.offsetTop

    let startX = event.pageX
    let startY = event.pageY

    const drag = (event) => {
      event.preventDefault()
      
      const maxLeft = window.innerWidth - pane.offsetWidth;
      const maxTop = window.innerHeight - pane.offsetHeight;

      pane.style.left = Math.min(Math.max(l + (event.pageX - startX), 0), maxLeft) + "px";
      pane.style.top = Math.min(Math.max(t + (event.pageY - startY), 0), maxTop) + "px";
    }

    const mouseup = () => {
      pane.classList.remove('is-dragging')

      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', mouseup)
    }

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', mouseup)
  })

  corner.addEventListener('mousedown', (event) => {
    let w = pane.clientWidth
    let h = pane.clientHeight

    let startX = event.pageX
    let startY = event.pageY

    const drag = (event) => {
      event.preventDefault()

      pane.style.width = w + (event.pageX - startX) + 'px'
      pane.style.height = h + (event.pageY - startY) + 'px'
    }

    const mouseup = () => {
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', mouseup)
    }

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', mouseup)
  })
})

function bringToFront(pane) {
  const all = [...document.querySelectorAll(".window")]
    .filter(p => p !== pane)
    .sort((a, b) => (+a.style.zIndex || 0) - (+b.style.zIndex || 0));

  all.push(pane);
  all.forEach((p, i) => (p.style.zIndex = i + 1));
}