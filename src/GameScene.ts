import {
    CannonJSPlugin,
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

    protected constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, options);

        // Physics engine:
        const gravity = createVector3({x: 0, y: -9.81, z: 0});
        const physicsPlugin = new CannonJSPlugin();
        this.enablePhysics(gravity, physicsPlugin);
        // this.enablePhysics(gravity);

        this.camera = new UniversalCamera('camera', createVector3(Env.camera.position), this);
        this.camera.minZ = Env.camera.near;
        this.camera.maxZ = Env.camera.far;
        this.camera.setTarget(createVector3(Env.camera.defaultDirection)
            .add(createVector3({x: 0, y: -0.5, z: 0})));
            //.add(createVector3(Env.camera.position)));
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

        this.rootNode = new TransformNode("rootNode", this);
        this.rootNode.scaling = createVector3({x: 0.02, y: 0.02, z: 0.02});
    }

    abstract initializeAsync(): Promise<void>;
}