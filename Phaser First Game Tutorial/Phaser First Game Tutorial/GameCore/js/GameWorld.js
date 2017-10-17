class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
        this.player = new Player();

        console.log("GameWorld Instantiated.")
    }

    update() {
    }

    cleanup() {
    }
}