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

export type MsgToWorker = MsgOffscreen | MsgResize | MsgLoad | MsgInspector | MsgNextScene;