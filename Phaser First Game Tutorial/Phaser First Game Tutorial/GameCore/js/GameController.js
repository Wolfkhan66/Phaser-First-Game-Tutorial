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
    WaveManager(game.currentMap, game.currentWave);
}

function resetGame() {
    gameWorld.player.ResetPlayer();
    game.score = 0;
    ui.setText("Score", "Score: " + game.score);
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
        case "GameOver": {
            ui.showUI("GameOverUI");
            break;
        }
        case "Map1": {
            ui.showUI("InGameUI");
            gameWorld.player.sprite.visible = true;
            gameWorld.player.SetPlayerPosition(game.width / 2, game.height / 2);
            gameWorld.background.loadTexture('background');
            gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);
            game.enemiesAlive = 0;
            game.currentWave = 0;
            game.currentMap = "Map1";
            game.waveActive = false;
            break;
        }
        case "Map2": {
            ui.showUI("InGameUI");
            gameWorld.player.sprite.visible = true;
            gameWorld.player.SetPlayerPosition(game.width / 2, game.height / 2);
            gameWorld.background.loadTexture('background');
            gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);
            game.enemiesAlive = 0;
            game.currentWave = 0;
            game.currentMap = "Map2";
            game.waveActive = false;
            break;
        }
    }
}


function WaveManager(Map, Wave) {
    switch (Map) {
        case "Map1": {
            switch (Wave) {
                case 0: {
                    game.ActionTimer.start();
                    console.log(game.ActionTimer.seconds);
                    if (game.ActionTimer.seconds > 5) {
                        game.ActionTimer.stop();
                        game.currentWave++;
                        ui.setText("WaveCounter" , "Wave: " + game.currentWave);
                    }
                    break;
                }
                case 1: {
                    if (game.waveActive == false) {
                        gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);

                        for (var i = 0; i < 5; i++) {
                            const x = game.rnd.integerInRange(0, 800);
                            const y = game.rnd.integerInRange(0, 500);
                            gameWorld.stars.createStar(x, y, 1, 1);
                        }

                        for (var i = 0; i < 1; i++) {
                            const x = game.rnd.integerInRange(20, 780);
                            const y = game.rnd.integerInRange(20, 500);
                            gameWorld.enemies.createEnemy(x, y, 1, 1);
                            game.enemiesAlive++;
                        }
                        game.waveActive = true;
                    } else {
                        if (game.enemiesAlive == 0) {
                            game.waveActive = false;
                            game.currentWave++;
                            ui.setWaveCounter(game.currentWave);
                        }
                    }
                    break;
                }
                  
            }
            break;
        } case "Map2": {
            switch (Wave) {
                case 0: {
                    game.ActionTimer.start();
                    console.log(game.ActionTimer.seconds);
                    if (game.ActionTimer.seconds > 5) {
                        game.ActionTimer.stop();
                        game.currentWave++;
                        ui.setText("WaveCounter", "Wave: " + game.currentWave);
                    }
                    break;
                }
                case 1: {
                    if (game.waveActive == false) {
                        gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);

                        for (var i = 0; i < 1; i++) {
                            const x = game.rnd.integerInRange(0, 800);
                            const y = game.rnd.integerInRange(0, 500);
                            gameWorld.stars.createStar(x, y, 1, 1);
                        }

                        for (var i = 0; i < 5; i++) {
                            const x = game.rnd.integerInRange(20, 780);
                            const y = game.rnd.integerInRange(20, 500);
                            gameWorld.enemies.createEnemy(x, y, 1, 1);
                            game.enemiesAlive++;
                        }
                        game.waveActive = true;
                    } else {
                        if (game.enemiesAlive == 0) {
                            game.waveActive = false;
                            game.currentWave++;
                            ui.setWaveCounter(game.currentWave);
                        }
                    }
                    break;
                }

            }
            break;
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
    game.physics.arcade.overlap(gameWorld.player.sprite, gameWorld.enemies.group, HitPlayer);
}

function CollectStar(player, star) {
    star.kill();
    game.score += 10;
    ui.setText("Score", "Score: " + game.score);
}

function HitPlayer(player, enemy) {

    // if the enemy is attacking
    if (enemy.attacking) {
        // remove the enemies damage value from the players health
        // reset the player health text in the ui
        // set attacking to false to stop the enemy damaging the player 60 times per second.
        player.health = (player.health - enemy.damage)
        ui.setPlayerHealth(player.health);
        enemy.attacking = false;
        console.log("Collision with player detected")
    }

    if (player.health <= 0) {
        gameWorld.player.Death();
    }
}