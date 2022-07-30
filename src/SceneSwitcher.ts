import {Engine, Scene} from "@babylonjs/core";
import {Level1} from "./Level1";
import {Level2} from "./Level2";
import {GameScene} from "./GameScene";

export class SceneSwitcher {
    private readonly _scenes: GameScene[] = [];

    private _levelIndex: number = 0;

    private readonly _levelBuilders: {[index: number]: () => void} = {};

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this._levelBuilders[0] = () => {
            new Level1(engine, canvas);
        };
        this._levelBuilders[1] = () => {
            new Level2(engine, canvas);
        };

        //TODO DZZ Не создавать сразу!
        this._scenes.push(
            new Level1(engine, canvas),
        );
        this._scenes.push(
            new Level2(engine, canvas),
        );
    }

    async loadFirstSceneAsync(): Promise<void> {
        await this.currentScene.finalizeAsync();
        this._levelIndex = 0;
        await this.currentScene.initializeAsync();
    }

    async loadNextSceneAsync(): Promise<void> {
        await this.currentScene.finalizeAsync();
        this._levelIndex++;
        if (this._levelIndex >= this._scenes.length)
            this._levelIndex = 0;
        await this.currentScene.initializeAsync();
    }

    get currentScene() {
        return this._scenes[this._levelIndex];
    }
}