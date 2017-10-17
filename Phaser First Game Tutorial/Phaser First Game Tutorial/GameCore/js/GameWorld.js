class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
        this.player = new Player();

        this.platforms = new CollidableGroup(5, 'platform', platformFactory)

        console.log("GameWorld Instantiated.")
    }

    update() {
        this.player.sprite.entity.update();
        this.platforms.updateGroup();
    }

    cleanup() {
    }

    createPlatform(x, y) {
        console.log("GameWorld::createPlatform:"+ x + y)
        this.platforms.createPlatform(x, y);
    }
}

function platformFactory(sprite) {
    sprite.body.immovable = true;
    sprite.entity = new Entity();
    sprite.entity.update = function () {
    };
}