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
    input.add(Phaser.Keyboard.UP, function () { gameWorld.player.MoveUp(); });
    input.add(Phaser.Keyboard.DOWN, function () { gameWorld.player.MoveDown(); });
    input.add(Phaser.Keyboard.LEFT, function () { gameWorld.player.MoveLeft(); });
    input.add(Phaser.Keyboard.RIGHT, function () { gameWorld.player.MoveRight(); });
    input.add(Phaser.Keyboard.SPACEBAR, function () { gameWorld.player.Jump(); });

    //WASD
    input.add(Phaser.Keyboard.W, function () { gameWorld.player.MoveUp(); });
    input.add(Phaser.Keyboard.A, function () { gameWorld.player.MoveLeft(); });
    input.add(Phaser.Keyboard.S, function () { gameWorld.player.MoveDown(); });
    input.add(Phaser.Keyboard.D, function () { gameWorld.player.MoveRight(); });

    console.log("create complete.");
}

function update() {
    input.update();
    gameWorld.update();
}