class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
        // resize test background to fill the world bounds
        this.background.height = 1080;
        this.background.width = 1920;
        this.player = new Player();

        this.platforms = new CollidableGroup(1, 'platform', PlatformFactory);
        this.stars = new CollidableGroup(1, 'star', StarFactory);
        this.enemies = new CollidableGroup(3, 'enemy', EnemyFactory);
        console.log("GameWorld Instantiated.");
    }

    update() {
        this.player.HandleInput();
        this.enemies.updateGroup();
    }

    cleanup() {
        this.platforms.destroyGroup();
        this.stars.destroyGroup();
    }
}

function PlatformFactory(sprite) {
    sprite.entity = new Entity();
    sprite.entity.update = function () {
    };
}

function StarFactory(sprite) {
    sprite.entity = new Entity();
    sprite.entity.update = function () {
    };
}

function EnemyFactory(sprite) {
    sprite.anchor.setTo(0.5, 0.5);
    sprite.animations.add('right', [2, 3], 10, true);
    sprite.animations.add('left', [0, 1], 10, true);
    sprite.timer = game.time.create(false);
    sprite.damage = 5;
    sprite.attacking = false;
    sprite.cooldown = false;
    sprite.entity = new Entity();

    sprite.entity.update = function () {

        // if the sprite is on cooldown and the sprite action timer has reached 2 seconds
        if (sprite.cooldown == true && sprite.timer.seconds > 2) {
            // reset the sprite, set cooldown and attacking to false and stop the action timer. 
            sprite.cooldown = false;
            sprite.attacking = false;
            sprite.timer.stop();
        }
        // if the sprite is attacking and the action timer has reached .5 of a second
        else if (sprite.attacking == true && sprite.timer.seconds > 0.5) {
            // set x velocity to 0. This allows the sprite to simulate a moving attack for a split second.
            sprite.body.velocity.x = 0;
        }
        // If the sprite isn't attacking
        else if (sprite.attacking == false) {
            // if the player sprite x coordinate is higher than this sprites x coordinate
            if (gameWorld.player.sprite.x > sprite.x) {
                // if the player sprite x - 40 is less than this sprites x
                if (gameWorld.player.sprite.x - 40 < sprite.x) {
                    // stop moving, start the action timer and stop animations to appear paused
                    sprite.body.velocity.x = 0;
                    sprite.timer.start();
                    sprite.animations.stop();
                    // if the action timer has reached 1.5 seconds
                    if (sprite.timer.seconds > 1.5) {
                        // call the attack right control
                        // set attacking to true and reset the action timer.
                        console.log("Attacking Right!")
                        sprite.entity.control("attack right");
                        sprite.attacking = true;
                        sprite.timer.stop();
                        sprite.timer.start();
                    }
                }
                else {
                    // Stop sprite action timer and raise x velocity to move to the right
                    sprite.timer.stop();
                    sprite.body.velocity.x = +50;
                    sprite.animations.play('right');
                }
            }
            else {
                // if the player sprite x coordinate plus 40 is greater than this sprites x coordinate
                if (gameWorld.player.sprite.x + 40 > sprite.x) {
                    // stop moving, start the action timer and stop animations to appear paused
                    sprite.body.velocity.x = 0;
                    sprite.timer.start();
                    sprite.animations.stop();
                    // if the action timer has reached 1.5 seconds
                    if (sprite.timer.seconds > 1.5) {
                        // call the attack left control
                        // set attacking to true and reset the action timer.
                        console.log("Attacking Left!")
                        sprite.entity.control("attack left");
                        sprite.attacking = true;
                        sprite.timer.stop();
                        sprite.timer.start();
                    }
                }
                else {
                    // Stop sprite action timer and lower x velocity to move to the left
                    sprite.timer.stop();
                    sprite.body.velocity.x = -50;
                    sprite.animations.play('left');
                }
            }

        }
    }

    sprite.entity.control = function (action) {
        switch (action) {
            case "attack left":
                // lower sprite y velocity a little to make them jump
                // combine with lowering x velocity to make the sprite jump to the left
                sprite.body.velocity.y = -80;
                sprite.body.velocity.x = -200;
                break;
            case "attack right":
                // lower sprite y velocity a little to make them jump
                // combine with raising x velocity to make the sprite jump to the right
                sprite.body.velocity.y = -80;
                sprite.body.velocity.x = +200;
                break;
            default:
                break;
        }
    }

};