/*
    Project Name: lance-voxel-space-node
    License: CC0
    Multiples Licenses check the README.md file.

    Created by: Lightnet

    Information: Multiplayer Node Server Prototype Spaceship Game

*/

const ClientEngine = require('lance-gg').ClientEngine;
const MyRenderer = require('../client/MyRenderer');

class MyClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, MyRenderer);

        //this.serializer.registerClass(require('../common/PlayerAvatar'));
        this.gameEngine.on('client__preStep', this.preStep.bind(this));
        // keep a reference for key press state
        this.pressedKeys = {
            down: false,
            up: false,
            left: false,
            right: false,
            space: false
        };

        let that = this;
        document.onkeydown = (e) => { that.onKeyChange(e, true); };
        document.onkeyup = (e) => { that.onKeyChange(e, false); };
    }

    // our pre-step is to process all inputs
    preStep() {
        //need to fixed this later...

        if (this.pressedKeys.up) {
            this.sendInput('up', { movement: true });
        }else{
            this.sendInput('up', { movement: false });
        }

        if (this.pressedKeys.down) {
            this.sendInput('down', { movement: true });
        }else{
            this.sendInput('down', { movement: false });
        }

        if (this.pressedKeys.left) {
            this.sendInput('left', { movement: true });
        }else{
            this.sendInput('left', { movement: false });
        }

        if (this.pressedKeys.right) {
            this.sendInput('right', { movement: true });
        }else{
            this.sendInput('right', { movement: false });
        }

        if (this.pressedKeys.space) {
            this.sendInput('space', { movement: true });
        }else{
            //this.sendInput('space', { movement: false });
        }
    }

    onKeyChange(e, isDown) {
        e = e || window.event;
        //console.log(isDown);
        if (e.keyCode == '38') {
            this.pressedKeys.up = isDown;
        } else if (e.keyCode == '40') {
            this.pressedKeys.down = isDown;
        } else if (e.keyCode == '37') {
            this.pressedKeys.left = isDown;
        } else if (e.keyCode == '39') {
            this.pressedKeys.right = isDown;
        } else if (e.keyCode == '32') {
            this.pressedKeys.space = isDown;
        }
    }

    // extend ClientEngine connect to add own events
    connect() {
        return super.connect().then(() => {
            console.log("client engine connected...")
            //this.socket.on('scoreUpdate', (e) => {
                //this.renderer.updateScore(e);
            //});
            console.log(this.playerId);

            this.socket.on('disconnect', (e) => {
                console.log('disconnected');
                //document.body.classList.add('disconnected');
                //document.body.classList.remove('gameActive');
                //document.querySelector('#reconnect').disabled = false;
            });

            //if ('autostart' in Utils.getUrlVars()) {
                //this.socket.emit('requestRestart');
            //}
        });
    }
}

module.exports = MyClientEngine;
