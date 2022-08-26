import {Behavior, Nullable, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {Observer} from "@babylonjs/core/Misc/observable";
import {PhysicsImpostor} from "@babylonjs/core/Physics/physicsImpostor";

export class InputBehavior implements Behavior<TransformNode> {
    private _target: TransformNode;

    readonly name: string;

    private readonly _scene: Scene;
    private readonly _physicsImpostor: PhysicsImpostor;

    private _beforeRenderObserver: Nullable<Observer<Scene>> = null;

    private _isForward: boolean;
    private _isBackward: boolean;

    constructor(scene: Scene, physicsImpostor: PhysicsImpostor) {
        this.name = "Player Input Behavior";
        this._scene = scene;
        this._physicsImpostor = physicsImpostor;
    }

    attach(target: TransformNode): void {
        this._target = target;

        window.addEventListener("keydown", this._keydownHandler);
        window.addEventListener("keyup", this._keyupHandler);

        this._beforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
            if (this._isForward) {
                this._physicsImpostor.friction = 0;
                this._physicsImpostor.setLinearVelocity(new Vector3(0.25, 0, 0));
                // console.log("=>");
            } else if (this._isBackward) {
                this._physicsImpostor.friction = 0;
                this._physicsImpostor.setLinearVelocity(new Vector3(-0.25, 0, 0));
                // console.log("<=");
            } else if (!this._isForward && !this._isBackward) {
                // const currentVelocity = this._physicsImpostor.getLinearVelocity();
                // currentVelocity.y = 0;
                // currentVelocity.z = 0;
                // this._physicsImpostor.setLinearVelocity(currentVelocity);
                this._physicsImpostor.friction = 1000000;
            }
        });
    }

    detach(): void {
        window.removeEventListener("keydown", this._keydownHandler);
        window.removeEventListener("keyup", this._keyupHandler);

        if (this._beforeRenderObserver !== null)
            this._scene.onBeforeRenderObservable.remove(this._beforeRenderObserver);
    }

    init(): void {
    }

    private _keydownHandler = (ev: KeyboardEvent) => {
        if (ev.key === "w") this._isForward = true;
        if (ev.key === "s") this._isBackward = true;
    };

    private _keyupHandler = (ev: KeyboardEvent) => {
        if (ev.key === "w") this._isForward = false;
        if (ev.key === "s") this._isBackward = false;
    };
}