import {MsgInspector, MsgLoad, MsgNextScene, MsgOffscreen, MsgResize} from "./messages";
import {GamepadInputManager} from "./input/gamepadInputManager";
import {InputManager} from "./input/inputManager";
import {KeyboardInputManager} from "./input/keyboardInputManager";

class App {
    readonly worker: Worker;

    constructor() {
        console.log(`%c Table Shooter App (v${process.env.APP_VER}) `, "background: lime");

        // create the canvas html element and attach it to the webpage
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        if ("OffscreenCanvas" in window) {
            // @ts-ignore
            const offscreen = canvas.transferControlToOffscreen();

            this.worker = new Worker(new URL('./worker.ts', import.meta.url));
            const msgOffscreen: MsgOffscreen = {type: "offscreen", payload: {canvas: offscreen}};
            this.worker.postMessage(msgOffscreen, [offscreen]);

            const resizeHandler = () => {
                const msgResize: MsgResize =
                    {type: "resize", payload: {width: window.innerWidth, height: window.innerHeight}};
                this.worker.postMessage(msgResize);
            };

            window.addEventListener("resize", resizeHandler);

            window.addEventListener("load", () => {
                const msgLoad: MsgLoad = {type: "loadFirstScene"};
                this.worker.postMessage(msgLoad);

                // To update resolution:
                resizeHandler();
            });

            window.addEventListener("keydown", async (ev) => {
                // Hide/show the Inspector:
                if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyI") {
                    const msgInspector: MsgInspector = {type: "inspector"};
                    this.worker.postMessage(msgInspector);
                }
                // Load next scene:
                if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyN") {
                    const msgNextScene: MsgNextScene = {type: "loadNextScene"};
                    this.worker.postMessage(msgNextScene);
                }
            });
        } else {
            canvas.hidden = true;
            const div = document.createElement("div");
            div.innerText = "Unfortunately your browser doesn't support Offscreen canvas API"
            document.body.appendChild(div);
            return;
        }
    }
}

const app = new App();

const inputManagers: InputManager[] = [
    new KeyboardInputManager(app.worker),
    new GamepadInputManager(app.worker),
];
const updateHandler = () => {
    for (let inputManager of inputManagers) {
        inputManager.update();
    }
    requestAnimationFrame(updateHandler);
}
updateHandler();