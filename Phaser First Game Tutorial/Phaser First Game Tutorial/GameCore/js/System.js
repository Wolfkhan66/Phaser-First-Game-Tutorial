class Input {
    constructor() {
        this.keyMap = new Map();
        console.log("Input Instantiated.")
    }

    add(key, action) {
        this.keyMap.set(game.input.keyboard.addKey(key), action);
    }

    update() {
        for (const [key, action] of this.keyMap.entries()) {
            if (key.isDown) {
                action();
            }
        }
    }
}

class UI {
    constructor() {
        console.log("UI Instantiated.")
    }
}

class Audio {
    constructor() {
        console.log("Audio Instantiated.")
    }
}