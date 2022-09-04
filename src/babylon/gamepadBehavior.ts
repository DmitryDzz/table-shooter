import {Behavior, Nullable, Quaternion, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {Observer} from "@babylonjs/core/Misc/observable";
import {PhysicsImpostor} from "@babylonjs/core/Physics/physicsImpostor";

interface GamepadState {
    moveVector: Vector3;
    lookVector: Vector3;
}

export class GamepadBehavior implements Behavior<TransformNode> {
    private _target: TransformNode;

    readonly name: string;

    private readonly _scene: Scene;
    private readonly _physicsImpostor: PhysicsImpostor;

    private _beforeRenderObserver: Nullable<Observer<Scene>> = null;

    constructor(scene: Scene, physicsImpostor: PhysicsImpostor) {
        this.name = "Player Gamepad Behavior";
        this._scene = scene;
        this._physicsImpostor = physicsImpostor;
    }

    attach(target: TransformNode): void {
        this._target = target;

        window.addEventListener("gamepadconnected", this._gamepadConnectedHandler);
        window.addEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);

        this._beforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
            const {moveVector, lookVector} = this._readGamepads();

            const isMoving = moveVector.lengthSquared() > 0.01;
            const isFacing = lookVector.lengthSquared() > 0.01;
            let faceVector: Vector3 | null = null;
            if (isFacing) faceVector = lookVector;
            else if (isMoving) faceVector = moveVector;
            if (faceVector !== null) {
                const toQuaternion = Quaternion.FromLookDirectionRH(faceVector, Vector3.Up());
                const speed = 0.01;
                this._target.rotationQuaternion = Quaternion.Slerp(
                    this._target.rotationQuaternion, toQuaternion, speed * this._scene.deltaTime);
            }

            const speedValue = 0.25;
            const velocity = moveVector.scale(speedValue);
            this._physicsImpostor.friction = isMoving ? 0 : 1_000_000;
            if (isMoving) {
                this._physicsImpostor.setLinearVelocity(velocity);
            }
        });
    }

    detach(): void {
        window.removeEventListener("gamepadconnected", this._gamepadConnectedHandler);
        window.removeEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);

        if (this._beforeRenderObserver !== null)
            this._scene.onBeforeRenderObservable.remove(this._beforeRenderObserver);
    }

    init(): void {
    }

    private _gamepadConnectedHandler = (ev: GamepadEvent) => {
        console.info("Gamepad connected");
    };

    private _gamepadDisconnectedHandler = (ev: GamepadEvent) => {
        console.info("Gamepad disconnected");
    };

    private _readGamepads(): GamepadState {
        // The first four axes are: moveX, moveZ, lookX, and lookZ.
        const axes: number[] = [];
        for (let gamepad of navigator.getGamepads()) {
            if (gamepad === null) continue;
            for (let value of gamepad.axes) {
                axes.push(value);
                if (axes.length >= 4) break;
            }
            if (axes.length >= 4) break;
        }

        const moveVector = Vector3.Zero();
        if (axes.length >= 2)
            moveVector.set(axes[0], 0, -axes[1]);

        const lookVector = Vector3.Zero();
        if (axes.length >= 4)
            lookVector.set(axes[2], 0, -axes[3]);

        return {moveVector, lookVector};
    }
}