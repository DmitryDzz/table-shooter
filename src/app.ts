import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine} from "@babylonjs/core";
import {SceneSwitcher} from "./sceneSwitcher";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        const engine = new Engine(canvas, true);
        const sceneSwitcher = new SceneSwitcher(engine, canvas);

        // hide/show the Inspector
        window.addEventListener("keydown", async (ev) => {
            const scene = sceneSwitcher.currentScene;
            // Shift+Ctrl+Alt+I
            if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyI") {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    await scene.debugLayer.show();
                }
            }

            if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyN") {
                sceneSwitcher.nextLevel();
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            sceneSwitcher.currentScene.render();
        });
    }
}

new App();