class Worm {
    constructor(startRowIndex, startColIndex) {
        // kukac darabjain
        this.cellCollection = [
            {row: startRowIndex, col: startColIndex}
        ];
        this.TriggerCellAdded(this.GetFirstCell());

        // irány
        this.direction = null;

        // kukac növekedés
        this.growCounter = 2;

    }

    // getter
    GetFirstCell() {
        return this.cellCollection[0];
    }

    GetNextCell() {
        let nextRow = this.GetFirstCell().row,
            nextCol = this.GetFirstCell().col;

        switch (this.direction) {
            case 'up':
                nextRow--;
                break;
            case 'right':
                nextCol++;
                break;
            case 'down':
                nextRow++;
                break;
            case 'left':
                nextCol--;
                break;
        }

        return {row: nextRow, col: nextCol};
    }

    //setter

    SetDirection(newDirection) {
        this.direction = newDirection;

        this.GetNextCell();
    }

    Move() {

        if(this.direction == null) {
            return;
        }

        // unshift
        let newFirsdtCell = this.GetNextCell();
        this.cellCollection.unshift(newFirsdtCell);
        this.TriggerCellAdded(newFirsdtCell);

        //pop
        if (this.growCounter == 0) {
            let lastCell = this.cellCollection.pop();
            this.TriggerCellRemove(lastCell);
        } else {
            this.growCounter--;
        }
    }

    // kukca növekedés
    Grow(val) {
        this.growCounter += val;
    }

    //esemény tüzelő fv.

    TriggerCellAdded(cell) {
        window.dispatchEvent(
            new CustomEvent(
                'worm/cellAdded', {
                    detail: {
                        rowIndex: cell.row,
                        colIndex: cell.col
                    }
                }
            )
        );
    }

    TriggerCellRemove(cell) {
        window.dispatchEvent(
            new CustomEvent(
                'worm/cellRemoved', {
                    detail: {
                        rowIndex: cell.row,
                        colIndex: cell.col
                    }
                }
            )
        );
    }
}