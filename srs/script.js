import { bubbleSort } from "./bubbleSort.js";
import { insertionSort } from "./insertionSort.js";
import { selectionSort } from "./selectionSort.js";
import { quickSort } from "./quickSort.js";
import { vizualization } from "./visualization.js"

const audio = document.querySelector('audio');
const columnsContainer = document.querySelector('.columns-container');

const sortButton = document.querySelector(".button");
sortButton.addEventListener('click', () => {
    if (sortButton.classList.contains('onclick')) {
        sortAlgorithm.finishSorting();
    } else {
        sortButton.classList.add('onclick');
        startSort.call(sortAlgorithm, sortAlgorithm.sort);
    }
})

const randomizeButton =  document.querySelector('.randomize');
randomizeButton.addEventListener('click', () => {
    if (sortAlgorithm.isSorting) {
        sortAlgorithm.ms = 5;
    } else {
        sortAlgorithm.resizeColumns();
    }
})

const sortButtons = document.querySelectorAll('.side-menu button:not(.randomize)');
sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.getAttribute('data-sort') === 'mergeSort') {
            audio.play();
            return;
        }
        for (const b of sortButtons) {
            b.classList.remove('selected');
        }
        button.classList.add('selected');
        sortAlgorithm.sort = button.getAttribute('data-sort');
    })
});

const speedButtons = document.querySelectorAll(".button.speed");
speedButtons.forEach((button, i) => {
    const speed = 800;
    button.addEventListener('click', () => {
        for (let b of speedButtons) {
            b.classList.remove('current-speed');
        }
        button.classList.add('current-speed');
        sortAlgorithm.ms = speed / 2**i;
    })
});

export const sortAlgorithm = {
    ms: 400,
    columns: [],
    isSorting: false,
    sort: 'bubbleSort',
    resizeColumns() {
        const newNumberOfColumns = Math.floor(Math.random() * 10 + 10);
        const numberOfColumns = this.columns.length;
        if (numberOfColumns < newNumberOfColumns) {
            for (let i = 0; i < newNumberOfColumns - numberOfColumns; i++) {
                createColumn(0, numberOfColumns + i)
            }
        } else {
            for (let i = 0; i < numberOfColumns - newNumberOfColumns; i++) {
                columnsContainer.removeChild(this.columns.pop().column)
            }
        }
    
        setTimeout(() => {
            for (let c of this.columns) {
                const fsize = Math.floor(Math.random() * 100);
                c.column.style.height = `${fsize}%`;
                c.column.innerText = fsize;
                c.order = fsize;
            }
        }, 100);
    },
    finishSorting() {
        this.ms = 10;
    }, 
    timer() {
        return new Promise(res => setTimeout(res, this.ms));
    }
}

function mergeSort() {

}

async function startSort(sort) {
    
    const algorithms = {

        'bubbleSort': bubbleSort,
        'selectionSort': selectionSort,
        'insertionSort': insertionSort,
        'quickSort': quickSort,
        'mergeSort': mergeSort
    }

    await algorithms[sort]();

    sortAlgorithm.ms = 75;
    for (let c in sortAlgorithm.columns) {
        await sortAlgorithm.timer();
        vizualization.removeSorted(c);
    }
    sortButton.classList.remove('onclick');

    for (let i = 0; i < speedButtons.length; i++) {
        const speed = 800;
        if (speedButtons[i].classList.contains('current-speed')) {
            sortAlgorithm.ms = speed / 2**i;
        }
    }
}

function createColumn(size, order) {
    const fsize = Math.floor(size);
    let newColumn = {
        column: document.createElement("div"),
        order: fsize
    }
    newColumn.column.classList.add("column");
    newColumn.column.style.height = `${fsize}%`;
    newColumn.column.style.order = order;
    newColumn.column.innerText = fsize;
    newColumn.order = fsize;
    sortAlgorithm.columns.push(newColumn);
    columnsContainer.appendChild(newColumn.column);
}

sortAlgorithm.resizeColumns();