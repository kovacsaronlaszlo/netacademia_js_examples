// const
const gridSize = 4;

// find elem
let tableGrid = document.getElementById('grid');
let myElement = document.getElementById('cell1');
let card = new Card(1, myElement);

// init
RenderGrid();

// ================================================================== //

function RenderGrid() {
    tableGrid.innerHTML = '';

    // card values collection
    let cardValues = [];
    for (let valueIndex = 1; valueIndex <= gridSize * gridSize / 2; valueIndex++) {
        cardValues.push(valueIndex);
        cardValues.push(valueIndex);
    }
    console.log(cardValues);

    Shuffle(cardValues);

    // rows
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        let newRow = document.createElement('tr');

        // cells
        for (let colIndex = 0; colIndex < gridSize; colIndex++) {
            let newCell = document.createElement('td');
            newCell.innerText = rowIndex + ':' + colIndex;
            newRow.appendChild(newCell);
        }
        tableGrid.appendChild(newRow);
    }
}

function Shuffle(collection) {
    for (let i = collection.length; i >= 0; i--) {
        console.log(i);
    }
}


