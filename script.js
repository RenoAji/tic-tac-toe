const square = document.querySelector('.square');
const boxes = square.getElementsByTagName('div');
const point = document.querySelectorAll('.poin');
const tagTurn = document.querySelectorAll('.turn');
const highlightIcon = '5px solid aquamarine';
const normalIcon = '1px solid black';
const container = document.querySelector('.container');
const close = document.querySelector('.close');
const h1Container = container.querySelector('h1');
let cross = {team : 'Cross', poin : 0, img : './image/cross.png', icon : tagTurn[0]}
let circle = {team : 'Circle', poin : 0, img : './image/circle.png', icon : tagTurn[1]}
cross.lawan = circle;
circle.lawan = cross;
cross.icon.style.border = highlightIcon;
circle.icon.style.border = normalIcon;
let turn = cross.team;

point[0].innerHTML = cross.poin.toString();
point[1].innerHTML = circle.poin.toString();


//---------------------------check if cross or circle win-------------------------
function winCheck(obj){
    let bool = false;
    const horMid = boxes[3].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[5].classList[1];
    const verMid = boxes[1].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[7].classList[1];
    const miringKanan = boxes[6].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[2].classList[1];
    const miringKiri = boxes[0].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[8].classList[1];
    const horTop = boxes[0].classList[1] === boxes[1].classList[1] && boxes[1].classList[1] === boxes[2].classList[1];
    const horBottom = boxes[6].classList[1] === boxes[7].classList[1] && boxes[7].classList[1] === boxes[8].classList[1];
    const verLeft = boxes[0].classList[1] === boxes[3].classList[1] && boxes[3].classList[1] === boxes[6].classList[1];
    const verRight = boxes[2].classList[1] === boxes[5].classList[1] && boxes[5].classList[1] === boxes[8].classList[1];
    function win(){
        container.style.display = 'flex'
        obj.poin++
        h1Container.innerHTML = obj.team + ' Win';
    }
    if(boxes[4].classList[1] === obj.team){
        if(horMid || verMid || miringKanan || miringKiri){
            win();
            bool = true;
        }
    }else if(boxes[0].classList[1] === obj.team){
        if(horTop || verLeft){
        win();
        bool = true;
        }
    }else if(boxes[8].classList[1] === obj.team){
            if(horBottom || verRight){
                win();
                bool = true;
            }
    }
    return bool;
}


//----------------------------------check if draw-----------------------------------------
function draw(){
    for (let i = 0; i < boxes.length; i++) {
        if(boxes[i].classList.length === 1){
            break
        }
        if(i === 8){
        container.style.display = 'flex';
        h1Container.innerHTML = 'Draw';
        }
    }
}

//------------------------------Click---------------------------------------------------------
square.onclick = function(e){
    function boxTap(obj){
        const img = document.createElement('img');
        img.src = obj.img;
        e.target.appendChild(img);
        img.style.width = '90%';
        e.target.classList.add(obj.team);
        turn = obj.lawan.team
        obj.lawan.icon.style.border = highlightIcon;
        obj.icon.style.border = normalIcon;
        if (winCheck(obj) != true){
            draw();
        }
    }
    if(e.target.className != 'square' && turn == cross.team && e.target.classList.length == 1){
        boxTap(cross);
    } else if(e.target.className != 'square' && turn == circle.team && e.target.classList.length == 1){
        boxTap(circle);
    }
}


// -----------------------------Alert Close-----------------------------------------
close.onclick = (e)=>{
    e.target.parentNode.parentNode.style.display = 'none';
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove(boxes[i].classList[1]);
        boxes[i].innerHTML = '';
        point[0].innerHTML = cross.poin.toString();
        point[1].innerHTML = circle.poin.toString();}
}