class Board {
    constructor(width, height) {
        this.gridElement = document.getElementById('grid');
        this.width = width;
        this.height = height;

        this.InitGrid();
    }

    InitGrid() {
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            
            let newRow = document.createElement('tr');
            
            for (let colIndex = 0; colIndex < this.width; colIndex++)  {

                let newCell = document.createElement('td');
                newRow.appendChild(newCell);
            }

            this.gridElement.appendChild(newRow);
        }
    }
}