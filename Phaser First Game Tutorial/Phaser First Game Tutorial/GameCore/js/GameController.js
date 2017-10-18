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
}

function preload() {
    console.log("preload();");
    // Load game assets
    game.load.image('platform', '../GameCore/Assets/platform.png');
    game.load.image('background', '../GameCore/Assets/background.png');
    game.load.spritesheet('player', '../GameCore/Assets/player.png', 32, 48);
    console.log("preload complete.");
}

function create() {
    console.log("create();");
    //Instantiate The GameWorld and system classes
    gameWorld = new GameWorld();
    ui = new UI();
    audio = new Audio();
    CreatePlatforms();
    console.log("create complete.");
}

function update() {
    HandleCollisions();
    gameWorld.update();
}

function HandleCollisions() {
    game.physics.arcade.collide(gameWorld.player.sprite, gameWorld.platforms.group);
}

function CreatePlatforms()
{
    gameWorld.platforms.createPlatform(0, game.world.height - 64, 2, 2, 'platform');
    gameWorld.platforms.createPlatform(400, 400, 1, 1, 'platform');
    gameWorld.platforms.createPlatform(-150, 250, 1, 1, 'platform');
}