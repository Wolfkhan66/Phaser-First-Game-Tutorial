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
        group.createMultiple(size, spriteName);
        group.forEach(initCallback);

        this.group = group;
    }

    createPlatform(x, y, scaleX, scaleY, sprite) {
        const platform = this.group.getFirstExists(false);
        if (platform) {
            platform.reset(x, y);
            platform.scale.setTo(scaleX, scaleY);
            platform.body.immovable = true;
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