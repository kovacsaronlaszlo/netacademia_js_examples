class Game {
    constructor() {
        // tábla
        this.board = new Board(35, 15);

        // kukac
        this.worm = new Worm(1,1);

        // game over
        this.gameover = false;

        // alma
        this.appleCell = null;
        this.GenerateApple();

        // esemény feliratkozások
        window.addEventListener('keydown', (event) => {
            this.OnKeyDown(event.key);
        });
        window.addEventListener('tick',()=>{
            this.MoveWorm();
        });

        // timer
        this.StartTick();
    }

    // kukacmozgató
    MoveWorm() {
        // ha elérte a tábla szélét, akkor game over!
        if (this.IsNextCellOutOfBoard()) {
                this.gameover = true;
                alert('Game Over!');
                location.reload();
        }

        // ha almára ért, akkor megnő
        if (this.IsNextCellApple()) {
            this.worm.Grow(5);
            this.GenerateApple();
        }

        this.worm.Move();
    }

    IsNextCellOutOfBoard() {

        let nextCell = this.worm.GetNextCell();

        // fel
        if (nextCell.row < 0) {
            return true;
        }
        //jobb
        if (nextCell.col >= this.board.width) {
            return true;
        }
        //le
        if (nextCell.row >= this.board.height) {
            return true;
        }
        // bal
        if (nextCell.col < 0) {
            return true;
        }

        return false;
    }

    IsNextCellApple() {
        let nextCell = this.worm.GetNextCell();

        if(nextCell.row != this.appleCell.rowIndex) {
            return false;
        }

        if(nextCell.col != this.appleCell.colIndex) {
            return false;
        }

        return true;
    }

    //alma
    GenerateApple() {
        let rowIndex = Math.round(Math.random() * (this.board.height - 1)),
            colIndex = Math.round(Math.random() * (this.board.width - 1));

        this.appleCell = {
            rowIndex: rowIndex,
            colIndex: colIndex
        };

        this.TriggerAppleAdded(this.appleCell);
    }

    TriggerAppleAdded(cell) {
        window.dispatchEvent(
            new CustomEvent('apple/added', {
                detail: cell
            })
        );
    }

    // eseménykezelő
    OnKeyDown(key) {
        switch(key) {
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':
                let direction = key.replace('Arrow', '').toLowerCase();
                this.worm.SetDirection(direction);
                break;
        }
    }

    // időzítő
    StartTick() {
        this.tickInterval = setInterval(()=>{
            window.dispatchEvent(new Event('tick'));
        },100);
    }

}