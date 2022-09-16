export interface Vector {
    x: number;
    y: number;
    z: number;
}

export interface GamepadState {
    moveVector: Vector;
    lookVector: Vector;
    isCameraLookVector: boolean;
    triggerPressed: boolean;
}

export interface KeyboardState {
    moveVector: Vector;
    speedFactor: number;
    cameraDeltaAlpha: number;
    cameraDeltaBeta: number;
}

export type MsgOffscreen = {
    type: "offscreen";
    payload: {
        canvas: HTMLCanvasElement;
    }
}

export type MsgResize = {
    type: "resize";
    payload: {
        width: number;
        height: number;
    }
}

export type MsgLoad = {
    type: "loadFirstScene";
}

// Debug message
export type MsgNextScene = {
    type: "loadNextScene";
}

// Debug message
export type MsgInspector = {
    type: "inspector";
}

export type MsgGamepad = {
    type: "gamepad";
    payload: {
        state: GamepadState;
    }
}

export type MsgKeyboard = {
    type: "keyboard";
    payload: {
        state: KeyboardState;
    }
}

export type MsgToWorker = MsgOffscreen | MsgResize | MsgLoad | MsgInspector | MsgNextScene | MsgGamepad | MsgKeyboard;