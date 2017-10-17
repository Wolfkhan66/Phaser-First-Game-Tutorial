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
    game.load.image('platform', '../GameCore/Assets/platform.png');
    game.load.image('background', '../GameCore/Assets/background.png');
    game.load.spritesheet('player', '../GameCore/Assets/player.png', 32, 48);

    console.log("preload complete.");
}

function create() {
    console.log("create();");

    //Instantiate The GameWorld and system classes
    gameWorld = new GameWorld();
    input = new Input();
    ui = new UI();
    audio = new Audio();

    //Arrow Keys
    input.add(Phaser.Keyboard.LEFT, function () { gameWorld.player.MoveLeft(); });
    input.add(Phaser.Keyboard.RIGHT, function () { gameWorld.player.MoveRight(); });
    input.add(Phaser.Keyboard.SPACEBAR, function () { gameWorld.player.Jump(); });
    input.add(Phaser.Keyboard.UP, function () { gameWorld.player.Jump(); });

    createPlatforms();

    console.log("create complete.");
}

function update() {
    gameWorld.update();
}

function createPlatforms() {
    console.log("Creating Platforms");
    gameWorld.createPlatform(0, game.world.height - 64);
    gameWorld.createPlatform(400, 400);
    gameWorld.createPlatform(-150, 250);
}