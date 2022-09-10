export interface Vector {
    x: number;
    y: number;
    z: number;
}

export interface GamepadState {
    moveVector: Vector;
    lookVector: Vector;
    bumperPressed: boolean;
    triggerPressed: boolean;
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

export type MsgToWorker = MsgOffscreen | MsgResize | MsgLoad | MsgInspector | MsgNextScene | MsgGamepad;