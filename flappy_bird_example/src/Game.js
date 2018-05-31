class Game {

    constructor() {

        // játéktér
        this.canvas = document.getElementById('game');
        this.canvas.width = 750;
        this.canvas.height = 350;

        // madár
        this.bird = new Component(10,0,20,20,'red',this);
        this.SetBirdGravity(0.05);

        // oszlopok
        this.obstacleCollection = [];
        this.minUpperHeight = 20;
        this.maxUpperHeight = 150;
        this.minGap = 60;
        this.maxGap = 100;
        this.obstracleWidth = 30;


        // időzítő
        this.tickCounter = 0;
        this.interval = setInterval(()=>{
            this.Update();
        },20);

        // feliratkozás
        window.addEventListener('keydown', event => {
            if (event.code == 'Space') {
                this.SetBirdGravity(-0.2)
            }
        });
        window.addEventListener('keyup', event => {
            if (event.code == 'Space') {
                this.SetBirdGravity(0.05)
            }
        });
    }

    Update() {

        // game over
        if (this.IsGmaeOver()) {
            clearInterval(this.interval);
            alert('Game Over');
            location.reload();
        }

        // takarítás
        this.Clear();

        // oszlopok felvétele
        if (this.tickCounter % 150 == 0) {
            // felső akadály magassága
            let upperHiehgt = this.maxUpperHeight + Math.round(
                Math.random() * (this.maxUpperHeight - this.minUpperHeight)
            );

            // térköz
            let gap = this.minGap + Math.round(
                Math.random() * (this.maxGap - this.minGap)
            );

            // alsó akadály magassága
            let lowerHeight = this.GetHeight() - upperHiehgt - gap ;

            // elemek felvétele
            this.obstacleCollection.push(new Component(
                this.GetWidth(),
                0,
                this.obstracleWidth,
                upperHiehgt,
                'green',
                this,
                -1
            ));

            this.obstacleCollection.push(new Component(
                this.GetWidth(),
                upperHiehgt + gap,
                this.obstracleWidth,
                lowerHeight,
                'green',
                this,
                -1
            ));
        }

        // oszlopok mozgatása
        this.obstacleCollection.forEach(obs => {
            obs.Move();
        });

        // madármozgatás
        this.bird.Move();

        // időzíés
        this.tickCounter++;
    }

    IsGmaeOver() {
        for (let i = 0; i < this.obstacleCollection.length; i++) {
            if (this.bird.CrashWith(this.obstacleCollection[i])) {
                return true;
            }
        }
        return false;
    }

    Clear() {

        this.GetContext().clearRect(0,0,this.GetWidth(),this.GetHeight());
    }

    GetWidth() {
        return this.canvas.width;
    }

    GetHeight() {
        return this.canvas.height;
    }

    GetContext() {
        return this.canvas.getContext('2d');
    }

    SetBirdGravity(newGravity) {
        this.bird.gravity = newGravity;
    }
}