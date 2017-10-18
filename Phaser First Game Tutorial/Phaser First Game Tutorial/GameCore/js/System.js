class UI {
    constructor() {
        console.log("UI Instantiated.")
        this.scoreText = game.add.text(10, 10, 'Score: 0', {
            font: '34px Arial',
            fill: '#fff'
        });
    }

    setScore(score) {
        this.scoreText.text = 'Score: ' + score;
    }

}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}