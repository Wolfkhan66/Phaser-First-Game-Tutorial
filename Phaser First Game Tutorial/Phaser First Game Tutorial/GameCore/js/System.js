class UI {
    constructor() {
        console.log("Constructing UI Elements")

        // Create groups to store ui elements
        this.InGameUI = game.add.group();
        this.MainMenuUI = game.add.group();
        this.GameOverUI = game.add.group();

        // IN GAME UI \\
        // create text for the score
        this.scoreText = game.add.text(660, 2, 'Score: 0', {
            font: '20px Old English Text MT',
            fill: '#fff'
        });

        // create text for the wave counter
        this.WaveCounter = game.add.text(335, 8, 'Wave: 22', {
            font: '35px Old English Text MT',
            fill: '#fff'
        });

        // create the health bar HUD element
        this.HUD = game.add.sprite(0, 0, 'HUD');
        // create the healh bar rectangle to go behind the HUD element
        this.healthBarRectangle = game.make.graphics();
        this.healthBarRectangle.beginFill(0x00ff00, 1);
        this.healthBarRectangle.drawRect(24, 10, gameWorld.player.sprite.health, 11);
        this.healthBarRectangle.endFill();

        // Add elements to the ui group in the order they should be rendered
        this.InGameUI.add(this.healthBarRectangle);
        this.InGameUI.add(this.HUD);
        this.InGameUI.add(this.scoreText);
        this.InGameUI.add(this.WaveCounter);


        // MAIN MENU UI \\
        // create the new game text
        this.newGameText = game.add.text((game.width / 2) - 34, (game.height / 2) - 34, 'New Game', {
            font: '34px Old English Text MT',
            fill: '#fff'
        });
        // enable input on the text and add a callback on the text click event
        this.newGameText.inputEnabled = true;
        this.newGameText.events.onInputDown.add(function () { return SceneManager("Map1") }, this);

        // Add elements to the ui group in the order they should be rendered
        this.MainMenuUI.add(this.newGameText);

        // GAME OVER UI \\
        // create the game over text
        this.gameOverText = game.add.text((game.width / 3.5), (game.height / 2) - 68, 'Game Over', {
            font: '68px Old English Text MT',
            fill: '#fff'
        });

        // enable input on the text and add a callback on the text click event
        this.gameOverText.inputEnabled = true;
        this.gameOverText.events.onInputDown.add(function () { return SceneManager("Menu") }, this);

        // Add elements to the ui group in the order they should be rendered
        this.GameOverUI.add(this.gameOverText);
    }

    setScore(score) {
        this.scoreText.text = 'Score: ' + score;
    }

    setPlayerHealth(health) {
        this.healthBarRectangle.width = health;
    }

    setWaveCounter(wave) {
        this.WaveCounter.text = 'Wave: ' + wave;
    }

    hideAll() {
        this.InGameUI.visible = false;
        this.GameOverUI.visible = false;
        this.MainMenuUI.visible = false;
    }
}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}