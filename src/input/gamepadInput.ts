import {GamepadState, MsgGamepad} from "../messages";

export class GamepadInput {
    private readonly _worker: Worker;

    constructor(worker: Worker) {
        this._worker = worker;
        window.addEventListener("gamepadconnected", this._gamepadConnectedHandler);
        window.addEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);
    }

    // noinspection JSUnusedGlobalSymbols
    dispose() {
        window.removeEventListener("gamepadconnected", this._gamepadConnectedHandler);
        window.removeEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);
    }

    update() {
        const message: MsgGamepad = {
            type: "gamepad",
            payload: {
                state: this._readGamepads(),
            },
        };
        this._worker.postMessage(message);
    }

    private _gamepadConnectedHandler = (_ev: GamepadEvent) => {
        console.info("Gamepad connected");
    };

    private _gamepadDisconnectedHandler = (_ev: GamepadEvent) => {
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

        const moveVector = axes.length >= 2
            ? {x: axes[0], y: 0, z: -axes[1]}
            : {x: 0, y: 0, z: 0};
        const lookVector = axes.length >= 4
            ? {x: axes[2], y: 0, z: -axes[3]}
            : {x: 0, y: 0, z: 0};
        return {moveVector, lookVector};
    }
}