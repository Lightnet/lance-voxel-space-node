/*
    Project Name: lance-voxel-space-node
    License: CC0
    Multiples Licenses check the README.md file.

    Created by: Lightnet

    Information: Multiplayer Node Server Prototype Spaceship Game

*/

'use strict';

//const DynamicObject= require('lance-gg').serialize.DynamicObject;
//const PhysicalObject = require('lance-gg').serialize.PhysicalObject;
//const GameObject = require('lance-gg').serialize.ThreeVector;

const PlayerCube = require('./PlayerCube');
const ThreeVector = require('lance-gg').serialize.ThreeVector;
const GameObject = require('lance-gg').serialize.DynamicObject;

//console.log(GameObject);

//class PlayerAvatar extends DynamicObject {
class PlayerController extends GameObject {

    constructor(id, playerId) {
        super(id);
        this.class = PlayerController;
        //this.gameEngine = gameEngine;
        this.playerId = playerId; //number id 
        this.clientId = ""; // socket client id
        this.teamid = 0;//0 = free for all
        this.pawn = null; //object control
        this.state="spector";
        this.yawrotation = 0;
        this.bpress = false;
        this.bspawn = false;
    };

    onAddToWorld(gameEngine) {
        this.gameEngine = gameEngine;
        //console.log("====================================");
        //console.log("add to world scene PlayerController.");
        //console.log(this);
    }

    processInput(inputData){
        //console.log(inputData);
        if ((inputData.input === 'up') && (inputData.options.movement == true)) {
            //playerPaddle.position.y -= 5;
            this.forwardthrust();
        } else if ((inputData.input === 'down') && (inputData.options.movement == true)) {
            //playerPaddle.position.y += 5;
            //this.test();
            this.reversethrust();
        } else if ((inputData.input === 'left') && (inputData.options.movement == true)) {
            //playerPaddle.position.y += 5;
            //console.log("left");
            this.turnleft();
        } else if ((inputData.input === 'right') && (inputData.options.movement == true)) {
            //playerPaddle.position.y += 5;
            //console.log("right");
            this.turnright();
        }
        if( (inputData.input === 'space') && (inputData.options.movement == true)) {
            //playerPaddle.position.y += 5;
            //console.log("space");
            if(this.bpress == false){
                this.bpress = true;
                this.checkspawn();
            }else{

            }
        }
    }

    forwardthrust(){
        if(this.pawn != null){

        }
    }

    reversethrust(){
        if(this.pawn != null){

        }
    }

    turnleft(){
        if(this.pawn != null){
            let CANNON = this.gameEngine.physicsEngine.CANNON;
            this.yawrotation = this.yawrotation - 0.1;
            if(this.yawrotation < 0){
                this.yawrotation = 360;
            }

            this.pawn.physicsObj.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), this.yawrotation);
        }
    }

    turnright(){
        if(this.pawn != null){
            //console.log('turn right');
            let CANNON = this.gameEngine.physicsEngine.CANNON;
            //console.log(this.pawn.physicsObj);
            //console.log(this.pawn);
            this.yawrotation = this.yawrotation + 0.1;
            if(this.yawrotation > 360){
                this.yawrotation = 0;
            }
            this.pawn.physicsObj.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), this.yawrotation);
        }
        //console.log('turn right');
    }

    checkspawn(){
        //if(this.bspawn == false){
            //this.bspawn = true;
            //console.log("spawnning....");
            //this.spawnship();
        //}
        //return this.this.bspawn;
    }

    spawnship(){
        if(this.pawn == null){
            //console.log("==================================");
            //console.log("create player object...");
            //this.pawn = this.gameEngine.spawnship();
            //this.gameEngine.requestspawn();
            //console.log(PlayerCube);
            //this.pawn = this.gameEngine.addObjectToWorld(new PlayerCube(++this.gameEngine.world.idCount, new ThreeVector(0, 20, 0)));
            //console.log(this.pawn);
            //console.log(this.gameEngine.addObjectToWorld);
        }else{
            console.log("player object exist...");
        }
    }


    toString() {
        return `PlayerController::${super.toString()}`;
    }

    jump(){

    }

    attack(){
        
    }

    test(){
        //console.log("test log player");
        //console.log(this.gameEngine);
        this.scene = this.gameEngine.renderer ? this.gameEngine.renderer.scene : null;

        if(this.gameEngine.renderer){//check if render is not null on client but on server is null I think.
            this.gameEngine.renderer.toggle_login();
        }
        

        if (this.scene) {
            //console.log(this.gameEngine);
            //console.log(this.gameEngine.world.objects[2]);
            let sphereobject = this.gameEngine.world.objects[2];
            if(sphereobject !=null){
                sphereobject.reset();
            }
            //console.log(this.scene);
            //console.log(this.world);
            //let sphereobject = this.gameEngine.world.getPlayerObject(2);
            //console.log(sphereobject);
            //
        }
        
    }

}

module.exports = PlayerController;
