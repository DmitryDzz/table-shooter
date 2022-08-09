import {AbstractMesh, Mesh, PhysicsImpostor, SceneLoader, TransformNode, Vector3} from "@babylonjs/core";
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

        const mesh = this._makePhysicsObject("Player", loadedAsset.meshes, this._scene, 0.02, 1,
            new Vector3(0, -10, 20));

        // for (let mesh of loadedAsset.meshes) {
        //     if (mesh.name === "body-collider" || mesh.name === "feet-collider") {
        //         this._feetCollider = mesh;
        //         mesh.isVisible = false;
        //         mesh.isPickable = false;
        //         mesh.checkCollisions = true;
        //         if (mesh.name === "feet-collider") {
        //             this._feetCollider = mesh;
        //         }
        //     } else if (mesh.name === "Body") {
        //         mesh.isVisible = true;
        //         mesh.isPickable = true;
        //         mesh.checkCollisions = false;
        //     }
        // }
        // for (let node of loadedAsset.transformNodes) {
        //     if (node.name === "Player") {
        //         node.position = new Vector3(0, -10, 20);
        //         node.parent = this._scene.rootNode;
        //         this._getRidOfParentNodes(node);
        //     }
        // }
        //
        // // Physics:
        // this._feetCollider.physicsImpostor = new PhysicsImpostor(this._feetCollider, PhysicsImpostor.BoxImpostor,
        //     {mass: 1, restitution: 0, damping: 0.05}, this._scene);
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

    get position(): Vector3 {
        return this._position;
    }

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
        physicsRoot.physicsImpostor = new PhysicsImpostor(physicsRoot, PhysicsImpostor.NoImpostor, { mass }, scene);

        return physicsRoot;
    }

    // private _getRidOfParentNodes(mesh: TransformNode) {
    //     const worldMatrix = mesh.computeWorldMatrix(true).clone();
    //     mesh.parent = null;
    //     mesh.freezeWorldMatrix(worldMatrix, true);
    //     mesh.unfreezeWorldMatrix();
    // }
}