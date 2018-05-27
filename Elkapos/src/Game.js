class Game {
    constructor() {
        this.element = document.getElementById('game');

        // box
        this.box = new Box(this);

        //PointCounter
        this.points = null;
        this.spanPointCounter = document.getElementById('pointCounter');
        this.SetPointCounter(0);

        //LifeCounter
        this.life = 3;
        this.spanLifeCounter = document.getElementById('lifeCounter');
        this.SetLifeCounter(3);

        // labda generálás
        this.GenerateBalls();

        // feliratkozás
        window.addEventListener('ball/fellOff', () => {
            this.OnBallFellOff();
        });
        window.addEventListener('ball/fellInLine', (event) => {
            this.OnBallFellInLine(event);
        });
    }

    GenerateBalls() {
        new Ball(this);

        setTimeout(() => {
            this.GenerateBalls();
        }, 1000);
    }

    GetWidth() {
        return this.element.clientWidth;
    }

    GetHeight() {
        return this.element.clientHeight;
    }

    OnBallFellInLine(event) {
        let ball = event.detail;

        if(this.HasIntersection(this.box, ball)) {
            ball.Destroy();
            this.SetPointCounter(this.points + 1);
        }
    }

    OnBallFellOff() {
        this.SetLifeCounter(this.lifes - 1);

        if (this.lifes == 0) {
            alert('GAME OVER!');
            location.reload();
        }
    }

    // összehasionlítjuk a koordinátákat
    HasIntersection(box, ball) {
        let boxLeft = this.box.GetLeftDistance(),
            boxRight = boxLeft + this.box.GetWidth(),
            ballLeft = ball.GetLeftDistance(),
            ballRight = ballLeft + ball.GetWidth();

        if (boxLeft <= ballLeft && ballRight <= boxRight) {
            return true;
        }

        return false;
    }

    SetLifeCounter(value) {
        this.lifes = value;
        this.spanLifeCounter.innerText = value;
    }

    SetPointCounter(value) {
        this.points = value;
        this.spanPointCounter.innerText = value;
    }




}