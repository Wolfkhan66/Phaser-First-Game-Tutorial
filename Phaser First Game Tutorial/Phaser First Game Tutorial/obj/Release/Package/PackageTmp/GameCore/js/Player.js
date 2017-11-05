class Player {

    constructor() {
        console.log("Player Instantiated.")
        const playerSprite = game.add.sprite(0,0, 'player');
        game.physics.arcade.enable(playerSprite);
        playerSprite.anchor.setTo(0.5, 0.5);
        playerSprite.body.gravity.y = 400;
        playerSprite.body.collideWorldBounds = true;
        playerSprite.animations.add('left', [0, 1, 2, 3], 10, true);
        playerSprite.animations.add('right', [5, 6, 7, 8], 10, true);
        playerSprite.health = 10;
        playerSprite.attacking = false;
        playerSprite.timer = game.time.create(false);

        this.sprite = playerSprite;
    }

    SetPlayerPosition(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    ResetPlayer() {
        this.sprite.health = 10;
        ui.setPlayerHealth(this.sprite.health);
    }

    HandleInput() {
        var cursors = game.input.keyboard.createCursorKeys();

        this.sprite.body.velocity.x = 0;
        if (cursors.left.isDown) {
            this.MoveLeft();
        }
        else if (cursors.right.isDown) {
            this.MoveRight();
        }
        else {
            this.StopMoving();
        }

        if (cursors.up.isDown && this.sprite.body.touching.down) {
            this.Jump();
        }
    }

    Death() {
        SceneManager("GameOver");
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
        this.sprite.body.velocity.y = -400;
    }

    StopMoving() {
        this.sprite.animations.stop();
        this.sprite.frame = 4;
    }
}
