import {Behavior, Nullable, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {Observer} from "@babylonjs/core/Misc/observable";
import {PhysicsImpostor} from "@babylonjs/core/Physics/physicsImpostor";

export class InputBehavior implements Behavior<TransformNode> {
    private static readonly _p2rad = 0.01;

    private _target: TransformNode;

    readonly name: string;

    private readonly _scene: Scene;
    private readonly _physicsImpostor: PhysicsImpostor;

    private _beforeRenderObserver: Nullable<Observer<Scene>> = null;

    private _isForward: boolean;
    private _isBackward: boolean;
    private _isLeft: boolean;
    private _isRight: boolean;

    private _alpha?: number;

    constructor(scene: Scene, physicsImpostor: PhysicsImpostor) {
        this.name = "Player Input Behavior";
        this._scene = scene;
        this._physicsImpostor = physicsImpostor;
    }

    attach(target: TransformNode): void {
        this._target = target;

        window.addEventListener("keydown", this._keydownHandler);
        window.addEventListener("keyup", this._keyupHandler);
        window.addEventListener("pointermove", this._pointerMoveHandler);

        this._beforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
            this._target.rotation = new Vector3(0, this._alpha, 0);

            const speedValue = 0.25;
            const velocity = Vector3.Zero();
            if (this._isForward) {
                velocity.addInPlace(this._target.forward.scale(speedValue));
            }
            if (this._isBackward) {
                velocity.addInPlace(this._target.forward.scale(-speedValue));
            }
            if (this._isLeft) {
                velocity.addInPlace(this._target.right.scale(-speedValue));
            }
            if (this._isRight) {
                velocity.addInPlace(this._target.right.scale(speedValue));
            }
            const isMoving = this._isForward || this._isRight || this._isLeft || this._isBackward;
            this._physicsImpostor.friction = isMoving ? 0 : 1_000_000;
            if (isMoving) {
                this._physicsImpostor.setLinearVelocity(velocity);
            }
        });
    }

    detach(): void {
        window.removeEventListener("keydown", this._keydownHandler);
        window.removeEventListener("keyup", this._keyupHandler);
        window.removeEventListener("pointermove", this._pointerMoveHandler);

        if (this._beforeRenderObserver !== null)
            this._scene.onBeforeRenderObservable.remove(this._beforeRenderObserver);
    }

    init(): void {
    }

    private _keyHandler = (ev: KeyboardEvent, isDown: boolean) => {
        if (ev.key === "w") this._isForward = isDown;
        if (ev.key === "s") this._isBackward = isDown;
        if (ev.key === "a") this._isLeft = isDown;
        if (ev.key === "d") this._isRight = isDown;
    };

    private _keydownHandler = (ev: KeyboardEvent) => {
        this._keyHandler(ev, true);
    };

    private _keyupHandler = (ev: KeyboardEvent) => {
        this._keyHandler(ev, false);
    };

    private _pointerMoveHandler = (ev: PointerEvent) => {
        if (this._alpha === undefined) {
            this._alpha = 0.0;
        }
        this._alpha += ev.movementX * InputBehavior._p2rad;
    }
}