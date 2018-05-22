class Card {
    constructor(value, elem) {
        this.value = value;
        this.elem = elem;
        this.color = 'black';
        console.log(this);

        this.elem.addEventListener('click', (event) => {
            this.OnClick();
        });
        this.UpdateColor();
    }

    OnClick() {
        console.log('click');
        this.ToggleColor();
    }

    ToggleColor() {
        this.color = (this.color == 'black') ? 'white' : 'black';
        this.UpdateColor();
    }

    UpdateColor() {
        this.elem.style.backgroundColor = this.color;
    }
}