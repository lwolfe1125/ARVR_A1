/* CSCI 4262 (AR/VR) Assignment 1, Winter 2024
 * Author: Derek Reilly, based heavily on code by E.S. Rosenberg, B. MacIntyre
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

/**
 * Jett Wolfe 
 * B00829345
 * CSCI 4264 
 * Winter 2024
 */

import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight, SpotLight, ShadowGenerator } from "@babylonjs/core/Lights";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/standardMaterial";
import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/inspector"
import { Texture } from "@babylonjs/core";
import { Animation } from "@babylonjs/core/Animations"; 
import { Color3 } from "@babylonjs/core/Maths";

const FRAME_RATE = 10;

/* The Game class just contains a static CreateScene method, which sets up and returns the Scene object to be rendered */
class Game {
    public static CreateScene (engine: Engine, canvas: HTMLCanvasElement): Scene {
        // create an empty (for now) scene
        var scene = new Scene (engine);

        // place a camera in the scene, up 8 units, back 10, facing the 8 units above the scene origin, and controllable via the canvas
        var camera = new UniversalCamera ("camera1", new Vector3 (0, 8, -10), scene);
        camera.setTarget (new Vector3(0, 8, 0));
        camera.attachControl (canvas, true);

        // add an ambient light source, with reflections in the "up" direction, and reduce the intensity slightly
        var light = new HemisphericLight ("light", new Vector3 (0,1,0), scene);
        light.intensity = 0.4;

        // Adding a red spotlight above the player
        var spotLight = new SpotLight("spotLight", new Vector3(0, 12, -10), new Vector3(0, -1, 0), Math.PI*2, 1, scene);
        spotLight.diffuse = new Color3(1, 0 , 0);
        spotLight.shadowEnabled = true;

        //Creating shadows from the spotlight 
        var shadowGen = new ShadowGenerator(1024, spotLight);

        // add a ground to the scene (flat, at y = 0)
        var ground = MeshBuilder.CreateGround ("ground", {width: 100, height: 100}, scene);

        //Creating a texture for the ground 
        var grassTexture = new Texture("textures/grass.jpg", scene);

        //Scaling the texture
        grassTexture.vScale = 50;
        grassTexture.uScale = 50;

        //Creating & applying material to the ground
        var grassMaterial = new StandardMaterial("grassMaterial", scene);
        grassMaterial.diffuseTexture = grassTexture;
        ground.material = grassMaterial;

        //Creating a cube
        var fleshCube = MeshBuilder.CreateBox("fleshCube", {size: 4}, scene);
        fleshCube.position.x = -8; 
        fleshCube.position.y = 4;
        fleshCube.position.z = 9;

        //Adding texture to the cube (I'm not sorry)
        var skinTexture = new Texture("textures/skin.jpg", scene);
        var skinMaterial = new StandardMaterial("skinMaterial", scene);
        skinMaterial.diffuseTexture = skinTexture;
        fleshCube.material = skinMaterial;

        //Creating a sphere
        var eye = MeshBuilder.CreateSphere("eye", {diameter: 5, segments: 32}, scene);
        eye.position.x = 15;
        eye.position.y = 2.5;
        eye.position.z = -5;

        //Adding texture to the sphere 
        var eyeTexture = new Texture("textures/eye.jpg", scene);
        var eyeMaterial = new StandardMaterial("eyeMaterial", scene);
        eyeMaterial.diffuseTexture = eyeTexture;
        eye.material = eyeMaterial;


        //Adding a cone 
        var cone = MeshBuilder.CreateCylinder("cone", {height: 6, diameterTop: 0, diameterBottom:6}, scene);
        cone.position.x = -35;
        cone.position.y = 6; 
        cone.position.z = 30;

        //Creating an animation for the cone that effects the y position & loops
        var hover = new Animation("hover", "position.y", FRAME_RATE, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

        //Creating the key frames
        var hoverFrames = []; 

        //Start position
        hoverFrames.push({
            frame: 0,
            value: 6
        });

        //Position at one second
        hoverFrames.push({
            frame: FRAME_RATE,
            value: 10
        });

        //Position at two seconds 
        hoverFrames.push({
            frame: FRAME_RATE*2,
            value: 6
        });

        //Attaching the frames to the animation
        hover.setKeys(hoverFrames);

        //Applying the animation to the cone 
        cone.animations.push(hover);

        //Creating another item to animate 
        var rectPrism = MeshBuilder.CreateBox("rectPrism", {width: 6, height: 3, depth: 3})
        rectPrism.position.x = 10;
        rectPrism.position.y = 6; 
        rectPrism.position.z = -30;
        rectPrism.rotation.y = 150*(Math.PI/180);

        //Animating the item to spin
        var rotation = new Animation("rotation", "rotation.z", FRAME_RATE, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

        var rotFrames = [];

        rotFrames.push({
            frame: 0,
            value: 0
        });

        rotFrames.push({
            frame: FRAME_RATE/2,
            value: Math.PI
        });

        rotFrames.push({
            frame: FRAME_RATE,
            value: Math.PI * 2
        });

        rotation.setKeys(rotFrames);

        rectPrism.animations.push(rotation);

        //Showing the debug layer 
        scene.debugLayer.show();

        //Start animations
        scene.beginAnimation(cone, 0, 2*FRAME_RATE, true);
        scene.beginAnimation(rectPrism, 0, FRAME_RATE, true);

        //Pushing objects to the shadow map
        shadowGen.addShadowCaster(fleshCube);
        shadowGen.addShadowCaster(eye);
        shadowGen.addShadowCaster(cone);
        shadowGen.addShadowCaster(rectPrism);
        ground.receiveShadows = true;

        return scene;
        
    }
}

// get the canvas to render to
const canvas = document.getElementById ("renderCanvas") as HTMLCanvasElement;

// initialize the Babylon rendering engine
const engine = new Engine (canvas, true);

// set up our scene
const scene = Game.CreateScene (engine, canvas);

// start a render loop that will repeatedly render our scene
engine.runRenderLoop (function () {
    scene.render ();
})

// tell the engine to resize the rendered scene if the window size changes
window.addEventListener ("resize", function () {
    engine.resize ();
})

