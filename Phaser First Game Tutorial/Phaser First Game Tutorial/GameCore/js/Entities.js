class Entity {
    constructor() {
        this.controls = [];
    }

    addControl(control) {
        this.controls.push(control);
    }

    removeControl(control) {
        var index = this.controls.indexOf(control);
        this.controls.splice(index, 1);
    }

    update(sprite) {
        this.controls.forEach(function (callback) {
            callback(sprite);
        });
    }
}

class CollidableGroup {
    constructor(size, spriteName, initCallback) {
        const group = game.add.group();
        // enable physics body on sprite
        group.enableBody = true;
        // create multiple sprites in the group to be reused
        group.createMultiple(size, spriteName);
        group.forEach(initCallback);

        this.group = group;
    }

    createPlatform(x, y, scaleX, scaleY) {
        // get the first sprite in the group that is not in use
        const platform = this.group.getFirstExists(false);
        if (platform) {
            // reset the x and y of the sprite and set the scale
            platform.reset(x, y);
            platform.scale.setTo(scaleX, scaleY);
            // make the sprite body immovable to ensure the player collides properly with them.
            platform.body.immovable = true;
        }
    }

    createStar(x, y, scaleX, scaleY) {
        // get the first sprite in the group that is not in use
        const star = this.group.getFirstExists(false);
        if (star) {
            // reset the x and y of the sprite and set the scale
            star.reset(x, y);
            star.scale.setTo(scaleX, scaleY);
            //give the sprite some gravity and a random bounce value
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    }

    createEnemy(x, y, scaleX, scaleY) {
        console.log("Creating enemy");
        // get the first sprite in the group that is not in use
        const enemy = this.group.getFirstExists(false);
        if (enemy) {
            // reset the x and y of the sprite and set the scale
            enemy.reset(x, y);
            enemy.scale.setTo(scaleX, scaleY);
            // give the sprite some gravity and a health value
            enemy.body.gravity.y = 500;
            enemy.health = 10;
        }
    }

    updateGroup() {
        // For any sprites in this group in use, call their entity update function
        this.group.forEachExists(function (sprite) {
            sprite.entity.update(sprite);
        })
    }

    destroyGroup() {
        // Destroy all sprites in use for this group
        this.group.forEachExists(function (sprite) {
            sprite.kill()
        })
    }

}