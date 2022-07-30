import {AbstractMesh, Color4, MeshBuilder, Scene, Vector3} from "@babylonjs/core";
import {GameScene} from "./GameScene";
import {createVector3} from "./Math";

export class Player {
    private readonly _mesh: AbstractMesh;

    private _position: Vector3 = createVector3({x: 0, y: -20 + 1, z: 20});

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
    }

    get position(): Vector3 {
        return this._position;
    }
}