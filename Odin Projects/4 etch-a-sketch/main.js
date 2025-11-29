function updateGridLabel(n) { gridLabel.textContent = `${n} x ${n}` }

function buildGrid(n) {
    gridCont.style.setProperty("--cols", n);

    const desired = n * n;
    const current = gridCont.children.length;

    if (current < desired) {
        const frag = document.createDocumentFragment();

        for (let i = 0; i < (desired - current); i++) {
            cell = document.createElement("div");
            cell.className = "cell";
            frag.appendChild(cell);
        }
        gridCont.appendChild(frag);
    } 
    
    else if (current > desired) {
        for (let i = 0; i < (current - desired); i++) {
            const last = gridCont.lastElementChild;
            if (last) last.remove();
        }
    }
}

function setActive(targetId) {
    allModeBtns.forEach(btn => {
        const isTarget = btn.id === targetId;
        btn.classList.toggle('active', isTarget);
    })
    modeBtn = targetId;
    // console.log(mode);
}

function randomRGB(){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

function paint(cell) {
    switch(modeBtn) {
        case "eraseBtn":
            cell.style.backgroundColor = 'transparent';
            cell.style.opacity = '';
            cell.dataset.opacity = '0';
            break;
        
        case "rainbowBtn":
            cell.style.backgroundColor = randomRGB();
            cell.style.opacity = '1';
            cell.dataset.opacity = '1';
            break;

        case "shadeBtn":
            let opacity = parseFloat(cell.dataset.opacity || 0);
            opacity = Math.min(opacity + 0.1, 1);
            cell.dataset.opacity = opacity.toFixed(2);
            cell.style.backgroundColor = color.value;
            cell.style.opacity = opacity;
            break;

        default:
            cell.style.backgroundColor = color.value;
            cell.style.opacity = '1';
            cell.dataset.opacity = '1';
    }
}

const gridLabel = document.getElementById("gridLabel");
let size = document.getElementById("size");
const gridCont = document.getElementById("grid");
let isShowGridlines = document.getElementById("isShowGridlines");
const color = document.getElementById("color");

let allModeBtns = document.querySelectorAll(".mode-btn");
const drawBtn = document.getElementById("drawBtn");
const eraseBtn = document.getElementById("eraseBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const shadeBtn = document.getElementById("shadeBtn");
const hoverMdBtn = document.getElementById("hoverMode");
const clearBtn = document.getElementById("clear");

updateGridLabel(size.valueAsNumber);
buildGrid(size.valueAsNumber);
gridCont.classList.toggle('gridlines', isShowGridlines.checked);

let modeBtn = "drawBtn";
let hoverMode = true;
let isPointerDown = false; 

size.addEventListener("input", e => {
    const n = parseInt(e.target.value, 10);
    updateGridLabel(n);
    buildGrid(n);
})

allModeBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
        const id = event.currentTarget.id;   
        setActive(id);
    })
})

isShowGridlines.addEventListener("change", e => {
    gridCont.classList.toggle('gridlines', e.target.checked);
});

hoverMdBtn.addEventListener("click", () => {
    hoverMode = !hoverMode;                                   
    hoverMdBtn.textContent = `Hover mode: ${hoverMode ? 'On' : 'Off'}`;
    hoverMdBtn.classList.toggle('active', hoverMode);        
})

gridCont.addEventListener('pointerdown', e => {
    if (e.button !== 0) return; // left-click only
    isPointerDown = true;
    paint(e.target);
  });

gridCont.addEventListener('pointerover', e => {
    if (hoverMode || isPointerDown) paint(e.target);
  });

document.addEventListener('pointerup', () => isPointerDown = false);

clearBtn.addEventListener('click', () => {
    gridCont.querySelectorAll(".cell").forEach(cell => {
        cell.style.backgroundColor = 'transparent';
        cell.style.opacity = '';
        cell.dataset.opacity = '0';
    })
})








