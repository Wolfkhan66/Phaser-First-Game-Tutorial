class Entity {
    update() { }

    destroy() { }

    control() { }
}

class CollidableGroup {
    constructor(size, spriteName, initCallback) {
        const group = game.add.group();
        group.enableBody = true;
        group.createMultiple(size, spriteName);
        group.forEach(initCallback);

        this.group = group;
    }

    createPlatform(x, y, scaleX, scaleY) {
        const platform = this.group.getFirstExists(false);
        if (platform) {
            platform.reset(x, y);
            platform.scale.setTo(scaleX, scaleY);
            platform.body.immovable = true;
        }
    }

    createStar(x, y, scaleX, scaleY) {
        const star = this.group.getFirstExists(false);
        if (star) {
            star.reset(x, y);
            star.scale.setTo(scaleX, scaleY);
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
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