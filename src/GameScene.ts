import {
    Engine,
    HemisphericLight,
    Scene,
    SceneOptions, TransformNode, UniversalCamera,
    Vector3
} from "@babylonjs/core";
import {Env} from "./Env";
import {createVector3} from "./Math";

export abstract class GameScene extends Scene {
    public readonly light: HemisphericLight;
    public readonly camera: UniversalCamera;
    public readonly rootNode: TransformNode;

    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, options);

        this.camera = new UniversalCamera('camera', createVector3(Env.camera.position), this);
        this.camera.minZ = Env.camera.near;
        this.camera.maxZ = Env.camera.far;
        this.camera.setTarget(createVector3(Env.camera.defaultDirection).add(createVector3(Env.camera.position)));
        this.camera.attachControl(canvas);

        // Turn on touch on mobile phones:
        // @ts-ignore
        this.camera.inputs.attached.mouse.touchEnabled = true;
        // Disable camera zoom and rotation in Oculus Browser in 2D mode:
        this.camera.inputs.removeByType("FreeCameraTouchInput");

        this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this);

        // 3D Environment
        const environment = this.createDefaultEnvironment({
            enableGroundShadow: false,
            // groundYBias: 0.01,
            createGround: true,
            groundSize: 0.0001,
            groundOpacity: 0,
            setupImageProcessing: false,
            createSkybox: false,
        });
        if (!environment) {
            throw new Error("Cannot create environment");
        }

        this.rootNode = new TransformNode("guiRootNode", this);

        // const dome = new PhotoDome("skybox",Env.scene.skyboxTextureFile,{resolution: 32,size: 30},this.scene);
        // dome.parent = this.guiRootNode;
        // dome.mesh.name = MeshName.backgroundSkybox;

        // const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this);
        // camera.attachControl(canvas, true);
        // new HemisphericLight("light1", new Vector3(1, 1, 0), this);
    }

    abstract initializeAsync(): Promise<void>;
    abstract finalizeAsync(): Promise<void>;
}