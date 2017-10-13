// Initialise the phaser game window, give it a width of 800 and a height of 600, set the rendering context to auto and attach the window to a div with the ID "GameWindow"
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameWindow', { preload: preload, create: create, update: update });

function preload() {
    // Load game assets
    game.load.image('sky', '../Content/Assets/sky.png');
    game.load.image('ground', '../Content/Assets/platform.png');
    game.load.image('star', '../Content/Assets/star.png');
    game.load.spritesheet('dude', '../Content/Assets/dude.png', 32, 48);
}

function create() {
    // Create a sprite at 0,0 using the star asset
    game.add.sprite(0, 0, 'star');
}

function update() {
}