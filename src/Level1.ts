import {
    Engine, Mesh,
    MeshBuilder, SceneLoader,
    SceneOptions,
} from "@babylonjs/core";
import {GameScene} from "./GameScene";
import {createVector3} from "./Math";

export class Level1 extends GameScene {

    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, canvas, options);

        const ground: Mesh = MeshBuilder.CreateTiledPlane("ground", {
            tileSize: 0.01,
            size: 2,
        });
        ground.position = createVector3({x: 0, y: -1, z: 1.5});
        ground.rotation = createVector3({x: Math.PI / 2, y: 0, z: 0});

        const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this);
        sphere.position = createVector3({x: 0, y: 0, z: 2});

        SceneLoader.ImportMesh(null, "./", "house.glb", this);
    }

    async initializeAsync(): Promise<void> {
    }

    async finalizeAsync(): Promise<void> {
    }
}