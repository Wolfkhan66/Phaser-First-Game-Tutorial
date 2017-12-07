﻿class Player {

    constructor() {
        console.log("Player Instantiated.")
        const playerSprite = game.add.sprite(0, 0, 'player');
        game.physics.arcade.enable(playerSprite);
        playerSprite.anchor.setTo(0.5, 0.5);
        playerSprite.body.gravity.y = 500;
        playerSprite.body.collideWorldBounds = true;
        playerSprite.animations.add('left', [0, 1, 2, 3], 10, true);
        playerSprite.animations.add('right', [5, 6, 7, 8], 10, true);
        playerSprite.health = 100;
        playerSprite.damage = 2;
        playerSprite.attacking = false;
        playerSprite.facingLeft = true;
        playerSprite.facingRight = false;
        playerSprite.timer = game.time.create(false);
        playerSprite.visible = false;

        this.sprite = playerSprite;

        var attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); attackButton.onDown.add(this.attack, this);
        var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP); jumpButton.onDown.add(this.jump, this);
   }

    setPlayerPosition(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    resetPlayer() {
        this.sprite.visible = false;
        this.sprite.health = 100;
        ui.setPlayerHealth(this.sprite.health);
    }

    handleInput() {
        var cursors = game.input.keyboard.createCursorKeys();

        this.sprite.body.velocity.x -= this.sprite.body.velocity.x / 15;

        if (this.sprite.attacking && this.sprite.timer.seconds > 0.4) {
            this.sprite.attacking = false;
            this.sprite.timer.stop();
        }

        if (!this.sprite.attacking && cursors.left.isDown) {
            this.moveLeft();
        }
        else if (!this.sprite.attacking && cursors.right.isDown) {
            this.moveRight();
        }
        else if (!this.sprite.attacking){
            this.stopMoving();
        }
    }

    death() {
        sceneManager("GameOver");
    }

    moveLeft() {
        this.sprite.attacking = false;
        console.log("Moving Left <--")
        this.sprite.body.velocity.x = -150;
        this.sprite.animations.play('left');
        this.sprite.facingRight = false;
        this.sprite.facingLeft = true;
    }

    moveRight() {
        this.sprite.attacking = false;
        console.log("Moving Right -->")
        this.sprite.body.velocity.x = 150;
        this.sprite.animations.play('right');
        this.sprite.facingRight = true;
        this.sprite.facingLeft = false;
    }

    attack() {
        console.log("Test Attack");
        this.sprite.timer.start();
        this.sprite.attacking = true;
        this.sprite.body.velocity.y = -50;
        if (this.sprite.facingLeft) {
            this.sprite.body.velocity.x = -200;
        }
        else if (this.sprite.facingRight) {
            this.sprite.body.velocity.x = 200;
        }
    }

    jump() {
        console.log("Jump!")
        this.sprite.body.velocity.y = -300;
    }

    stopMoving() {
        this.sprite.animations.stop();
        if (this.sprite.FacingLeft) {
            this.sprite.frame = 3;
        }
        if (this.sprite.FacingRight) {
            this.sprite.frame = 5;
        }
    }
}
