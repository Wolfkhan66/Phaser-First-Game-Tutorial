class Player {

    constructor() {
        console.log("Player Instantiated.")
        const playerSprite = game.add.sprite(game.width / 2, game.height / 2, 'player');

        playerSprite.enableBody = true;
        playerSprite.physicsBodyType = Phaser.Physics.ARCADE;

        game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
        playerSprite.body.collideWorldBounds = true;

        playerSprite.entity = new Entity();
        this.sprite = playerSprite;
    }

    MoveUp() {
        console.log("Moving Up -->")
    }

    MoveDown() {
        console.log("Moving Down -->")
    }

    MoveLeft() {
        console.log("Moving Left <--")
    }

    MoveRight() {
        console.log("Moving Right -->")
    }

    Jump() {
        console.log("Jump!")
    }
}
