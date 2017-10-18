class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
        this.background.height = 1080;
        this.background.width = 1920;
        this.player = new Player();

        this.platforms = new CollidableGroup(51, 'platform', PlatformFactory);
        this.stars = new CollidableGroup(50, 'star', StarFactory);
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