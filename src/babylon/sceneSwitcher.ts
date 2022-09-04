import {Engine} from "@babylonjs/core";
import {Level1} from "./level1";
import {Level2} from "./level2";
import {GameScene} from "./gameScene";

export class SceneSwitcher {
    private _currentScene: GameScene | null = null;
    private _levelIndex: number = 0;

    private readonly _levelBuilders: {[index: number]: () => GameScene} = {};

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        // A dictionary: [index]: <level constructor>
        this._levelBuilders[0] = (): GameScene => {
            return new Level1(engine, canvas);
        };
        this._levelBuilders[1] = (): GameScene => {
            return new Level2(engine, canvas);
        };
    }

    async loadFirstSceneAsync(): Promise<void> {
        await this.currentScene?.dispose();
        this._currentScene = null;

        this._levelIndex = 0;

        this._currentScene = this._levelBuilders[this._levelIndex]();
        await this._currentScene.initializeAsync();
    }

    async loadNextSceneAsync(): Promise<void> {
        await this.currentScene?.dispose();
        this._currentScene = null;

        this._levelIndex++;
        if (this._levelIndex >= Object.keys(this._levelBuilders).length)
            this._levelIndex = 0;

        this._currentScene = this._levelBuilders[this._levelIndex]();
        await this.currentScene.initializeAsync();
    }

    get currentScene(): GameScene | null {
        return this._currentScene;
    }
}