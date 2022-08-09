import {AbstractMesh, Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, TransformNode, Vector3} from "@babylonjs/core";
import {GameScene} from "./GameScene";
import {createVector3} from "./Math";
import {ISceneLoaderAsyncResult} from "@babylonjs/core/Loading/sceneLoader";

export class Player {
    private readonly _scene: GameScene;

    // private _bodyCollider: AbstractMesh;
    // private _feetCollider: AbstractMesh;

    private _position: Vector3 = createVector3({x: 0, y: -20 + 1 + 7.25, z: 20});

    constructor(scene: GameScene) {
        this._scene = scene;
    }

    async initializeAsync(): Promise<void> {
        const loadedAsset: ISceneLoaderAsyncResult =
            await SceneLoader.ImportMeshAsync(null, "./assets/", "player.glb", this._scene);

        // const mesh = this._makePhysicsObject("Player", loadedAsset.meshes, this._scene, 0.02, 1,
        //     new Vector3(0, -10, 20));

        // this._makePhysicsObject2(
        //     "Player", loadedAsset.transformNodes[0], 0.02, 1, new Vector3(0, -10, 20));

        const position = this._position;
        const scaling = 0.02;
        const mass = 1;
        loadedAsset.meshes.forEach(m => {
            m.isVisible = m.name.indexOf("collider") === -1;
            if (m.name === "feet-collider") {
                m.name = "player";
                m.parent = null;
                m.position = position.scale(scaling);
                m.scaling.scaleInPlace(scaling);
                m.physicsImpostor = new PhysicsImpostor(m, PhysicsImpostor.BoxImpostor, { mass }, this._scene);
            } else if (m.name === "body-collider") {
                m.physicsImpostor = new PhysicsImpostor(m, PhysicsImpostor.NoImpostor, { mass: 0 }, this._scene);
            }
        });
    }

    get position(): Vector3 {
        return this._position;
    }

    private _makePhysicsObject2 = (name: string, node: TransformNode, scaling: number, mass: number, position: Vector3) => {
        // const physicsRoot = new Mesh(name, this._scene);
        const physicsRoot = MeshBuilder.CreateBox(name, {size: 0.5}, this._scene);
        physicsRoot.position = position.scale(scaling);

        node.parent = physicsRoot;

        let feetCollider: AbstractMesh;
        let bodyCollider: AbstractMesh;
        const meshes = node.getChildMeshes();
        meshes.forEach(m => {
            m.isVisible = m.name.indexOf("collider") === -1;
            if (m.name === "feet-collider") {
                feetCollider = m;
            } else if (m.name === "body-collider") {
                bodyCollider = m;
            }
        });

        feetCollider.showBoundingBox = true;

        physicsRoot.scaling.scaleInPlace(scaling);
        physicsRoot.physicsImpostor = new PhysicsImpostor(physicsRoot, PhysicsImpostor.BoxImpostor, { mass }, this._scene);
    };

    private _makePhysicsObject = (name: string, meshes: AbstractMesh[], scene: GameScene, scaling: number,
                                  mass: number, position: Vector3) => {
        const physicsRoot = new Mesh(name, scene);
        physicsRoot.position = position.scale(scaling);

        // For all children labeled collider (representing colliders), make them invisible and add them as a child of the root object
        meshes.forEach(m => {
            if (m.name.indexOf("collider") !== -1){
                m.isVisible = false;
                physicsRoot.addChild(m);
            }
        });

        // Add all root nodes within the loaded gltf to the physics root
        meshes.forEach(m => {
            if (m.parent === null) {
                physicsRoot.addChild(m);
            }
        });

        // Make every collider into a physics impostor
        physicsRoot.getChildMeshes().forEach(m => {
            if (m.name.indexOf("collider") !== -1) {
                m.scaling.x = Math.abs(m.scaling.x);
                m.scaling.y = Math.abs(m.scaling.y);
                m.scaling.z = Math.abs(m.scaling.z);
                // m.physicsImpostor = new PhysicsImpostor(m, PhysicsImpostor.BoxImpostor, { mass: 0.1 }, scene);
            }
        });

        // Scale the root object and turn it into a physics impostor
        physicsRoot.scaling.scaleInPlace(scaling);
        // physicsRoot.physicsImpostor = new PhysicsImpostor(physicsRoot, PhysicsImpostor.NoImpostor, { mass }, scene);
        physicsRoot.physicsImpostor = new PhysicsImpostor(physicsRoot, PhysicsImpostor.BoxImpostor, { mass }, scene);

        return physicsRoot;
    };

    // private _getRidOfParentNodes(mesh: TransformNode) {
    //     const worldMatrix = mesh.computeWorldMatrix(true).clone();
    //     mesh.parent = null;
    //     mesh.freezeWorldMatrix(worldMatrix, true);
    //     mesh.unfreezeWorldMatrix();
    // }

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