// Initialize the phaser game window, give it a width of 800 and a height of 600, set the rendering context to auto and attach the window to a div with the ID "GameWindow"
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameWindow', { preload: preload, create: create, update: update });

// Initialize variables
var platforms;
var player;

function preload() {
    // Load game assets
    game.load.image('sky', '../Content/Assets/sky.png');
    game.load.image('ground', '../Content/Assets/platform.png');
    game.load.image('star', '../Content/Assets/star.png');
    game.load.spritesheet('dude', '../Content/Assets/dude.png', 32, 48);
}

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    //  Player physics properties.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function update() {
}