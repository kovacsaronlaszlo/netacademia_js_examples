class Board {
    constructor(width, height) {
        // grid inicializálás
        this.gridElement = document.getElementById('grid');
        this.width = width;
        this.height = height;

        this.InitGrid();

        // feliratkozás eseményekre
        window.addEventListener('worm/cellAdded', event => {
            this.UpdateCell(event.detail.rowIndex, event.detail.colIndex, 'yellow');
        });
        window.addEventListener('worm/cellRemoved', event => {
            this.UpdateCell(event.detail.rowIndex, event.detail.colIndex, 'gray');
        });
    }

    InitGrid() {
        // sorok
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            
            let newRow = document.createElement('tr');

            // cellák
            for (let colIndex = 0; colIndex < this.width; colIndex++)  {

                let newCell = document.createElement('td');
                newRow.appendChild(newCell);
            }

            this.gridElement.appendChild(newRow);
        }
    }

    UpdateCell(rowIndex, colIndex, color) {
        // cella keresése
        let row = this.gridElement.children[rowIndex],
            cell = row.children[colIndex];

        // szín átadása
        cell.style.backgroundColor = color;

    }
}