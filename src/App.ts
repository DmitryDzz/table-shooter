import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {CannonJSPlugin, Engine} from "@babylonjs/core";
import {SceneSwitcher} from "./SceneSwitcher";
import {createVector3} from "./Math";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

        // Physics engine:
        // const gravity = createVector3({x: 0, y: -9.81, z: 0});
        // const physicsPlugin = new CannonJSPlugin();

        const sceneSwitcher = new SceneSwitcher(engine, canvas);

        window.addEventListener("load", async () => {
            await sceneSwitcher.loadFirstSceneAsync();
        });

        // hide/show the Inspector
        window.addEventListener("keydown", async (ev) => {
            const scene = sceneSwitcher.currentScene;
            if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyI") {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    await scene.debugLayer.show({
                        embedMode: false,
                        overlay: true,
                    });
                }
            }

            if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyN") {
                await sceneSwitcher.loadNextSceneAsync();
            }
        });

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            engine.resize();
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            sceneSwitcher.currentScene.render();
        });
    }
}

new App();