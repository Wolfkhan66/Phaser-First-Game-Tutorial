class GameWorld {
    constructor() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = new Player();
        this.paralex = [];
        this.map = game.add.tilemap('map');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.map.visible = false;
        this.layer.visible = false;
        this.enemies = new CollidableGroup(10, 'enemies', enemyFactory);
        console.log("GameWorld Instantiated.");
    }

    update() {
        this.player.update();
        this.enemies.updateGroup();
        this.paralex.forEach(sprite => sprite.update(sprite));
    }

    cleanup() {
        this.enemies.destroyGroup();
        this.paralex.forEach(sprite => sprite.kill());
    }

    createMap1() {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('jungle tileset');
        this.map.setCollisionBetween(41, 82, 120);
        this.layer = this.map.createLayer('Tile Layer 1');
        this.map.visible = true;
        this.layer.visible = true;
        this.layer.resizeWorld();
        game.world.sendToBack(this.map);
        game.world.sendToBack(this.layer);
        this.createParalexBackground("Paralex1", 0.4);
        this.createParalexBackground("Paralex2", 0.6);
        this.createParalexBackground("Paralex3", 0.8);
        this.createParalexBackground("Paralex4", 1);
        this.createParalexBackground("Paralex5", 0);
    }

    createParalexBackground(name, speed) {
        for (var i = -3; i < 3; i++) {
            var sprite = game.add.sprite(799 * i, 0, name);
            sprite.update = function () { if (game.cameraMovingLeft) { this.x -= speed } if (game.cameraMovingRight) { this.x += speed } }
            game.world.sendToBack(sprite);
            this.paralex.push(sprite);
        }
    }

    createEnemy() {
        if (game.enemiesAlive == 0) {
            game.enemySpawnTimer.start();
        }

        if (game.enemySpawnTimer.seconds > 1) {
            game.enemySpawnTimer.stop();
            var spawnLocation = game.rnd.integerInRange(1, 2);
            if (spawnLocation == 1) {
                this.enemies.createEnemy(10, 500, 1, 1);
            }
            else {
                this.enemies.createEnemy(2350, 500, 1, 1);
            }
            game.enemiesAlive++;
            game.difficulty--;
            game.enemySpawnTimer.start();
        }
    }

}

function enemyFactory(sprite) {
    sprite.entity = new Entity();
    sprite.entity.addControl(followPlayerControl);
    sprite.entity.addControl(attackControl);
    sprite.entity.addControl(cooldownControl);
    sprite.entity.addControl(deathControl);
    sprite.entity.addControl(takeDamageControl);
    sprite.entity.addControl(xGravityControl);
};