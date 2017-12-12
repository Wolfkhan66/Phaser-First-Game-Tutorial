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
    game.gameMode = "";
    game.cameraMovingLeft = false;
    game.cameraMovingRight = false;
    game.cameraLastX = 0;
    game.countDown = 60;
}

function preload() {
    console.log("Loading Assets...");
    // Load game assets
    game.load.spritesheet('enemy', '../GameCore/Assets/Enemies/baddie.png', 32, 32);
    game.load.image('SplashScreen', '../GameCore/Assets/Screens/SplashScreen.png');
    game.load.image('star', '../GameCore/Assets/Collectibles/star.png');
    game.load.image('Paralex1', '../GameCore/Assets/Backgrounds/Paralex1.png');
    game.load.image('Paralex2', '../GameCore/Assets/Backgrounds/Paralex2.png');
    game.load.image('Paralex3', '../GameCore/Assets/Backgrounds/Paralex3.png');
    game.load.image('Paralex4', '../GameCore/Assets/Backgrounds/Paralex4.png');
    game.load.image('Paralex5', '../GameCore/Assets/Backgrounds/Paralex5.png');
    game.load.image('HUD', '../GameCore/Assets/HUD/HUD.png');
    game.load.image('LeftButton', '../GameCore/Assets/HUD/LeftButton.png');
    game.load.image('RightButton', '../GameCore/Assets/HUD/RightButton.png');
    game.load.image('AttackButton', '../GameCore/Assets/HUD/AttackButton.png');
    game.load.image('JumpButton', '../GameCore/Assets/HUD/JumpButton.png');
    game.load.image('HealthBar', '../GameCore/Assets/HUD/HealthBarLine.png');
    game.load.atlasJSONHash('player', '../GameCore/Assets/Player/player.png', '../GameCore/Assets/Player/player.json');
    game.load.atlasJSONHash('enemies', '../GameCore/Assets/Enemies/enemies.png', '../GameCore/Assets/Enemies/enemies.json');
    game.load.tilemap('map', '../GameCore/Assets/Maps/Map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('jungle tileset', '../GameCore/Assets/Maps/jungle tileset.png');

    console.log("Assets Loaded.");
}

function create() {
    console.log("Creating World...");

    game.actionTimer = game.time.create(false);
    game.enemySpawnTimer = game.time.create(false);

    // set the bounds of the game world to 1920x1080 so the world is larger than the canvas
    game.world.setBounds(0, 0, 2400, 600);
    //Instantiate The GameWorld and system classes
    gameWorld = new GameWorld();
    ui = new UI();
    audio = new Audio();

    // set the built in camera to follow the player sprite and set it to platformer mode
    game.camera.follow(gameWorld.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    sceneManager("Menu");
    console.log("Create complete.");
}

function update() {
    handleCollisions();
    gameWorld.update();
    gameManager();

    // Keep track of the cameras movements to allow paralex scrolling of the in game backgrounds
    if (game.cameraLastX > game.camera.x) {
        game.cameraMovingLeft = true;
        game.cameraMovingRight = false;
        game.cameraLastX = game.camera.x;
    } else if (game.cameraLastX < game.camera.x) {
        game.cameraMovingLeft = false;
        game.cameraMovingRight = true;
        game.cameraLastX = game.camera.x;
    }
    else if (game.cameraLastX == game.camera.x) {
        game.cameraMovingLeft = false;
        game.cameraMovingRight = false;
    }
}

function resetGame() {
    gameWorld.player.resetPlayer();
    game.score = 0;
    ui.setText("Score", "Score: " + game.score);
    ui.setText("WaveCounter", "Wave: 1");
    ui.setText("WaveHelperText", "Prepare Yourself!");
    game.currentWave = 0;
    game.enemiesAlive = 0;
    game.waveActive = false;
    game.gameMode = "";
    game.cameraMovingLeft = false;
    game.cameraMovingRight = false;
    game.cameraLastX = 0;
    game.countDown = 60;
}

function handleCollisions() {
    // These collisions make the sprites collide with one another so they may not overlap
    game.physics.arcade.collide(gameWorld.player.sprite, gameWorld.layer);
    game.physics.arcade.collide(gameWorld.enemies.group, gameWorld.layer);
    // These collisions detect if sprites have overlapped and passes those sprites to a method to further handle the outcome
    game.physics.arcade.overlap(gameWorld.player.sprite, gameWorld.enemies.group, enemyPlayerCollision);
}

function enemyPlayerCollision(player, enemy) {
    if (enemy.attacking) {
        gameWorld.player.takeDamage(enemy.damage);
        if (enemy.facingLeft) {
            player.body.velocity.x = -200;
        }
        if (enemy.facingRight) {
            player.body.velocity.x = 200;
        }
    }

    if (player.attacking) {
        enemy.health -= player.damage;
        enemy.takingDamage = true;
        if (player.facingLeft) {
            enemy.body.velocity.x = -200;
        }
        if (player.facingRight) {
            enemy.body.velocity.x = 200;
        }
    }
}

function sceneManager(scene) {
    ui.hideAll();
    gameWorld.player.sprite.visible = false;
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
        case "ModeSelect": {
            ui.showUI("ModeSelectUI");
            break;
        }
        case "GameOver": {
            resetGame();
            ui.showUI("GameOverUI");
            break;
        }
        case "Map1": {
            ui.showUI("InGameUI");
            gameWorld.player.sprite.visible = true;
            gameWorld.player.setPlayerPosition(1200, game.height / 2);
            gameWorld.createMap1();
            break;
        }
        case "Map2": {
            ui.showUI("InGameUI");
            gameWorld.player.sprite.visible = true;
            gameWorld.player.setPlayerPosition(game.width / 2, game.height / 2);
            break;
        }
    }
}

function gameManager() {
    switch (game.gameMode) {
        case "Classic": {
            classic();
            break;
        }
        case "Survival": {
            survival();
            break;
        }
        case "TimeAttack": {
            ui.showUI("TimeAttackUI");
            timeAttack();
            break;
        }
    }
}

function waveCooldown() {
    game.actionTimer.start();
    if (game.actionTimer.seconds > 7) {
        ui.setText("WaveHelperText", "Here They Come!");
    }
    if (game.actionTimer.seconds > 12) {
        game.currentWave++;
        game.difficulty = (game.currentWave * 5) * game.difficultyLevel;
        ui.setText("WaveCounter", "Wave: " + game.currentWave);
        ui.setText("WaveHelperText", " ");
        game.waveActive = true;
        game.actionTimer.stop();
    }
}

function classic() {
    if (game.enemiesAlive == 0 && !game.waveActive) {
        waveCooldown();
    }
    else if (game.waveActive) {
        ui.setText("EnemyCounter", "Enemies: " + (game.enemiesAlive));
        if (game.difficulty > 0) {
            if (game.enemiesAlive < 10) {
                gameWorld.createEnemy();
            }
        }
        else if (game.enemiesAlive == 0) {
            game.waveActive = false;
            ui.setText("WaveHelperText", "Prepare Yourself!");
        }
    }
}

function survival() {
    ui.setText("EnemyCounter", "");
    if (game.enemiesAlive == 0 && !game.waveActive) {
        waveCooldown();
    }
    else if (game.waveActive) {
        if (game.enemiesAlive < 10) {
            gameWorld.createEnemy();
        }
    }
}

function timeAttack() {
    ui.setText("EnemyCounter", "");
    if (game.enemiesAlive == 0 && !game.waveActive) {
        ui.setText("Timer", Math.floor(game.countDown));
        waveCooldown();
    }
    else if (game.waveActive) {
        game.countDown = game.countDown - (1 / 60);
        ui.setText("Timer", Math.floor(game.countDown));
        if (game.enemiesAlive < 10) {
            gameWorld.createEnemy();
        }
    }
    if (game.countDown <= 0) {
        gameWorld.player.death();
    }
}