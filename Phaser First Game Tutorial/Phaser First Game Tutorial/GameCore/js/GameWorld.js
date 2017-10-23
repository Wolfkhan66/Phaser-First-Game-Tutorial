class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
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
    sprite.timer = game.time.create(false);
    sprite.damage = 5;
    sprite.attacking = false;
    sprite.cooldown = false;
    sprite.anchor.setTo(0.5, 0.5);
    sprite.animations.add('right', [2, 3], 10, true);
    sprite.animations.add('left', [0, 1], 10, true);
    sprite.entity = new Entity();

    sprite.entity.update = function () {
        if (sprite.cooldown == true && sprite.timer.seconds > 2) {
            sprite.cooldown = false;
            sprite.attacking = false;
            sprite.timer.stop();
        }
        else if (sprite.attacking == true && sprite.timer.seconds > 0.5){
            sprite.body.velocity.x = 0;
        }
        else if (sprite.attacking == false) {
            if (gameWorld.player.sprite.x > sprite.x) {
                if (gameWorld.player.sprite.x - 40 < sprite.x) {
                    sprite.body.velocity.x = 0;
                    sprite.timer.start();
                    sprite.animations.stop();
                    // Pause and attack
                    if (sprite.timer.seconds > 1.5) {
                        sprite.timer.stop();
                        console.log("Attacking Right!")
                        sprite.entity.control("attack right");
                        sprite.attacking = true;
                        sprite.timer.start();
                    }
                }
                else {
                    sprite.timer.stop();
                    sprite.body.velocity.x = +50;
                    sprite.animations.play('right');
                }
            }
            else {
                if (gameWorld.player.sprite.x + 40 > sprite.x) {
                    sprite.body.velocity.x = 0;
                    sprite.timer.start();
                    sprite.animations.stop();
                    // Pause and attack
                    if (sprite.timer.seconds > 1.5) {
                        console.log("Attacking Left!")
                        sprite.entity.control("attack left");
                        sprite.attacking = true;
                        sprite.timer.start();
                    }
                }
                else {
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
                // Attack
                sprite.body.velocity.y = -80;
                sprite.body.velocity.x = -200;
                sprite.timer.stop();
                break;
            case "attack right":
                // Attack
                sprite.body.velocity.y = -80;
                sprite.body.velocity.x = +200;
                sprite.timer.stop();
                break;
            default:
                break;
        }
    }

};