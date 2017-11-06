function main() {
    console.log("main();");

    const GAMEWIDTH = 800;
    const GAMEHEIGHT = 600;

    // Initialize the phaser game window, give it a width of GAMEWIDTH and a height of GAMEHEIGHT, set the rendering context to auto and attach the window to a div with the ID "GameWindow"
    game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'GameWindow', {
        preload: preload,
        create: create,
        update: update
    });
    game.score = 0;
    game.currentWave = 0;
    game.enemiesAlive = 0;
    game.waveActive = false;
}

function preload() {
    console.log("preload();");
    // Load game assets
    game.load.spritesheet('enemy', '../GameCore/Assets/Enemies/baddie.png', 32, 32);
    game.load.image('background', '../GameCore/Assets/Screens/background.png');
    game.load.image('SplashScreen', '../GameCore/Assets/Screens/SplashScreen.png');
    game.load.image('platform', '../GameCore/Assets/platform.png');
    game.load.image('star', '../GameCore/Assets/Collectibles/star.png');
    game.load.image('HUD', '../GameCore/Assets/HUD/HUD.png');
    game.load.image('HealthBar', '../GameCore/Assets/HUD/HealthBarLine.png');
    game.load.spritesheet('player', '../GameCore/Assets/Player/player.png', 32, 48);

    console.log("preload complete.");
}

function create() {
    console.log("create();");
    game.ActionTimer = game.time.create(false);
    // set the bounds of the game world to 1920x1080 so the world is larger than the canvas
    game.world.setBounds(0, 0, 800, 600);
    //Instantiate The GameWorld and system classes
    gameWorld = new GameWorld();
    ui = new UI();
    audio = new Audio();

    // set the build in camera to follow the player sprite and set it to platformer mode
    // game.camera.follow(gameWorld.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    SceneManager("Menu");
    console.log("create complete.");
}

function update() {
    HandleCollisions();
    gameWorld.update();
    WaveManager();
}

function resetGame() {
    gameWorld.player.ResetPlayer();
    game.score = 0;
    ui.setText("Score", "Score: " + game.score);
    game.currentWave = 0;
    game.enemiesAlive = 0;
    game.waveActive = false;
}

function SceneManager(scene) {
    ui.hideAll();
    gameWorld.cleanup();
    switch (scene) {
        case "Menu": {
            resetGame();
            ui.showUI("MainMenuUI");
            break;
        }
        case "MapSelect": {
            ui.showUI("MapSelectUI");
            break;
        }
        case "DifficultySelect": {
            ui.showUI("DifficultySelectUI");
            break;
        }
        case "GameOver": {
            ui.showUI("GameOverUI");
            break;
        }
        case "Map1": {
            resetGame();
            ui.showUI("InGameUI");
            gameWorld.player.sprite.visible = true;
            gameWorld.player.SetPlayerPosition(game.width / 2, game.height / 2);
            gameWorld.background.loadTexture('background');
            gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);
            game.currentMap = "Map1";
            break;
        }
        case "Map2": {
            resetGame();
            ui.showUI("InGameUI");
            gameWorld.player.sprite.visible = true;
            gameWorld.player.SetPlayerPosition(game.width / 2, game.height / 2);
            gameWorld.background.loadTexture('background');
            gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);
            game.currentMap = "Map2";
            break;
        }
    }
}


function WaveManager() {
    if (game.enemiesAlive == 0 && !game.waveActive) {
        game.ActionTimer.start();
        if (game.ActionTimer.seconds > 7) {
            ui.setText("WaveHelperText", "Here They Come!");
        }
        if (game.ActionTimer.seconds > 12) {
            game.currentWave++;
            game.difficulty = (game.currentWave * 5) * game.difficultyLevel;
            ui.setText("WaveCounter", "Wave: " + game.currentWave);
            ui.setText("WaveHelperText", " ");
            game.waveActive = true;
            game.ActionTimer.stop();
        }
    }
    else if (game.waveActive) {
        ui.setText("EnemyCounter", "Enemies: " + (game.difficulty + game.enemiesAlive));
        if (game.difficulty > 0) {
            if (game.enemiesAlive < 6) {
                const x = game.rnd.integerInRange(20, 780);
                const y = game.rnd.integerInRange(20, 500);
                gameWorld.enemies.createEnemy(x, y, 1, 1);
                game.enemiesAlive++;
                game.difficulty--;
            }
        }
        else if (game.enemiesAlive == 0) {
            game.waveActive = false;
            ui.setText("WaveHelperText", "Prepare Yourself!");
        }
    }
}


function HandleCollisions() {
    // These collisions make the sprites collide with one another so they may not overlap
    game.physics.arcade.collide(gameWorld.player.sprite, gameWorld.platforms.group);
    game.physics.arcade.collide(gameWorld.stars.group, gameWorld.platforms.group);
    game.physics.arcade.collide(gameWorld.enemies.group, gameWorld.platforms.group);

    // These collisions detect if sprites have overlapped and passes those sprites to a method to further handle the outcome
    game.physics.arcade.overlap(gameWorld.player.sprite, gameWorld.stars.group, CollectStar);
    game.physics.arcade.overlap(gameWorld.player.sprite, gameWorld.enemies.group, EnemyPlayerCollision);
}

function CollectStar(player, star) {
    star.kill();
    game.score += 10;
    ui.setText("Score", "Score: " + game.score);
}

function EnemyPlayerCollision(player, enemy) {

    // if the enemy is attacking
    if (enemy.attacking) {
        // remove the enemies damage value from the players health
        // reset the player health text in the ui
        // set attacking to false to stop the enemy damaging the player 60 times per second.
        player.health = (player.health - enemy.damage)
        ui.setPlayerHealth(player.health);
        enemy.attacking = false;
    }

    if (player.health <= 0) {
        gameWorld.player.Death();
    }

    if (player.attacking) {
        game.score += 10;
        ui.setText("Score", "Score: " + game.score);
        enemy.kill();
        game.enemiesAlive--;
    }
}