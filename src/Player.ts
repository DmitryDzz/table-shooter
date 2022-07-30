import {AbstractMesh, Color4, MeshBuilder, PhysicsImpostor, Scene, Vector3} from "@babylonjs/core";
import {GameScene} from "./GameScene";
import {createVector3} from "./Math";

export class Player {
    private readonly _mesh: AbstractMesh;

    private _position: Vector3 = createVector3({x: 0, y: -20 + 1 + 25, z: 20});

    constructor(scene: GameScene) {
        const color: Color4 = Color4.FromHexString("#ffb703");
        this._mesh = MeshBuilder.CreateBox(
            "Player",
            {
                width: 0.7,
                depth: 0.35,
                height: 2,
                faceColors: [
                    color, color, color, color, color, color,
                ]
            },
            scene
        );
        this._mesh.parent = scene.rootNode;
        this._mesh.position = this._position;

        // Physics:
        this._getRidOfParentNodes(this._mesh);
        this._mesh.physicsImpostor = new PhysicsImpostor(this._mesh, PhysicsImpostor.BoxImpostor,
            {mass: 80, restitution: 0.1}, scene);
    }

    get position(): Vector3 {
        return this._position;
    }

    private _getRidOfParentNodes(mesh: AbstractMesh) {
        const worldMatrix = mesh.computeWorldMatrix(true).clone();
        mesh.parent = null;
        mesh.freezeWorldMatrix(worldMatrix, true);
        mesh.unfreezeWorldMatrix();
    }
}