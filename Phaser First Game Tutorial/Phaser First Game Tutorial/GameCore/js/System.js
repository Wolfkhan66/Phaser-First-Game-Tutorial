class UI {
    constructor() {
        console.log("UI Instantiated.")
        // create text for the score
        this.scoreText = game.add.text(0, 0, 'Score: 0', {
            font: '34px Arial',
            fill: '#fff'
        });
        // fix the text to the game camera and set the x and y relative to the camera
        this.scoreText.fixedToCamera = true;
        this.scoreText.cameraOffset.setTo(10, 10);

        // Create text to display the player health
        this.playerHealth = game.add.text(0, 0, 'Health: ' + gameWorld.player.sprite.health, {
            font: '34px Arial',
            fill: '#fff'
        });
                // fix the text to the game camera and set the x and y relative to the camera
        this.playerHealth.fixedToCamera = true;
        this.playerHealth.cameraOffset.setTo(10, 60);

        this.newGameText = game.add.text(0, 0, 'New Game', {
            font: '34px Arial',
            fill: '#fff'
        });

        this.newGameText.fixedToCamera = true;
        this.newGameText.cameraOffset.setTo(game.width / 2, game.height / 2);
        this.newGameText.inputEnabled = true;
        this.newGameText.events.onInputDown.add(function () { return SceneManager("Map1") }, this);
    }

    setScore(score) {
        this.scoreText.text = 'Score: ' + score;
    }

    setPlayerHealth(health) {
        this.playerHealth.text = 'Health: ' + health;
    }

    hideAll() {
        this.scoreText.visible = false;
        this.playerHealth.visible = false;
        this.newGameText.visible = false;
    }
}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}