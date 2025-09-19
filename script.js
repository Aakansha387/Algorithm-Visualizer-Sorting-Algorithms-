const container = document.getElementById('container');
const generateBtn = document.getElementById('generate');
const sortBtn = document.getElementById('sort');
const algorithmSelect = document.getElementById('algorithm');

let array = [];

function generateArray() {
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }
    renderArray();
}

function renderArray(highlightIndices = []) {
    container.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = value * 3 + 'px';
        bar.textContent = value;
        if (highlightIndices.includes(index)) bar.style.backgroundColor = 'red';
        container.appendChild(bar);
    });
}

async function bubbleSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            renderArray([j, j + 1]);
            await new Promise(r => setTimeout(r, 400));
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray([j, j + 1]);
                await new Promise(r => setTimeout(r, 400));
            }
        }
    }
}

async function selectionSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            renderArray([minIndex, j]);
            await new Promise(r => setTimeout(r, 400));
            if (array[j] < array[minIndex]) minIndex = j;
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            renderArray([i, minIndex]);
            await new Promise(r => setTimeout(r, 400));
        }
    }
}

async function insertionSort() {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            renderArray([j, j + 1]);
            await new Promise(r => setTimeout(r, 400));
            j--;
        }
        array[j + 1] = key;
        renderArray([j + 1]);
        await new Promise(r => setTimeout(r, 400));
    }
}

generateBtn.addEventListener('click', generateArray);

sortBtn.addEventListener('click', async () => {
    const algo = algorithmSelect.value;
    if (algo === 'bubble') await bubbleSort();
    else if (algo === 'selection') await selectionSort();
    else if (algo === 'insertion') await insertionSort();
    renderArray();
});

generateArray();

