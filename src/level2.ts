import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    SceneOptions,
    Vector3
} from "@babylonjs/core";

export class Level2 extends Scene {
    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, options);

        const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this);
        camera.attachControl(canvas, true);
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this);
        const sphere: Mesh = MeshBuilder.CreateBox("sphere", { size: 1 }, this);
    }
}