class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = game.add.sprite(0, 0, 'background');
        this.player = new Player();

        this.platforms = new CollidableGroup(1, 'platform', platformFactory);
        this.stars = new CollidableGroup(5, 'star', starFactory);
        this.enemies = new CollidableGroup(10, 'enemy', enemyFactory);
        console.log("GameWorld Instantiated.");
    }

    update() {
        this.player.update();
        this.enemies.updateGroup();
        this.stars.updateGroup();
    }

    cleanup() {
        this.platforms.destroyGroup();
        this.stars.destroyGroup();
        this.enemies.destroyGroup();
    }
}

function platformFactory(sprite) {
    sprite.entity = new Entity();
}

function starFactory(sprite) {
    sprite.entity = new Entity();
    sprite.entity.addControl(followPlayerControl);
}

function enemyFactory(sprite) {
    sprite.entity = new Entity();
    sprite.entity.addControl(followPlayerControl);
    sprite.entity.addControl(jumpAttackControl);
};