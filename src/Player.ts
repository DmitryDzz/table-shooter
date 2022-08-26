import {AbstractMesh, PhysicsImpostor, SceneLoader, Vector3} from "@babylonjs/core";
import {GameScene} from "./GameScene";
import {createVector3} from "./Math";
import {ISceneLoaderAsyncResult} from "@babylonjs/core/Loading/sceneLoader";
import {InputBehavior} from "./InputBehavior";

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
            await SceneLoader.ImportMeshAsync(null, "./assets/", "player.glb", this._scene);

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

                const inputBehavior = new InputBehavior(this._scene, m.physicsImpostor);
                m.addBehavior(inputBehavior, true);
                // m.physicsImpostor.setDeltaPosition(new Vector3(0.5, 0.5, 0));
                // m.physicsImpostor.setLinearVelocity(new Vector3(0.5, 0, 0));
                // m.position.add(new Vector3(10, 0, 0));
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

    update() {

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