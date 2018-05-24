// const
const gridSize = 4;

// find elem
let tableGrid = document.getElementById('grid');
let myElement = document.getElementById('cell1');
let card = new Card(1, myElement);
let activeCards = [];

window.addEventListener('cardClick', OnCardClick);

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
    Shuffle(cardValues);

    // rows
    let cardValueIndex = 0;
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        let newRow = document.createElement('tr');

        // cells
        for (let colIndex = 0; colIndex < gridSize; colIndex++) {
            let newCell = document.createElement('td');
            newCell.innerText = cardValues[cardValueIndex];
            newRow.appendChild(newCell);
            new Card(cardValues[cardValueIndex], newCell);
            cardValueIndex++;
        }
        tableGrid.appendChild(newRow);
    }
}

function Shuffle(collection) {
    for (let i = collection.length - 1; i >= 0; i--) {
        let randomIndex = Math.round(Math.random() * i);
        let temp = collection[i];
        collection[i] = collection[randomIndex];
        collection[randomIndex] = temp;
    }

    return collection;
}

function OnCardClick(event) {

    let clickcedCard = event.detail;
    activeCards.push(clickcedCard);
    // if  2 active card
    if (activeCards.length >= 2) {
        TriggerGameBlocked();

        if (activeCards[0].value == activeCards[1].value) {
            while (card = activeCards.pop()) {
                card.SetResolved();
            }
            TriggerGameUnBlocked();
        } else {
            setTimeout(function() {
                while (card = activeCards.pop()) {
                    card.ToggleColor();
                }
                TriggerGameUnBlocked();
            }, 1000);
        }
    }

}

function TriggerGameBlocked() {
    window.dispatchEvent(new Event('gameBlocked'));
}

function TriggerGameUnBlocked() {
    window.dispatchEvent(new Event('gameUnBlocked'));
}


