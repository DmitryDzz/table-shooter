import {AbstractMesh, PhysicsImpostor, Quaternion, SceneLoader, Vector3} from "@babylonjs/core";
import {GameScene} from "./gameScene";
import {createVector3} from "./math";
import {ISceneLoaderAsyncResult} from "@babylonjs/core/Loading/sceneLoader";
import {GamepadState, Vector} from "../messages";
import playerGLB from "../../public/assets/player.glb";


export class Player {
    private readonly _scene: GameScene;
    private _mesh: AbstractMesh;

    private _scaling = 0.02;
    private _position: Vector3 = createVector3({x: 0, y: -20 + 1 + 7.25, z: 20});

    constructor(scene: GameScene) {
        this._scene = scene;
    }

    async initializeAsync(): Promise<void> {
        const loadedAsset: ISceneLoaderAsyncResult =
            await SceneLoader.ImportMeshAsync(null, "", playerGLB, this._scene);

        const position = this._position;
        const mass = 1;
        loadedAsset.meshes.forEach(m => {
            m.isVisible = m.name.indexOf("collider") === -1;
            if (m.name === "feet-collider") {
                this._mesh = m;
                m.name = "player";
                m.parent = null;
                m.position = position.scale(this._scaling);
                m.scaling.scaleInPlace(this._scaling);
                m.physicsImpostor = new PhysicsImpostor(m, PhysicsImpostor.BoxImpostor, { mass, friction: 0 }, this._scene);

                // const inputBehavior = new InputBehavior(this._scene, m.physicsImpostor);
                // m.addBehavior(inputBehavior, true);

                // const gamepadBehavior = new GamepadBehavior(this._scene, m.physicsImpostor);
                // m.addBehavior(gamepadBehavior, true);
            } else if (m.name === "body-collider") {
                //TODO DZZ Если раскомментарить, то при падении меш покачивается. Может поиграть опциями?
                //m.physicsImpostor = new PhysicsImpostor(m, PhysicsImpostor.NoImpostor, { mass: 0 }, this._scene);
            }
        });
    }

    get position(): Vector3 {
        return this._position;
    }

    set position(value: Vector3) {
        this._position = value.clone();
        this._mesh.position = this._position.scale(this._scaling);
    }

    private _lengthSquared(v: Vector): number {
        return v.x * v.x + v.y * v.y + v.z * v.z;
    }

    setGamepadState({moveVector, lookVector}: GamepadState) {
        if (this._mesh?.physicsImpostor === undefined) return;

        const isMoving = this._lengthSquared(moveVector) > 0.01;
        const isFacing = this._lengthSquared(lookVector) > 0.01;
        let faceVector: Vector3 | null = null;
        if (isFacing) faceVector = new Vector3(lookVector.x, lookVector.y, lookVector.z);
        else if (isMoving) faceVector = new Vector3(moveVector.x, moveVector.y, moveVector.z);
        if (faceVector !== null) {
            const toQuaternion = Quaternion.FromLookDirectionRH(faceVector, Vector3.Up());
            const speed = 0.01;
            this._mesh.rotationQuaternion = Quaternion.Slerp(
                this._mesh.rotationQuaternion, toQuaternion, speed * this._scene.deltaTime);
        }

        const speedValue = 0.25;
        const velocity = new Vector3(moveVector.x, moveVector.y, moveVector.z).scale(speedValue);
        this._mesh.physicsImpostor.friction = isMoving ? 0 : 1_000_000;
        if (isMoving) {
            this._mesh.physicsImpostor.setLinearVelocity(velocity);
        }
    }

    // private _afterPhysicsStep = (impostor: PhysicsImpostor): void => {
    //     this._mesh.physicsImpostor.setAngularVelocity(Vector3.Zero());
    //     // console.log(`++++`);
    // }
    //
    // private _onPhysicsCollide = (collider: PhysicsImpostor, collidedAgainst: PhysicsImpostor, point: Nullable<Vector3>): void => {
    //     this._mesh.physicsImpostor.setAngularVelocity(Vector3.Zero());
    //     console.log(`++++ collider: ${(collider.object as AbstractMesh).name}`);
    // }
}