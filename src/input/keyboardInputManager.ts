import {InputManager} from "./inputManager";
import {MsgKeyboard, Vector} from "../messages";

export class KeyboardInputManager implements InputManager {
    private static readonly _p2rad = 0.01;

    private readonly _worker: Worker;

    private _isForward: boolean;
    private _isBackward: boolean;
    private _isLeft: boolean;
    private _isRight: boolean;

    private _isShiftPressed: boolean;
    private _isCtrlPressed: boolean;

    private _cameraDeltaAlpha: number = 0;
    private _cameraDeltaBeta: number = 0;

    // private _prevCtrlPressed?: boolean = undefined;
    private _isPointerDown: boolean = false;

    constructor(worker: Worker) {
        this._worker = worker;
        window.addEventListener("keydown", this._keydownHandler);
        window.addEventListener("keyup", this._keyupHandler);
        window.addEventListener("pointermove", this._pointerMoveHandler);
        window.addEventListener("pointerdown", this._pointerDownHandler);
        window.addEventListener("pointerup", this._pointerUpHandler);
        window.addEventListener("contextmenu", this._contextMenuHandler);
    }

    // noinspection JSUnusedGlobalSymbols
    dispose() {
        window.removeEventListener("keydown", this._keydownHandler);
        window.removeEventListener("keyup", this._keyupHandler);
        window.removeEventListener("pointermove", this._pointerMoveHandler);
        window.removeEventListener("pointerdown", this._pointerDownHandler);
        window.removeEventListener("pointerup", this._pointerUpHandler);
        window.removeEventListener("contextmenu", this._contextMenuHandler);
    }

    update() {
        const moveVector: Vector = {x: 0, y: 0, z: 0};
        if (this._isForward)
            moveVector.z -= 1.0;
        if (this._isBackward)
            moveVector.z += 1.0;
        if (this._isLeft)
            moveVector.x += 1.0;
        if (this._isRight)
            moveVector.x -= 1.0;
        const message: MsgKeyboard = {
            type: "keyboard",
            payload: {
                state: {
                    moveVector,
                    speedFactor: this._isShiftPressed ? 1.0 : 0.5,
                    cameraDelta: {
                        alpha: this._cameraDeltaAlpha,
                        beta: this._cameraDeltaBeta,
                    },
                },
            },
        };
        this._cameraDeltaAlpha = 0;
        this._cameraDeltaBeta = 0;
        // console.log(message.payload.state.moveVector, this._isShiftPressed);
        this._worker.postMessage(message);
    }

    get inUse(): boolean {
        return this._isForward || this._isBackward || this._isLeft || this._isRight ||
            this._isShiftPressed || this._isCtrlPressed;
    }

    private _keyHandler = (ev: KeyboardEvent, isDown: boolean) => {
        const keyCode = ev.code;
        if (keyCode === "KeyW") this._isForward = isDown;
        if (keyCode === "KeyS") this._isBackward = isDown;
        if (keyCode === "KeyA") this._isLeft = isDown;
        if (keyCode === "KeyD") this._isRight = isDown;
    };

    private _shiftHandler = (ev: KeyboardEvent | PointerEvent) => {
        this._isShiftPressed = ev.shiftKey;
    };

    private _keydownHandler = (ev: KeyboardEvent) => {
        this._keyHandler(ev, true);
        this._shiftHandler(ev);
    };

    private _keyupHandler = (ev: KeyboardEvent) => {
        this._keyHandler(ev, false);
        this._shiftHandler(ev);
    };

    // private _pointerHandler = (ev: PointerEvent) => {
    //     const isCtrlPressed: boolean = ev.ctrlKey;
    //     if (this._prevCtrlPressed === undefined) {
    //         this._prevCtrlPressed = isCtrlPressed;
    //         this._isCtrlPressed = isCtrlPressed;
    //     } else {
    //         if (isCtrlPressed !== this._prevCtrlPressed) {
    //             this._prevCtrlPressed = isCtrlPressed;
    //             this._isCtrlPressed = isCtrlPressed;
    //             // console.log(`Ctrl: ${this._isCtrlPressed}`);
    //         }
    //     }
    // };

    private _pointerMoveHandler = (ev: PointerEvent) => {
        if (!this._isPointerDown) return;
        this._shiftHandler(ev);
        this._cameraDeltaAlpha = -ev.movementX * KeyboardInputManager._p2rad;
        this._cameraDeltaBeta = -ev.movementY * KeyboardInputManager._p2rad;
    };

    private _pointerDownHandler = (ev: PointerEvent) => {
        this._isPointerDown = true;
    };

    private _pointerUpHandler = (ev: PointerEvent) => {
        this._isPointerDown = false;
        this._cameraDeltaAlpha = 0;
        this._cameraDeltaBeta = 0;
    };

    private _contextMenuHandler = (ev: PointerEvent) => {
        if (ev.pointerType !== "mouse") {
            ev.preventDefault();
        }
    };
}