import {ICameraInput} from "@babylonjs/core/Cameras/cameraInputsManager";
import {ArcRotateCamera, Engine, Nullable} from "@babylonjs/core";
import {GameScene} from "./gameScene";

export class ArcRotateCameraWorkerInput implements ICameraInput<ArcRotateCamera> {
    private static readonly _epsilon = 0.2;
    private static readonly _minBeta = Math.PI / 18; // 10 degrees
    private static readonly _maxBeta = Math.PI * 99 / 199; // almost PI/2

    private readonly _scene: GameScene;
    private readonly _maxAlphaSpeed: number;
    private readonly _maxBetaSpeed: number;

    private _engine: Nullable<Engine> = null;

    camera: Nullable<ArcRotateCamera>;

    /**
     * Constructor.
     * @param scene GameScene.
     * @param maxAlphaSpeed radians per second.
     * @param maxBetaSpeed radians per second.
     */
    constructor(scene: GameScene, maxAlphaSpeed: number, maxBetaSpeed: number) {
        this._scene = scene;
        this._maxAlphaSpeed = maxAlphaSpeed;
        this._maxBetaSpeed = maxBetaSpeed;
    }

    attachControl(noPreventDefault?: boolean): void {
        this._engine = this.camera.getEngine();
    }

    detachControl(): void {
        this._engine = null;
    }

    getClassName(): string {
        return "ArcRotateCameraWorkerInput";
    }

    getSimpleName(): string {
        return "worker";
    }

    checkInputs(): void {
        if (this._engine === null) return;
        const factors = this._scene.cameraRotationSpeedFactors;
        const deltaTime = this._engine.getDeltaTime() / 1000.0;

        const speedAlpha = Math.abs(factors.alpha) < ArcRotateCameraWorkerInput._epsilon
            ? 0
            : this._maxAlphaSpeed * factors.alpha;
        this.camera.alpha += speedAlpha * deltaTime;

        const speedBeta = Math.abs(factors.beta) < ArcRotateCameraWorkerInput._epsilon
            ? 0
            : this._maxBetaSpeed * factors.beta;
        const newBeta = this.camera.beta - speedBeta * deltaTime;
        this.camera.beta = Math.min(Math.max(newBeta, ArcRotateCameraWorkerInput._minBeta), ArcRotateCameraWorkerInput._maxBeta);
    }
}