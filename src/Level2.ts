import {
    Engine, Mesh,
    MeshBuilder,
    SceneOptions,
} from "@babylonjs/core";
import {GameScene} from "./GameScene";
import {createVector3} from "./Math";

export class Level2 extends GameScene {

    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, canvas, options);
        const box: Mesh = MeshBuilder.CreateBox("box", { size: 1 }, this);
        box.position = createVector3({x: 0, y: 0, z: 2});
    }

    async finalizeAsync(): Promise<void> {
    }

    async initializeAsync(): Promise<void> {
    }
}