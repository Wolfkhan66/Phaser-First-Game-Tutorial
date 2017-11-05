class UI {
    constructor() {
        console.log("UI Instantiated.")

        // create text for the score
        this.scoreText = game.add.text(0, 0, 'Score: 0', {
            font: '34px Old English Text MT',
            fill: '#fff'
        });
        // fix the text to the game camera and set the x and y relative to the camera
        this.scoreText.fixedToCamera = true;
        this.scoreText.cameraOffset.setTo(10, 10);

        // Create text to display the player health
        this.playerHealth = game.add.text(0, 0, 'Health: ' + gameWorld.player.sprite.health, {
            font: '34px Old English Text MT',
            fill: '#fff'
        });

        this.playerHealthBar = new Phaser.Rectangle(10, 50, gameWorld.player.sprite.health, 20);

                // fix the text to the game camera and set the x and y relative to the camera
        this.playerHealth.fixedToCamera = true;
        this.playerHealth.cameraOffset.setTo(10, 60);

        this.newGameText = game.add.text(0, 0, 'New Game', {
            font: '34px Old English Text MT',
            fill: '#fff'
        });

        this.newGameText.fixedToCamera = true;
        this.newGameText.cameraOffset.setTo((game.width / 2) -34, (game.height / 2) - 34);
        this.newGameText.inputEnabled = true;
        this.newGameText.events.onInputDown.add(function () { return SceneManager("Map1") }, this);


        this.gameOverText = game.add.text(0, 0, 'Game Over', {
            font: '68px Old English Text MT',
            fill: '#fff'
        });

        this.gameOverText.fixedToCamera = true;
        this.gameOverText.cameraOffset.setTo((game.width / 3.5), (game.height / 2) - 68);
        this.gameOverText.inputEnabled = true;
        this.gameOverText.events.onInputDown.add(function () { return SceneManager("Menu") }, this);
    }

    setScore(score) {
        this.scoreText.text = 'Score: ' + score;
    }

    setPlayerHealth(health) {
        this.playerHealth.text = 'Health: ' + health;
        this.playerHealthBar.width = health;
    }

    hideAll() {
        this.scoreText.visible = false;
        this.playerHealth.visible = false;
        this.newGameText.visible = false;
        this.gameOverText.visible = false;
    }
}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}