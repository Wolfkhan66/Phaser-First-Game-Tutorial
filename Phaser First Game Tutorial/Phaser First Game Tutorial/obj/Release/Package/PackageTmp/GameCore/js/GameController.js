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
    game.load.spritesheet('enemy', '../GameCore/Assets/baddie.png', 32, 32);
    game.load.image('background', '../GameCore/Assets/background.png');
    game.load.image('platform', '../GameCore/Assets/platform.png');
    game.load.image('star', '../GameCore/Assets/star.png');
    game.load.image('SplashScreen', '../GameCore/Assets/SplashScreen.png');
    game.load.spritesheet('player', '../GameCore/Assets/player.png', 32, 48);
    console.log("preload complete.");
}

function create() {
    console.log("create();");
    // set the bounds of the game world to 1920x1080 so the world is larger than the canvas
    game.world.setBounds(0, 0, 800, 600);
    //Instantiate The GameWorld and system classes
    gameWorld = new GameWorld();
    ui = new UI();
    audio = new Audio();

    // set the build in camera to follow the player sprite and set it to platformer mode
    game.camera.follow(gameWorld.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    SceneManager("Menu");
    console.log("create complete.");
}

function update() {
    game.debug.geom(ui.playerHealthBar, '#00ff00');
    HandleCollisions();
    gameWorld.update();
    WaveManager(game.currentMap, game.currentWave);
}

function resetGame() {
    gameWorld.player.ResetPlayer();
    game.score = 0;
    ui.setScore(game.score);
}

function SceneManager(scene) {
    ui.hideAll();
    gameWorld.cleanup();
    switch (scene) {
        case "Menu": {
            resetGame();
            gameWorld.player.SetPlayerPosition(game.width / 2, game.height / 2);
            gameWorld.background.loadTexture('SplashScreen');
            ui.newGameText.visible = true;
            gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);
            break;
        }
        case "GameOver": {
            gameWorld.background.loadTexture('GameOverScreen');
            gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);
            ui.gameOverText.visible = true;
            break;
        }
        case "Map1": {
            gameWorld.player.SetPlayerPosition(game.width / 2, game.height / 2);
            gameWorld.background.loadTexture('background');
            gameWorld.platforms.createPlatform(0, 600 - 64, 2, 2);
            ui.scoreText.visible = true;
            ui.playerHealth.visible = true;
            ui.playerHealthBar.visible = true;
            game.enemiesAlive = 0;
            game.currentWave = 0;
            game.currentMap = "Map1";
            game.waveActive = false;
            break;
        }
        case "Map2": {
            gameWorld = new GameWorld();
            break;
        }
    }
}

function WaveManager(Map, Wave) {
    switch (Map) {
        case "Map1": {
            switch (Wave) {
                case 0: {
                    game.debug.text("Time until event: " + Math.trunc(game.time.events.duration / 1000), 32, 32);

                    game.time.events.add(Phaser.Timer.SECOND * 5, function () { game.currentWave++; }, this);
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
                            const x = game.rnd.integerInRange(0, 800);
                            const y = game.rnd.integerInRange(0, 600);
                            gameWorld.enemies.createEnemy(50, 50, 1, 1);
                            game.enemiesAlive++;
                            //gameWorld.enemies.createEnemy(gameWorld.player.sprite.body.x + 50, gameWorld.player.sprite.body.y + 50, 1, 1);
                        }
                        game.waveActive = true;
                    } else {
                        if (game.enemiesAlive == 0) { game.waveAction = false; game.currentWave++; }
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
    ui.setScore(game.score);
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