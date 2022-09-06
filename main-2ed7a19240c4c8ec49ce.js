/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/babylon/appInitializer.ts":
/*!***************************************!*\
  !*** ./src/babylon/appInitializer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppInitializer": () => (/* binding */ AppInitializer)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _sceneSwitcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sceneSwitcher */ "./src/babylon/sceneSwitcher.ts");


class AppInitializer {
    _engine;
    _sceneSwitcher;
    _canvas;
    init(canvas) {
        this._canvas = canvas;
        this._engine = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Engine(this._canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this._sceneSwitcher = new _sceneSwitcher__WEBPACK_IMPORTED_MODULE_1__.SceneSwitcher(this._engine, this._canvas);
        this._engine.runRenderLoop(() => {
            this._sceneSwitcher.currentScene?.render();
        });
    }
    resize(width, height) {
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
        }
        else {
            await scene.debugLayer.show({
                embedMode: false,
                overlay: true,
            });
        }
    }
    get currentScene() {
        return this._sceneSwitcher.currentScene;
    }
}


/***/ }),

/***/ "./src/babylon/env.ts":
/*!****************************!*\
  !*** ./src/babylon/env.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Env": () => (/* binding */ Env)
/* harmony export */ });
class Env {
    static camera = {
        near: 0.2,
        far: 10000,
        position: { x: 0, y: 0, z: 0 },
        defaultDirection: { x: 0, y: 0, z: 1 }
    };
}


/***/ }),

/***/ "./src/babylon/gameScene.ts":
/*!**********************************!*\
  !*** ./src/babylon/gameScene.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameScene": () => (/* binding */ GameScene)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env */ "./src/babylon/env.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/babylon/math.ts");



class GameScene extends _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Scene {
    light;
    camera;
    rootNode;
    constructor(engine, canvas, options) {
        super(engine, options);
        // Physics engine:
        const gravity = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: -9.81, z: 0 });
        const physicsPlugin = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.CannonJSPlugin();
        this.enablePhysics(gravity, physicsPlugin);
        // this.enablePhysics(gravity);
        this.camera = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.UniversalCamera('camera', (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)(_env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.position), this);
        this.camera.minZ = _env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.near;
        this.camera.maxZ = _env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.far;
        this.camera.setTarget((0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)(_env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.defaultDirection)
            .add((0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: -0.5, z: 0 })));
        //.add(createVector3(Env.camera.position)));
        this.camera.attachControl(canvas);
        // Turn on touch on mobile phones:
        // @ts-ignore
        this.camera.inputs.attached.mouse.touchEnabled = true;
        // Disable camera zoom and rotation in Oculus Browser in 2D mode:
        this.camera.inputs.removeByType("FreeCameraTouchInput");
        this.camera.inputs.removeByType("FreeCameraGamepadInput");
        // console.dir(this.camera.inputs);
        this.light = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.HemisphericLight('light', new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), this);
        // 3D Environment
        const environment = this.createDefaultEnvironment({
            enableGroundShadow: false,
            // groundYBias: 0.01,
            createGround: true,
            groundSize: 0.0001,
            groundOpacity: 0,
            setupImageProcessing: false,
            createSkybox: false,
        });
        if (!environment) {
            throw new Error("Cannot create environment");
        }
        this.rootNode = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.TransformNode("rootNode", this);
        this.rootNode.scaling = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0.02, y: 0.02, z: 0.02 });
    }
}


/***/ }),

/***/ "./src/babylon/level1.ts":
/*!*******************************!*\
  !*** ./src/babylon/level1.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Level1": () => (/* binding */ Level1)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _gameScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameScene */ "./src/babylon/gameScene.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/babylon/math.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/babylon/player.ts");
/* harmony import */ var _babylonjs_loaders_glTF__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/loaders/glTF */ "./node_modules/@babylonjs/loaders/glTF/index.js");
/* harmony import */ var _public_assets_environment_glb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../public/assets/environment.glb */ "./public/assets/environment.glb");






class Level1 extends _gameScene__WEBPACK_IMPORTED_MODULE_1__.GameScene {
    _player = undefined;
    constructor(engine, canvas, options) {
        super(engine, canvas, options);
    }
    async initializeAsync() {
        const loadedAsset = await _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.ImportMeshAsync(null, "", _public_assets_environment_glb__WEBPACK_IMPORTED_MODULE_5__, this);
        // await SceneLoader.ImportMeshAsync(null, "./assets/", "environment.glb", this);
        for (let mesh of loadedAsset.meshes) {
            mesh.parent = this.rootNode;
        }
        const ground = loadedAsset.meshes.find(x => x.name === "Ground");
        ground.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: -20, z: 30 });
        const homeYard = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.TransformNode("HomeYard", this);
        homeYard.parent = this.rootNode;
        homeYard.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: -8, y: -20, z: 30 });
        homeYard.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI / 4 * 3);
        const house = loadedAsset.meshes.find(x => x.name === "House");
        house.parent = homeYard;
        house.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: 0, z: 0 });
        const fence = loadedAsset.meshes.find(x => x.name === "Fence");
        fence.parent = homeYard;
        fence.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 5, y: 0, z: -7 });
        fence.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI);
        for (let i = 1; i <= 9; i++) {
            const f = fence.clone(`FenceA${i}`, fence.parent);
            f.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x - i, y: fence.position.y, z: fence.position.z });
        }
        for (let i = 1; i <= 14; i++) {
            const f = fence.clone(`FenceB${i}`, fence.parent);
            f.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI / 2);
            f.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x - 10, y: fence.position.y, z: fence.position.z - 1 + i });
        }
        for (let i = 1; i <= 10; i++) {
            const f = fence.clone(`FenceC${i}`, fence.parent);
            f.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI);
            f.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x - 11 + i, y: fence.position.y, z: fence.position.z + 14 });
        }
        for (let i = 1; i <= 14; i++) {
            const f = fence.clone(`FenceD${i}`, fence.parent);
            f.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), -Math.PI / 2);
            f.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x, y: fence.position.y, z: fence.position.z + 15 - i });
        }
        const barn = loadedAsset.meshes.find(x => x.name === "Barn");
        barn.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 10, y: -20, z: 30 });
        barn.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), -Math.PI / 4 * 3);
        const streetlight = loadedAsset.meshes.find(x => x.name === "Streetlight");
        streetlight.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 1, y: -20, z: 27 });
        streetlight.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI);
        // Physics:
        for (let mesh of loadedAsset.meshes) {
            this._getRidOfParentNodes(mesh);
        }
        ground.physicsImpostor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.PhysicsImpostor(ground, _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, this);
        this._player = new _player__WEBPACK_IMPORTED_MODULE_3__.Player(this);
        await this._player.initializeAsync();
        this._player.position = this._player.position.add(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3(-12, 0, 0));
    }
    _getRidOfParentNodes(mesh) {
        const worldMatrix = mesh.computeWorldMatrix(true).clone();
        mesh.parent = null;
        mesh.freezeWorldMatrix(worldMatrix, true);
        mesh.unfreezeWorldMatrix();
    }
    setGamepadState(state) {
        this._player?.setGamepadState(state);
    }
}


/***/ }),

/***/ "./src/babylon/level2.ts":
/*!*******************************!*\
  !*** ./src/babylon/level2.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Level2": () => (/* binding */ Level2)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _gameScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameScene */ "./src/babylon/gameScene.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/babylon/math.ts");



class Level2 extends _gameScene__WEBPACK_IMPORTED_MODULE_1__.GameScene {
    constructor(engine, canvas, options) {
        super(engine, canvas, options);
        const box = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.MeshBuilder.CreateBox("box", { size: 1 }, this);
        box.position = (0,_math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: 0, z: 2 });
    }
    async initializeAsync() {
    }
    setGamepadState(_state) {
    }
}


/***/ }),

/***/ "./src/babylon/math.ts":
/*!*****************************!*\
  !*** ./src/babylon/math.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVector3": () => (/* binding */ createVector3)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math.vector */ "./node_modules/@babylonjs/core/Maths/math.vector.js");

const createVector3 = (vector) => {
    const { x, y, z } = vector;
    return new _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, z);
};


/***/ }),

/***/ "./src/babylon/player.ts":
/*!*******************************!*\
  !*** ./src/babylon/player.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./src/babylon/math.ts");
/* harmony import */ var _public_assets_player_glb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../public/assets/player.glb */ "./public/assets/player.glb");



class Player {
    _scene;
    _mesh;
    _scaling = 0.02;
    _position = (0,_math__WEBPACK_IMPORTED_MODULE_1__.createVector3)({ x: 0, y: -20 + 1 + 7.25, z: 20 });
    constructor(scene) {
        this._scene = scene;
    }
    async initializeAsync() {
        const loadedAsset = await _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.ImportMeshAsync(null, "", _public_assets_player_glb__WEBPACK_IMPORTED_MODULE_2__, this._scene);
        const position = this._position;
        const mass = 1;
        loadedAsset.meshes.forEach(m => {
            m.isVisible = m.name.indexOf("collider") === -1;
            if (m.name === "feet-collider") {
                this._mesh = m;
                m.name = "player";
                m.parent = null;
                m.position = position.scale(this._scaling);
                m.scaling.scaleInPlace(this._scaling);
                m.physicsImpostor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.PhysicsImpostor(m, _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.PhysicsImpostor.BoxImpostor, { mass, friction: 0 }, this._scene);
                // const inputBehavior = new InputBehavior(this._scene, m.physicsImpostor);
                // m.addBehavior(inputBehavior, true);
                // const gamepadBehavior = new GamepadBehavior(this._scene, m.physicsImpostor);
                // m.addBehavior(gamepadBehavior, true);
            }
            else if (m.name === "body-collider") {
                //TODO DZZ Если раскомментарить, то при падении меш покачивается. Может поиграть опциями?
                //m.physicsImpostor = new PhysicsImpostor(m, PhysicsImpostor.NoImpostor, { mass: 0 }, this._scene);
            }
        });
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value.clone();
        this._mesh.position = this._position.scale(this._scaling);
    }
    _lengthSquared(v) {
        return v.x * v.x + v.y * v.y + v.z * v.z;
    }
    setGamepadState({ moveVector, lookVector }) {
        if (this._mesh?.physicsImpostor === undefined)
            return;
        const isMoving = this._lengthSquared(moveVector) > 0.01;
        const isFacing = this._lengthSquared(lookVector) > 0.01;
        let faceVector = null;
        if (isFacing)
            faceVector = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3(lookVector.x, lookVector.y, lookVector.z);
        else if (isMoving)
            faceVector = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3(moveVector.x, moveVector.y, moveVector.z);
        if (faceVector !== null) {
            const toQuaternion = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromLookDirectionRH(faceVector, _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up());
            const speed = 0.01;
            this._mesh.rotationQuaternion = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Slerp(this._mesh.rotationQuaternion, toQuaternion, speed * this._scene.deltaTime);
        }
        const speedValue = 0.25;
        const velocity = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3(moveVector.x, moveVector.y, moveVector.z).scale(speedValue);
        this._mesh.physicsImpostor.friction = isMoving ? 0 : 1000000;
        if (isMoving) {
            this._mesh.physicsImpostor.setLinearVelocity(velocity);
        }
    }
}


/***/ }),

/***/ "./src/babylon/sceneSwitcher.ts":
/*!**************************************!*\
  !*** ./src/babylon/sceneSwitcher.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SceneSwitcher": () => (/* binding */ SceneSwitcher)
/* harmony export */ });
/* harmony import */ var _level1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level1 */ "./src/babylon/level1.ts");
/* harmony import */ var _level2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level2 */ "./src/babylon/level2.ts");


class SceneSwitcher {
    _currentScene = null;
    _levelIndex = 0;
    _levelBuilders = {};
    constructor(engine, canvas) {
        // A dictionary: [index]: <level constructor>
        this._levelBuilders[0] = () => {
            return new _level1__WEBPACK_IMPORTED_MODULE_0__.Level1(engine, canvas);
        };
        this._levelBuilders[1] = () => {
            return new _level2__WEBPACK_IMPORTED_MODULE_1__.Level2(engine, canvas);
        };
    }
    async loadFirstSceneAsync() {
        await this.currentScene?.dispose();
        this._currentScene = null;
        this._levelIndex = 0;
        this._currentScene = this._levelBuilders[this._levelIndex]();
        await this._currentScene.initializeAsync();
    }
    async loadNextSceneAsync() {
        await this.currentScene?.dispose();
        this._currentScene = null;
        this._levelIndex++;
        if (this._levelIndex >= Object.keys(this._levelBuilders).length)
            this._levelIndex = 0;
        this._currentScene = this._levelBuilders[this._levelIndex]();
        await this.currentScene.initializeAsync();
    }
    get currentScene() {
        return this._currentScene;
    }
}


/***/ }),

/***/ "./src/worker.ts":
/*!***********************!*\
  !*** ./src/worker.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babylon_appInitializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./babylon/appInitializer */ "./src/babylon/appInitializer.ts");

const scope = globalThis;
console.log("%cUnnamed Shooter Worker", "background: yellowgreen");
const appInitializer = new _babylon_appInitializer__WEBPACK_IMPORTED_MODULE_0__.AppInitializer();
globalThis.CANNON = __webpack_require__(/*! cannon */ "./node_modules/cannon/build/cannon.js");
scope.onmessage = async (ev) => {
    switch (ev.data.type) {
        case "offscreen":
            const msgOffscreen = ev.data;
            appInitializer.init(msgOffscreen.payload.canvas);
            break;
        case "resize":
            const msgResize = ev.data;
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
            const msgGamepad = ev.data;
            if (appInitializer.currentScene !== null) {
                appInitializer.currentScene.setGamepadState(msgGamepad.payload.state);
            }
            break;
    }
};


/***/ }),

/***/ "./public/assets/environment.glb":
/*!***************************************!*\
  !*** ./public/assets/environment.glb ***!
  \***************************************/
/***/ ((module) => {

module.exports = "assets/75d64c1807a129a70e00.glb";

/***/ }),

/***/ "./public/assets/player.glb":
/*!**********************************!*\
  !*** ./public/assets/player.glb ***!
  \**********************************/
/***/ ((module) => {

module.exports = "assets/aab888a9e867345ac95f.glb";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_cannon_build_cannon_js-node_modules_babylonjs_core_index_js-node_modules-954a49"], () => (__webpack_require__("./src/worker.ts")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "main-" + "8f2a4a87cda3fcd425e3" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_worker_ts": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkshooter"] = self["webpackChunkshooter"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e("vendors-node_modules_cannon_build_cannon_js-node_modules_babylonjs_core_index_js-node_modules-954a49").then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=main-2ed7a19240c4c8ec49ce.js.map