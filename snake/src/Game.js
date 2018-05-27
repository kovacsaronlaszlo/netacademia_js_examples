class Game {
    constructor() {
        // tábla
        this.board = new Board(35, 15);

        // kukac
        this.worm = new Worm(1,1);

        // esemény feliratkozások
        window.addEventListener('keydown', (event) => {
            this.OnKeyDown(event.key);
        });
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
}