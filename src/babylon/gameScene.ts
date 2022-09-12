import {
    ArcRotateCamera,
    CannonJSPlugin,
    Engine,
    HemisphericLight,
    Scene,
    SceneOptions, TransformNode,
    Vector3
} from "@babylonjs/core";
import {Env} from "./env";
import {createVector3} from "./math";
import {GamepadState} from "../messages";
import {ArcRotateCameraWorkerInput} from "./ArcRotateCameraWorkerInput";

export abstract class GameScene extends Scene {
    public readonly rootNode: TransformNode;
    public readonly cameraParentNode: TransformNode;
    public readonly camera: ArcRotateCamera;
    public readonly cameraInput: ArcRotateCameraWorkerInput;
    public readonly light: HemisphericLight;

    protected constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, options);

        // Physics engine:
        const gravity = createVector3({x: 0, y: -9.81, z: 0});
        const physicsPlugin = new CannonJSPlugin();
        this.enablePhysics(gravity, physicsPlugin);
        // this.enablePhysics(gravity);

        this.rootNode = new TransformNode("rootNode", this);
        this.rootNode.scaling = Vector3.One().scale(Env.meters2units);

        this.cameraParentNode = new TransformNode("cameraParentNode", this);
        this.cameraParentNode.parent = this.rootNode;
        this.cameraParentNode.position = Vector3.Zero();

        const deg2rad = (deg: number): number => {return deg * Math.PI / 180};

        this.camera = new ArcRotateCamera("camera",deg2rad(-90), deg2rad(60), 36, Vector3.Zero(), this, true);
        this.camera.parent = this.cameraParentNode;
        this.camera.minZ = Env.camera.near;
        this.camera.maxZ = Env.camera.far;
        this.camera.setTarget(createVector3(Env.camera.defaultDirection)
            .add(createVector3({x: 0, y: 0, z: 1})));
        this.camera.attachControl(canvas);

        this.camera.inputs.clear();
        this.cameraInput = new ArcRotateCameraWorkerInput(2, 2);
        this.camera.inputs.add(this.cameraInput);
        this.camera.attachControl("ArcRotateCameraWorkerInput");

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
    }

    abstract initializeAsync(): Promise<void>;

    abstract setGamepadState(state: GamepadState): void;
}