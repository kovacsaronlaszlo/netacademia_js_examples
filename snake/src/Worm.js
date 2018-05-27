class Worm {
    constructor(startRowIndex, startColIndex) {
        // kukac darabjain
        this.cellCollection = [
            {row: startRowIndex, col: startColIndex}
        ];
        this.TriggerCellAdded(this.GetFirstCell());

        // irány
        this.direction = null;

    }

    // getter
    GetFirstCell() {
        return this.cellCollection[0];
    }

    //setter

    SetDirection(newDirection) {
        this.direction = newDirection;
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