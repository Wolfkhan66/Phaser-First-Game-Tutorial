class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
        this.player = new Player();

        this.platforms = new CollidableGroup(3, 'platform', PlatformFactory);
        this.stars = new CollidableGroup(12, 'star', StarFactory);
        console.log("GameWorld Instantiated.");
    }

    update() {
        this.player.HandleInput();
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