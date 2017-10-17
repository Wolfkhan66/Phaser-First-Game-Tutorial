class Player {

    constructor() {
        console.log("Player Instantiated.")
        const playerSprite = game.add.sprite(game.width / 2, game.height / 2, 'player');

        playerSprite.enableBody = true;
        playerSprite.physicsBodyType = Phaser.Physics.ARCADE;

        game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
        playerSprite.body.bounce.y = 0.1;
        playerSprite.body.gravity.y = 500;
        playerSprite.body.collideWorldBounds = true;

        playerSprite.animations.add('left', [0, 1, 2, 3], 10, true);
        playerSprite.animations.add('right', [5, 6, 7, 8], 10, true);

        playerSprite.entity = new Entity();

        playerSprite.entity.update = function () {
            playerSprite.body.velocity.x = 0;
            input.update();
            gameWorld.player.StopMoving();
        };

        this.sprite = playerSprite;
    }

    MoveLeft() {
        console.log("Moving Left <--")
        this.sprite.body.velocity.x = -150;
        this.sprite.animations.play('left');
    }

    MoveRight() {
        console.log("Moving Right -->")
        this.sprite.body.velocity.x = 150;
        this.sprite.animations.play('right');
    }

    Jump() {
        console.log("Jump!")
        if (this.sprite.body.y > 400) {
            this.sprite.body.velocity.y = -400;
        }
    }

    StopMoving() {
        if (this.sprite.body.velocity.x == 0) {
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }
    }
}
