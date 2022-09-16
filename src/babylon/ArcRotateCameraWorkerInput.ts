import {ICameraInput} from "@babylonjs/core/Cameras/cameraInputsManager";
import {ArcRotateCamera, Engine, Nullable} from "@babylonjs/core";
import {Env} from "./env";

export interface CameraRotationSpeedFactors {
    /** 0..1 value. */
    alpha: number;
    /** 0..1 value. */
    beta: number;
}

export class ArcRotateCameraWorkerInput implements ICameraInput<ArcRotateCamera> {
    private static readonly _epsilon = 0.2;

    private readonly _maxAlphaSpeed: number;
    private readonly _maxBetaSpeed: number;

    private _engine: Nullable<Engine> = null;

    cameraRotationSpeedFactors: CameraRotationSpeedFactors = {alpha: 0, beta: 0};

    camera: Nullable<ArcRotateCamera>;

    /**
     * Constructor.
     * @param maxAlphaSpeed radians per second.
     * @param maxBetaSpeed radians per second.
     */
    constructor(maxAlphaSpeed: number, maxBetaSpeed: number) {
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
        const factors = this.cameraRotationSpeedFactors;
        const deltaTime = this._engine.getDeltaTime() / 1000.0;

        const speedAlpha = Math.abs(factors.alpha) < ArcRotateCameraWorkerInput._epsilon
            ? 0
            : this._maxAlphaSpeed * factors.alpha;
        const speedBeta = Math.abs(factors.beta) < ArcRotateCameraWorkerInput._epsilon
            ? 0
            : this._maxBetaSpeed * factors.beta;
        this.setCameraDeltaRotation(speedAlpha * deltaTime, -speedBeta * deltaTime);
    }

    setCameraDeltaRotation(deltaAlpha: number, deltaBeta: number) {
        this.camera.alpha += deltaAlpha;

        const newBeta = this.camera.beta + deltaBeta;
        this.camera.beta = Math.min(Math.max(newBeta, Env.camera.minBeta), Env.camera.maxBeta);
    }
}