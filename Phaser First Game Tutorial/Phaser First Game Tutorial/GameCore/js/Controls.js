function followPlayerXControl(sprite) {
    if (sprite.following) {
        if (gameWorld.player.sprite.x > sprite.x) {
            // Stop sprite action timer and raise x velocity to move to the right
            sprite.body.velocity.x = sprite.speed;
            sprite.animations.play('move');
            sprite.facingLeft = false;
            sprite.facingRight = true;
            sprite.scale.setTo(1, 1);
            // if player is in range to the right
            if (gameWorld.player.sprite.x - sprite.range < sprite.x) {
                sprite.chargingAttack = true;
            } else { sprite.chargingAttack = false; }
        }
        else {
            // Stop sprite action timer and lower x velocity to move to the left
            sprite.body.velocity.x = -sprite.speed;
            sprite.animations.play('move');
            sprite.facingLeft = true;
            sprite.facingRight = false;
            sprite.scale.setTo(-1, 1);
            // if player is in range to the left
            if (gameWorld.player.sprite.x + sprite.range > sprite.x) {
                sprite.chargingAttack = true;
            }
            else { sprite.chargingAttack = false; }
        }
    }
}

function followPlayerYControl(sprite) {
        if (gameWorld.player.sprite.y > sprite.y) {
            sprite.body.velocity.y = sprite.speed;
        }
        else {
            sprite.body.velocity.y = -sprite.speed;
        }
}

function xGravityControl(sprite) {
    // apply resistance on the x axis to slow down entities when they are not using a movement control
    if (sprite.body.velocity.x > 0) {
        sprite.body.velocity.x -= 3;
    }
    else if (sprite.body.velocity.x < 0) {
        sprite.body.velocity.x += 3;
    }
}

function chargingAttackControl(sprite) {
    if (sprite.chargingAttack) {
        sprite.following = false;
        sprite.timer.start();
        if (sprite.timer.seconds > sprite.reactionTime) {
            sprite.chargingAttack = false;
            sprite.attacking = true;
            sprite.timer.stop();
        }
    }
}

function attackControl(sprite) {
    if (sprite.attacking) {
        sprite.animations.play('attack');
        sprite.animations.currentAnim.onComplete.add(function () { sprite.attacking = false; sprite.cooldown = true; }, this);
    }
}

function rangedAttackControl(sprite) {
    if (sprite.attacking) {
        sprite.following = false;
        sprite.animations.play('attack');
        sprite.animations.currentAnim.onComplete.add(function () { sprite.attacking = false; sprite.cooldown = true; }, this);
         // TODO create ranged projectile of some kind that moves in players current direction
    }
}

function jumpAttackControl(sprite) {
    if (sprite.attacking) {
        sprite.following = false;
        sprite.body.velocity.y = -80;
        if (gameWorld.player.sprite.x > sprite.x) {
            sprite.body.velocity.x = +200;
        }
        else {
            sprite.body.velocity.x = -200;
        }
        sprite.animations.play('attack');
        sprite.animations.currentAnim.onComplete.add(function () { sprite.attacking = false; sprite.cooldown = true; }, this);
    }
}

function cooldownControl(sprite) {
    if (sprite.cooldown) {
        sprite.timer.start();
        sprite.animations.play('idle');
        if (sprite.timer.seconds > 2) {
            sprite.cooldown = false;
            sprite.following = true;
            sprite.timer.stop();
        }
    }
}

function takeDamageControl(sprite) {
    if (sprite.takingDamage) {
        sprite.timer.stop();
        sprite.cooldown = false;
        sprite.chargingAttack = false;
        sprite.attacking = false;
        sprite.following = false;
        sprite.animations.play('damaged');
        sprite.animations.currentAnim.onComplete.add(function () { sprite.takingDamage = false; sprite.following = true; }, this);
    }
}

function deathControl(sprite) {
    if (sprite.health <= 0) {
        game.score += (10 * game.difficultyLevel);
        ui.setText("Score", "Score: " + game.score);
        if (game.gameMode == "TimeAttack") {
            game.countDown = game.countDown + 2;
        }
        var potionSpawnChance = game.rnd.integerInRange(1, 20);
        if (potionSpawnChance == 10) {
            gameWorld.potions.createPotion(sprite.x, sprite.y, 300)
        }
        sprite.kill();
        game.enemiesAlive--;
    }
}

function timeOutControl(sprite) {
    if (!sprite.alive) {
        sprite.timer.start();
        sprite.alive = true;
    }
    if (sprite.timer.seconds > 10) {
        sprite.kill();
    }
}