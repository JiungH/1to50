const map = document.body.querySelector('.map');

const title = document.createElement('h1');
title.innerText = "1 To 50!";
map.append(title);

const explain = document.createElement('h2');
explain.innerText = "Click the smallest number step by step!"
map.append(explain);

const SIZE = 5;

const mark = [];

const arr = [];
for (let i = 0; i < 25; i++) {
    let rNum = Math.floor(Math.random() * 25 + 1)
    let check = true;
    for (let j = 0; j < i; j++) {
        if (arr[j] === rNum) {
            check = false;
        }
    }
    if (check) {
        arr.push(rNum)
    } else {
        i--;
    }
}
const arr2 = [];
for (let i = 0; i < 25; i++) {
    let rNum = Math.floor(Math.random() * 25 + 26)
    let check = true;
    for (let j = 0; j < i; j++) {
        if (arr2[j] === rNum) {
            check = false;
        }
    }
    if (check) {
        arr2.push(rNum)
    } else {
        i--;
    }
}


let cnt = 0;
let cnt2 = 0;
let gameNum = 1;
for (let i = 0; i < SIZE; i++) {
    const row = [];
    const mapRow = document.createElement('div');
    mapRow.setAttribute('class', 'row')
    for (let j = 0; j < SIZE; j++) {
        row.push(arr[cnt]);
        const box = document.createElement('div');
        box.setAttribute('class', 'box');
        box.setAttribute('id', `y${i}x${j}`)
        if (cnt < 26) {
            box.innerHTML = arr[cnt];
            box.setAttribute('style', 'background-color : rgb(199, 236, 255)');
        }
        cnt++;


        box.addEventListener('click', e => {
            const yx = box.getAttribute('id');
            const y = parseInt(yx.charAt(1));
            const x = parseInt(yx.charAt(3));
            if (mark[y][x] === gameNum && gameNum < 26) {
                mark[y][x] = arr2[cnt2];
                box.innerHTML = arr2[cnt2];
                box.setAttribute('style', 'background-color :  #ffafaf70');
                gameNum++;
                cnt2++;
            } else if (mark[y][x] === gameNum && gameNum > 25) {
                box.innerHTML = "";
                box.setAttribute('style', 'background-color :  rgb(199, 236, 255)');
                gameNum++;
            }
            endCondition();
        })
        mapRow.append(box);
    }
    mark.push(row);
    map.append(mapRow);
}

console.table(mark);

function endCondition() {
    if (gameNum == 51) {

        alert(`Clear!!!`);
        location.reload();
    }
}



const timer = document.createElement('div');
timer.setAttribute('class', 'record')

let thread;
const start = document.body.querySelector('.map');

start.addEventListener('click', e => {
    thread = setInterval(updateTime, 10);
}, { once: true });

let n = 0;
function updateTime() {
    n++;
    let set = n / 100;
    timer.innerHTML = set;
    if (gameNum == 51) {
        clearInterval(thread)
    }
}
map.append(timer);