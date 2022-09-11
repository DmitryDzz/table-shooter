import {AbstractMesh, PhysicsImpostor, Quaternion, SceneLoader, Vector3} from "@babylonjs/core";
import {GameScene} from "./gameScene";
import {createVector3} from "./math";
import {ISceneLoaderAsyncResult} from "@babylonjs/core/Loading/sceneLoader";
import {GamepadState, Vector} from "../messages";
import playerGLB from "../../public/assets/player.glb";
import {Env} from "./env";

export class Player {
    private readonly _scene: GameScene;
    private _mesh: AbstractMesh;

    private _scaling = Env.meters2units;
    private _position: Vector3 = createVector3({x: 0, y: 8.25, z: -10});

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

    setGamepadState({moveVector, lookVector, bumperPressed}: GamepadState, cameraDirection: Vector3) {
        if (this._mesh?.physicsImpostor === undefined) return;

        cameraDirection.y = 0;
        cameraDirection.normalize();
        const cameraQuaternion = Quaternion.FromLookDirectionLH(cameraDirection, Vector3.Up());
        // console.log(`++++ x: ${cameraDirection.x.toFixed(2)}, y: ${cameraDirection.y.toFixed(2)}, z: ${cameraDirection.z.toFixed(2)}`); //TODO DZZ

        const mv = createVector3({x: moveVector.x, y: moveVector.y, z: moveVector.z});
        const lv = createVector3({x: lookVector.x, y: lookVector.y, z: lookVector.z});

        const isMoving = this._lengthSquared(mv) > 0.01;
        const isFacing = !bumperPressed && this._lengthSquared(lv) > 0.01;
        let faceVector: Vector3 | null = null;
        if (isFacing) faceVector = lv.clone();
        else if (isMoving) faceVector = mv.clone();
        if (faceVector !== null) {
            const faceQuaternion = Quaternion.FromLookDirectionLH(faceVector, Vector3.Up());
            // const toQuaternion = faceQuaternion.clone();
            const toQuaternion = cameraQuaternion.multiply(faceQuaternion);
            // const toQuaternion = faceQuaternion.multiply(cameraQuaternion);
            const speed = 0.01;
            this._mesh.rotationQuaternion = Quaternion.Slerp(
                this._mesh.rotationQuaternion, toQuaternion, speed * this._scene.deltaTime);
        }

        const speedValue = 0.25;
        const velocity = mv.clone().applyRotationQuaternion(cameraQuaternion).scale(speedValue);
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