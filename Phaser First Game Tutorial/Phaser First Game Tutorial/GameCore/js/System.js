class UI {
    constructor() {
        console.log("UI Instantiated.")
        this.scoreText = game.add.text(10, 10, 'Score: 0', {
            font: '34px Arial',
            fill: '#fff'
        });
        this.scoreText.fixedToCamera = true;
        this.scoreText.cameraOffset.setTo(10, 10);

        this.playerHealth = game.add.text(30, 30, 'Health: ' + gameWorld.player.sprite.health, {
            font: '34px Arial',
            fill: '#fff'
        });
        this.playerHealth.fixedToCamera = true;
        this.playerHealth.cameraOffset.setTo(10, 60);
    }

    setScore(score) {
        this.scoreText.text = 'Score: ' + score;
    }

    setPlayerHealth(health) {
        this.playerHealth.text = 'Health: ' + health;
    }

}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}