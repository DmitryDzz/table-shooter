import {InputManager} from "./inputManager";

export class KeyboardInputManager implements InputManager {
    private readonly _worker: Worker;

    constructor(worker: Worker) {
        this._worker = worker;
        // window.addEventListener("gamepadconnected", this._gamepadConnectedHandler);
        // window.addEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);
    }

    // noinspection JSUnusedGlobalSymbols
    dispose() {
        // window.removeEventListener("gamepadconnected", this._gamepadConnectedHandler);
        // window.removeEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);
    }

    update() {
        // const message: MsgGamepad = {
        //     type: "gamepad",
        //     payload: {
        //         state: this._readGamepads(),
        //     },
        // };
        // this._worker.postMessage(message);
    }
}