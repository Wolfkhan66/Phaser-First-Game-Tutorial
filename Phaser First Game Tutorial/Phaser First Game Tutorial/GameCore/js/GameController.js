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
    game.load.image('platform', '../GameCore/Assets/platform.png');
    game.load.image('star', '../GameCore/Assets/star.png');
    game.load.image('background', '../GameCore/Assets/background.png');
    game.load.spritesheet('player', '../GameCore/Assets/player.png', 32, 48);
    console.log("preload complete.");
}

function create() {
    console.log("create();");
    // set the bounds of the game world to 1920x1080 so the world is larger than the canvas
    game.world.setBounds(0, 0, 1920, 1080);
    //Instantiate The GameWorld and system classes
    gameWorld = new GameWorld();
    ui = new UI();
    audio = new Audio();

    // set the build in camera to follow the player sprite and set it to platformer mode
    game.camera.follow(gameWorld.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    // Call asset create methods
    CreatePlatforms();
    CreateCollectibles();
    CreateEnemies();
    console.log("create complete.");
}

function update() {
    HandleCollisions();
    gameWorld.update();
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

function CreatePlatforms() {
    // Create the floor of the world
    gameWorld.platforms.createPlatform(0, 1080 - 64, 6, 2);

    //for (var i = 0; i < 50; i++) {
    //    const x = game.rnd.integerInRange(100, 1920);
    //    const y = game.rnd.integerInRange(100, 1080);
    //    gameWorld.platforms.createPlatform(x, y, 0.5, 0.5);
    //}

}

function CreateCollectibles() {
    //for (var i = 0; i < 50; i++) {
    //    const x = game.rnd.integerInRange(100, 1920);
    //    const y = game.rnd.integerInRange(100, 1080);
    //    //  Create a star inside of the 'stars' group
    //    gameWorld.stars.createStar(x, y, 1, 1);
    //}
}

function CreateEnemies() {
    for (var i = 0; i < 3; i++) {
        const x = game.rnd.integerInRange(100, 1920);
        const y = game.rnd.integerInRange(100, 1080);
        //  Create a star inside of the 'stars' group
        gameWorld.enemies.createEnemy(x, y, 1, 1);
        //gameWorld.enemies.createEnemy(gameWorld.player.sprite.body.x + 50, gameWorld.player.sprite.body.y + 50, 1, 1);
    }
}

function CollectStar(player, star) {
    star.kill();
    game.score += 10;
    ui.setScore(game.score);
}

function HitPlayer(player, enemy) {
    // if the enemy is attacking and is not yet on cooldown
    if (enemy.attacking == true && enemy.cooldown == false) {
        // remove the enemies damage value from the players health
        // reset the player health text in the ui
        // set the enemy to be on cooldown to stop the enemy damaging the player 60 times per second while attack is true.
        player.health = (player.health - enemy.damage)
        ui.setPlayerHealth(player.health);
        enemy.cooldown = true;
    }
}