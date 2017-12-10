class UI {
    constructor() {
        console.log("Constructing UI Elements")
        this.textObjects = [];
        this.sprites = [];

        // InGameUI \\
        this.createSprite('HealthBar', 'InGameUI', 24, 10, 100, 11, 'HealthBar');
        this.createSprite('HUD', 'InGameUI', 0, 0, 800, 600, 'HUD');
        this.createText('WaveCounter', 'InGameUI', 335, 8, 'Wave: 0', 35, null);
        this.createText('EnemyCounter', 'InGameUI', 355, 50, 'Enemies: ', 20, null);
        this.createText('WaveHelperText', 'InGameUI', 270, (game.height / 2) - 100, 'Prepare Yourself!', 40, null);
        this.createText('Score', 'InGameUI', 660, 2, 'Score: 0', 20, null);
        
        // MainMenuUI \\
        this.createSprite('SplashScreen', 'MainMenuUI', 0, 0, 800, 600, 'SplashScreen');
        this.createText('NewGameText', 'MainMenuUI', (game.width / 2) - 34, (game.height / 2), 'New Game', 25, function () { return sceneManager("DifficultySelect") });
        this.createText('SplashText', 'MainMenuUI', (game.width / 5), (game.height / 6) , 'InExile', 150, function () { return sceneManager("DifficultySelect") });

        // DifficultySelectUI \\
        this.createSprite('SplashScreen', 'DifficultySelectUI', 0, 0, 800, 600, 'SplashScreen');
        this.createText('Easy', 'DifficultySelectUI', (game.width / 2) - 34, (game.height / 2), 'Easy', 25, function () { game.difficultyLevel = 1; return sceneManager("MapSelect"); });
        this.createText('Normal', 'DifficultySelectUI', (game.width / 2) - 34, (game.height / 2) + 30, 'Normal', 25, function () { game.difficultyLevel = 2; return sceneManager("MapSelect"); });
        this.createText('Hard', 'DifficultySelectUI', (game.width / 2) - 34, (game.height / 2) + 60, 'Hard', 25, function () { game.difficultyLevel = 3; return sceneManager("MapSelect"); });
        this.createText('BackFromDifficultySelect', 'DifficultySelectUI', (game.width / 2) - 34, (game.height / 2) + 120, 'Back', 25, function () { return sceneManager("Menu"); });

        // MapSelectUI \\
        this.createSprite('SplashScreen', 'MapSelectUI', 0, 0, 800, 600, 'SplashScreen');
        this.createText('Map1', 'MapSelectUI', (game.width / 2) - 34, (game.height / 2), 'Map 1', 25, function () { return sceneManager("Map1") });
        this.createText('Map2', 'MapSelectUI', (game.width / 2) - 34, (game.height / 2) + 30, 'Map 2', 25, function () { return sceneManager("Map2") });
        this.createText('BackFromMapSelect', 'MapSelectUI', (game.width / 2) - 34, (game.height / 2) + 90, 'Back', 25, function () { return sceneManager("DifficultySelect") });

        // GameOverUI \\
        this.createSprite('SplashScreen', 'GameOverUI', 0, 0, 800, 600, 'SplashScreen');
        this.createText('GameOver', 'GameOverUI', (game.width / 5), (game.height / 4), 'Game Over', 100, function () {});
        this.createText('TryAgain?', 'GameOverUI', (game.width / 2) - 44, (game.height / 2), 'Try Again?', 25, function () { return sceneManager("DifficultySelect") });
    }

    createText(Name, UI, x, y, string, size, event) {
        var textObject = game.add.text(0, 0, string, {
            font: size + 'px Old English Text MT',
            fill: '#fff'
        });
        if (event != null) {
            textObject.inputEnabled = true;
            textObject.events.onInputDown.add(event, this);
        }
        textObject.fixedToCamera = true;
        textObject.cameraOffset.setTo(x, y);
        this.textObjects.push({ Name: Name, UI: UI, Text: textObject });
    }

    createSprite(Name, UI, x, y, width, height, image) {
        var sprite = game.add.sprite(0, 0, image);
        sprite.width = width;
        sprite.height = height;
        sprite.fixedToCamera = true;
        sprite.cameraOffset.setTo(x, y);
        this.sprites.push({ Name: Name, UI: UI, Sprite: sprite });
    }

    showUI(UIType) {
        this.textObjects.forEach(function (object) { if (object.UI == UIType) object.Text.visible = true; });
        this.sprites.forEach(function (object) { if (object.UI == UIType) object.Sprite.visible = true; });
    }

    hideAll() {
        this.sprites.forEach(object => object.Sprite.visible = false);
        this.textObjects.forEach(object => object.Text.visible = false);
    }

    setText(name, value) {
        this.textObjects.forEach(function (object) { if (object.Name == name) object.Text.text = value });
    }

    setPlayerHealth(health) {
        this.sprites.forEach(function (object) { if (object.Name == "HealthBar") object.Sprite.width = health });
    }

}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}