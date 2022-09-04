import {MsgInspector, MsgLoad, MsgNextScene, MsgOffscreen, MsgResize} from "./messages";

class App {
    constructor() {
        console.log("%cUnnamed Shooter App", "background: lime");

        // create the canvas html element and attach it to the webpage
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        if ("OffscreenCanvas" in window) {
            // @ts-ignore
            const offscreen = canvas.transferControlToOffscreen();

            const worker = new Worker(new URL('./worker.ts', import.meta.url));
            const msgOffscreen: MsgOffscreen = {type: "offscreen", payload: {canvas: offscreen}};
            worker.postMessage(msgOffscreen, [offscreen]);

            const resizeHandler = () => {
                const msgResize: MsgResize =
                    {type: "resize", payload: {width: window.innerWidth, height: window.innerHeight}};
                worker.postMessage(msgResize);
            };

            window.addEventListener("resize", resizeHandler);

            window.addEventListener("load", () => {
                const msgLoad: MsgLoad = {type: "loadFirstScene"};
                worker.postMessage(msgLoad);

                // To update resolution:
                resizeHandler();
            });

            window.addEventListener("keydown", async (ev) => {
                // Hide/show the Inspector:
                if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyI") {
                    const msgInspector: MsgInspector = {type: "inspector"};
                    worker.postMessage(msgInspector);
                }
                // Load next scene:
                if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyN") {
                    const msgNextScene: MsgNextScene = {type: "loadNextScene"};
                    worker.postMessage(msgNextScene);
                }
            });
        } else {
            canvas.hidden = true;
            const div = document.createElement("div");
            div.innerText = "Unfortunately your browser doesn't support Offscreen canvas API"
            document.body.appendChild(div);
            return;
        }

        // window.CANNON = require("cannon");

        // const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        // const sceneSwitcher = new SceneSwitcher(engine, canvas);
        //
        // window.addEventListener("load", async () => {
        //     await sceneSwitcher.loadFirstSceneAsync();
        // });
        //
        // // hide/show the Inspector
        // window.addEventListener("keydown", async (ev) => {
        //     const scene = sceneSwitcher.currentScene;
        //     if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyI") {
        //         if (scene.debugLayer.isVisible()) {
        //             scene.debugLayer.hide();
        //         } else {
        //             await scene.debugLayer.show({
        //                 embedMode: false,
        //                 overlay: true,
        //             });
        //         }
        //     }
        //
        //     if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyN") {
        //         await sceneSwitcher.loadNextSceneAsync();
        //     }
        // });
        //
        // window.addEventListener("resize", () => {
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerHeight;
        //     engine.resize();
        // });
        //
        // // run the main render loop
        // engine.runRenderLoop(() => {
        //     sceneSwitcher.currentScene?.render();
        // });
    }
}

new App();