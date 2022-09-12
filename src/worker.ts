import {MsgGamepad, MsgOffscreen, MsgResize, MsgToWorker} from "./messages";
import {AppInitializer} from "./babylon/appInitializer";

const scope = (globalThis as unknown) as DedicatedWorkerGlobalScope;

console.log("%c Table Shooter Worker ", "background: yellowgreen");

const appInitializer = new AppInitializer();

globalThis.CANNON = require("cannon");

scope.onmessage = async (ev: MessageEvent<MsgToWorker>) => {
    switch (ev.data.type) {
        case "offscreen":
            const msgOffscreen: MsgOffscreen = ev.data;
            appInitializer.init(msgOffscreen.payload.canvas);
            break;
        case "resize":
            const msgResize: MsgResize = ev.data;
            appInitializer.resize(msgResize.payload.width, msgResize.payload.height);
            break;
        case "loadFirstScene":
            await appInitializer.loadFirstSceneAsync();
            break;
        case "loadNextScene":
            await appInitializer.loadNextSceneAsync();
            break;
        case "inspector":
            await appInitializer.switchInspector();
            break;
        case "gamepad":
            const msgGamepad: MsgGamepad = ev.data;
            if (appInitializer.currentScene !== null) {
                appInitializer.currentScene.setGamepadState(msgGamepad.payload.state);
            }
            break;
    }
}