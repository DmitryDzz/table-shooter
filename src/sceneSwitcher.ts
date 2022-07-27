import {Engine, Scene} from "@babylonjs/core";
import {Level1} from "./level1";
import {Level2} from "./level2";

export class SceneSwitcher {
    private readonly _scenes: Scene[] = [];

    private _levelIndex: number = 0;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this._scenes.push(
            new Level1(engine, canvas),
        );
        this._scenes.push(
            new Level2(engine, canvas),
        );
    }

    nextLevel() {
        this._levelIndex++;
        if (this._levelIndex >= this._scenes.length)
            this._levelIndex = 0;
    }

    get currentScene() {
        return this._scenes[this._levelIndex];
    }
}