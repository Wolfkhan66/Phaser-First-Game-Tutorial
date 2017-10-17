class Entity {

    update() {
    }

    destroy() {
    }

    control() {

    }
}

class CollidableGroup {
    constructor(size, spriteName, initCallback) {
        const group = game.add.group();
        group.enableBody = true;
        group.physicsBodyType = Phaser.Physics.ARCADE;
        group.createMultiple(size, spriteName);
        group.forEach(initCallback);

        this.group = group;
    }

    createPlatform(x, y) {
        const sprite = this.group.getFirstExists(false);
        if (sprite) {
            sprite.reset(x, y);
        }
    }

    updateGroup() {
        this.group.forEachExists(function (sprite) {
            sprite.entity.update();
        })
    }

    destroyGroup() {
        this.group.forEachExists(function (sprite) {
            sprite.kill()
        })
    }

}