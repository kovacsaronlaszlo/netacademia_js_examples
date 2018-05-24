class Card {
    constructor(value, elem) {
        this.value = value;
        this.elem = elem;
        this.color = 'black';
        this.resolved = false;
        this.blocked = false;

        this.elem.addEventListener('click', () => {
            this.OnClick();
        });

        window.addEventListener('gameBlocked', () => {
            this.blocked = true;
        });

        window.addEventListener('gameUnBlocked', () => {
            this.blocked = false;
        });

        this.UpdateColor();
    }

    OnClick() {
        if (this.blocked) {
            return;
        }
        this.ToggleColor();
        this.TriggerCardClick();
    }

    ToggleColor() {
        this.color = (this.color == 'black') ? 'white' : 'black';
        this.UpdateColor();
    }

    UpdateColor() {
        this.elem.style.backgroundColor = this.color;
    }

    TriggerCardClick() {
        let event = new CustomEvent('cardClick', {detail:this});
        window.dispatchEvent(event);
    }

    SetResolved() {
        this.resolved = true;
        this.elem.style.visibility = 'hidden';
    }


}