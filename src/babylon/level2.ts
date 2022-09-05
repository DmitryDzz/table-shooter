import {
    Engine, Mesh,
    MeshBuilder,
    SceneOptions,
} from "@babylonjs/core";
import {GameScene} from "./gameScene";
import {createVector3} from "./math";
import {GamepadState} from "../messages";

export class Level2 extends GameScene {

    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, canvas, options);
        const box: Mesh = MeshBuilder.CreateBox("box", { size: 1 }, this);
        box.position = createVector3({x: 0, y: 0, z: 2});
    }

    async initializeAsync(): Promise<void> {
    }

    setGamepadState(_state: GamepadState): void {
    }
}