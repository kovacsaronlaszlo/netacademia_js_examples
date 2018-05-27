class Ball {
    constructor(game) {
        this.destroyed = false;
        this.game = game;

        this.element = document.createElement('div');
        this.element.className = 'ball';

        game.element.appendChild(this.element);

        this.SetBottomDistance(game.GetHeight() - this.GetHeight());

        this.SetLeftDistance(
            this.GetRandomLeftDistance()
        );
        this.Fall();
    }

    Fall() {
        if (this.GetBottomDistance() <= 0) {
            this.TriggerFellOff();
            this.Destroy();
            return;
        }

        if (this.GetBottomDistance() <= this.game.box.GetHeight()) {
            this.TriggerFellInLine();
        }

        this.SetBottomDistance(
            this.GetBottomDistance() - 1
        )

        setTimeout(() => {
            this.Fall();
        }, 5);

    }

    GetWidth() {
        return this.element.clientWidth;
    }

    GetHeight() {
        return this.element.clientHeight;
    }

    GetBottomDistance() {
        return +this.element.style.bottom.replace('px', '');
    }

    SetBottomDistance(distance) {
        this.element.style.bottom = distance + 'px';
    }

    GetLeftDistance() {
        return +this.element.style.left.replace('px', '');
    }

    SetLeftDistance(distance) {
        this.element.style.left = distance + 'px';
    }

    GetRandomLeftDistance() {
        return Math.round(
            Math.random() * (this.game.GetWidth() - this.GetWidth())
        );
    }

    Destroy() {
        this.element.style.display = 'none';
        this.destroyed = true;
    }

    TriggerFellOff() {
        if(this.destroyed) {
            return;
        }

        window.dispatchEvent(
            new CustomEvent('ball/fellOff')
        );
    }

    TriggerFellInLine() {
        if(this.destroyed) {
            return;
        }

        window.dispatchEvent(
            new CustomEvent('ball/fellInLine', {
                detail: this
            })
        );
    }
}