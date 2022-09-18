import {
    AbstractMesh,
    Engine,
    PhysicsImpostor,
    SceneLoader,
    SceneOptions,
    TransformNode,
    Vector3
} from "@babylonjs/core";
import {GameScene} from "./gameScene";
import {createVector3} from "./math";
import {ISceneLoaderAsyncResult} from "@babylonjs/core/Loading/sceneLoader";
import {Player} from "./player";

import "@babylonjs/loaders/glTF";
import environmentGLB from "../../public/assets/environment.glb";
import {GamepadState, KeyboardState} from "../messages";

export class Level1 extends GameScene {
    private _player?: Player = undefined;

    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, canvas, options);
    }

    async initializeAsync(): Promise<void> {
        const loadedAsset: ISceneLoaderAsyncResult =
            await SceneLoader.ImportMeshAsync(null, "", environmentGLB, this);
            // await SceneLoader.ImportMeshAsync(null, "./assets/", "environment.glb", this);
        for (let mesh of loadedAsset.meshes) {
            mesh.parent = this.rootNode;
        }

        const ground: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Ground");
        ground.position = createVector3({x: 0, y: 0, z: 0});


        const homeYard: TransformNode = new TransformNode("HomeYard", this);
        homeYard.parent = this.rootNode; //TODO DZZ DELETE?
        homeYard.position = createVector3({x: -8, y: 0, z: 0});
        homeYard.rotate(Vector3.Up(), Math.PI / 4 * 3);

        const house: AbstractMesh = loadedAsset.meshes.find(x => x.name === "House");
        house.parent = homeYard;
        house.position = createVector3({x: 0, y: 0, z: 0});

        const fence: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Fence");
        fence.parent = homeYard;
        fence.position = createVector3({x: 5, y: 0, z: -7});
        fence.rotate(Vector3.Up(), Math.PI);

        for (let i = 1; i <= 9; i++) {
            const f = fence.clone(`FenceA${i}`, fence.parent);
            f.position = createVector3({x: fence.position.x - i, y: fence.position.y, z: fence.position.z});
        }
        for (let i = 1; i <= 14; i++) {
            const f = fence.clone(`FenceB${i}`, fence.parent);
            f.rotate(Vector3.Up(), Math.PI / 2);
            f.position = createVector3({x: fence.position.x - 10, y: fence.position.y, z: fence.position.z - 1 + i});
        }
        for (let i = 1; i <= 10; i++) {
            const f = fence.clone(`FenceC${i}`, fence.parent);
            f.rotate(Vector3.Up(), Math.PI);
            f.position = createVector3({x: fence.position.x - 11 + i, y: fence.position.y, z: fence.position.z + 14});
        }
        for (let i = 1; i <= 14; i++) {
            const f = fence.clone(`FenceD${i}`, fence.parent);
            f.rotate(Vector3.Up(), -Math.PI / 2);
            f.position = createVector3({x: fence.position.x, y: fence.position.y, z: fence.position.z + 15 - i});
        }


        const barn: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Barn");
        barn.position = createVector3({x: 10, y: 0, z: 0});
        barn.rotate(Vector3.Up(), -Math.PI / 4 * 3);


        const streetlight: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Streetlight");
        streetlight.position = createVector3({x: 1, y: 0, z: -3});
        streetlight.rotate(Vector3.Up(), Math.PI);



        // Physics:
        for (let mesh of loadedAsset.meshes) {
            this._getRidOfParentNodes(mesh);
        }
        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor,
            {mass: 0, restitution: 0}, this);


        this._player = new Player(this);
        await this._player.initializeAsync();
        this._player.position = this._player.position.add(new Vector3(-12, 0, 0));
    }

    private _getRidOfParentNodes(mesh: AbstractMesh) {
        const worldMatrix = mesh.computeWorldMatrix(true).clone();
        mesh.parent = null;
        mesh.freezeWorldMatrix(worldMatrix, true);
        mesh.unfreezeWorldMatrix();
    }

    setGamepadState(state: GamepadState) {
        this.cameraInput.cameraRotationSpeedFactors = {
            alpha: state.isCameraLookVector ? state.lookVector.x : 0,
            beta: state.isCameraLookVector ? state.lookVector.z : 0,
        }
        const cameraDirection = this.camera.getDirection(Vector3.Forward());
        this._player?.setInputState(state.moveVector, 1, state.lookVector, state.isCameraLookVector, cameraDirection);
    }

    setKeyboardState(state: KeyboardState): void {
        this.cameraInput.setCameraDeltaRotation(state.cameraDelta.alpha, state.cameraDelta.beta);
        const cameraDirection = this.camera.getDirection(Vector3.Forward());
        this._player?.setInputState(state.moveVector, state.speedFactor, state.moveVector, true, cameraDirection);
    }
}