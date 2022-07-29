import {Engine, Scene} from "@babylonjs/core";
import {Level1} from "./Level1";
import {Level2} from "./Level2";
import {GameScene} from "./GameScene";

export class SceneSwitcher {
    private readonly _scenes: GameScene[] = [];

    private _levelIndex: number = 0;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this._scenes.push(
            new Level1(engine, canvas),
        );
        this._scenes.push(
            new Level2(engine, canvas),
        );
    }

    async loadNextSceneAsync(): Promise<void> {
        this._levelIndex++;
        if (this._levelIndex >= this._scenes.length)
            this._levelIndex = 0;
    }

    get currentScene() {
        return this._scenes[this._levelIndex];
    }
}