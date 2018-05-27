class Box {
    constructor(game) {
        this.element = document.getElementById('box');
        this.mouseX = null;
        this.game = game;

        game.element.addEventListener('mousemove', (event) => {
            this.SetMouseX(event.clientX);


        });
    }

    SetMouseX(value) {
        if (this.mouseX == value) {
            return;
        }

        this.mouseX = value;
        this.UpDatePosition();
    }

    // doboz szélesség megállapítása
    GetWidth() {
        return this.element.clientWidth;
    }

    // doboz magasság meghatározása
    GetHeight() {
        return this.element.clientHeight;
    }

    UpDatePosition() {
        let elementLeft = this.mouseX - this.GetWidth() / 2;

        elementLeft = Math.max(0, elementLeft);
        elementLeft = Math.min(elementLeft,  this.game.GetWidth() - this.GetWidth());

        this.element.style.left = elementLeft + 'px';
    }

    GetLeftDistance() {
        return +this.element.style.left.replace('px', '');
    }
}