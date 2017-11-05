﻿class UI {
    constructor() {
        console.log("Constructing UI Elements")
        this.TextObjects = [];
        this.Sprites = [];

        // IN GAME UI \\
        this.createSprite('HealthBar', 'InGameUI', 24, 10, 100, 11, 'HealthBar');
        this.createSprite('HUD', 'InGameUI', 0, 0, 800, 600, 'HUD');
        this.createText('WaveCounter', 'InGameUI', 335, 8, 'Wave: 0', 35, null);
        this.createText('Score', 'InGameUI', 660, 2, 'Score: 0', 20, null);

        // MAIN MENU UI \\
        this.createSprite('SplashScreen', 'MainMenuUI', 0, 0, 800, 600, 'SplashScreen');
        this.createText('StartGameText', 'MainMenuUI', (game.width / 2) - 34, (game.height / 2) - 34, 'Click to Start', 25, function () { return SceneManager("MapSelect") });

        // MapSelectUI \\
        this.createText('Map1', 'MapSelectUI', (game.width / 3.5), (game.height / 2), 'Map 1', 25, function () { return SceneManager("Map1") });
        this.createText('Map2', 'MapSelectUI', (game.width / 3.5), (game.height / 2) + 30, 'Map 2', 25, function () { return SceneManager("Map2") });

        // GAME OVER UI \\
        this.createText('GameOver', 'GameOverUI', (game.width / 3.5), (game.height / 2) - 68, 'Game Over', 25, function () { return SceneManager("Menu") });
    }

    createText(Name, UI, x, y, string, size, event) {
        var Text = game.add.text(x, y, string, {
            font: size + 'px Old English Text MT',
            fill: '#fff'
        });
        if (event != null) {
            Text.inputEnabled = true;
            Text.events.onInputDown.add(event, this);
        }
        this.TextObjects.push({ Name: Name, UI: UI, Text: Text });
        console.log(this.TextObjects);
    }

    createSprite(Name, UI, x, y, width, height, image) {
        var Sprite = game.add.sprite(x, y, image);
        Sprite.width = width;
        Sprite.height = height;
        this.Sprites.push({ Name: Name, UI: UI, Sprite: Sprite });
    }

    showUI(UIType) {
        this.TextObjects.forEach(function (object) { if (object.UI == UIType) object.Text.visible = true; });
        this.Sprites.forEach(function (object) { if (object.UI == UIType) object.Sprite.visible = true; });
    }

    hideAll() {
        this.Sprites.forEach(object => object.Sprite.visible = false);
        this.TextObjects.forEach(object => object.Text.visible = false);
    }

    setText(name, value) {
        this.TextObjects.forEach(function (object) { if (object.Name == name) object.Text.text = value });
    }

    setPlayerHealth(health) {
        this.Sprites.forEach(function (object) { if (object.Name == "HealthBar") object.Sprite.width = health });
    }

}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}