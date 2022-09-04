// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {Engine} from "@babylonjs/core";
import {SceneSwitcher} from "./sceneSwitcher";

export class AppInitializer {
    private _engine: Engine | undefined;
    private _sceneSwitcher: SceneSwitcher | undefined;
    private _canvas: HTMLCanvasElement | undefined;

    init(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._engine = new Engine(this._canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this._sceneSwitcher = new SceneSwitcher(this._engine, this._canvas);

        this._engine.runRenderLoop(() => {
            this._sceneSwitcher.currentScene?.render();
        });
    }

    resize(width: number, height: number) {
        this._canvas.width = width;
        this._canvas.height = height;
        this._engine.resize();
    }

    async loadFirstSceneAsync() {
        await this._sceneSwitcher.loadFirstSceneAsync();
    }

    async loadNextSceneAsync() {
        await this._sceneSwitcher.loadNextSceneAsync();
    }

    async switchInspector() {
        const scene = this._sceneSwitcher.currentScene;
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            await scene.debugLayer.show({
                embedMode: false,
                overlay: true,
            });
        }
    }
}