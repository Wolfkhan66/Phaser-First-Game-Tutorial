class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
        this.player = new Player();

        this.platforms = new CollidableGroup(1, 'platform', PlatformFactory);
        this.stars = new CollidableGroup(5, 'star', StarFactory);
        this.enemies = new CollidableGroup(500, 'enemy', EnemyFactory);
        console.log("GameWorld Instantiated.");
    }

    update() {
        this.player.HandleInput();
        this.enemies.updateGroup();
        this.stars.updateGroup();
    }

    cleanup() {
        this.platforms.destroyGroup();
        this.stars.destroyGroup();
    }
}

function PlatformFactory(sprite) {
    sprite.entity = new Entity();
}

function StarFactory(sprite) {
    sprite.following = true;
    sprite.speed = 50;
    sprite.entity = new Entity();
    sprite.entity.addControl(FollowPlayer);
}

function EnemyFactory(sprite) {
    sprite.anchor.setTo(0.5, 0.5);
    sprite.animations.add('right', [2, 3], 10, true);
    sprite.animations.add('left', [0, 1], 10, true);

    sprite.timer = game.time.create(false);
    sprite.range = 40;
    sprite.speed = 50;
    sprite.damage = 5;
    sprite.attacking = false;
    sprite.cooldown = false;
    sprite.inRange = false;
    sprite.chargingAttack = false;
    sprite.following = true;

    sprite.entity = new Entity();
    sprite.entity.addControl(FollowPlayer);
    sprite.entity.addControl(JumpAttackControl);
};