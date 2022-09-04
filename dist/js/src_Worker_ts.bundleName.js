/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Env.ts":
/*!********************!*\
  !*** ./src/Env.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Env": () => (/* binding */ Env)
/* harmony export */ });
class Env {
}
Env.camera = {
    near: 0.2,
    far: 10000,
    position: { x: 0, y: 0, z: 0 },
    defaultDirection: { x: 0, y: 0, z: 1 }
};


/***/ }),

/***/ "./src/GameScene.ts":
/*!**************************!*\
  !*** ./src/GameScene.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameScene": () => (/* binding */ GameScene)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _Env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Env */ "./src/Env.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math */ "./src/Math.ts");



class GameScene extends _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(engine, canvas, options) {
        super(engine, options);
        // Physics engine:
        const gravity = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: -9.81, z: 0 });
        const physicsPlugin = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.CannonJSPlugin();
        this.enablePhysics(gravity, physicsPlugin);
        // this.enablePhysics(gravity);
        this.camera = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.UniversalCamera('camera', (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)(_Env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.position), this);
        this.camera.minZ = _Env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.near;
        this.camera.maxZ = _Env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.far;
        this.camera.setTarget((0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)(_Env__WEBPACK_IMPORTED_MODULE_1__.Env.camera.defaultDirection)
            .add((0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: -0.5, z: 0 })));
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
        this.rootNode.scaling = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0.02, y: 0.02, z: 0.02 });
    }
}


/***/ }),

/***/ "./src/Level1.ts":
/*!***********************!*\
  !*** ./src/Level1.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Level1": () => (/* binding */ Level1)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _GameScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameScene */ "./src/GameScene.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math */ "./src/Math.ts");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ "./src/Player.ts");
/* harmony import */ var _babylonjs_loaders_glTF__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/loaders/glTF */ "./node_modules/@babylonjs/loaders/glTF/index.js");
/* harmony import */ var _public_assets_environment_glb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../public/assets/environment.glb */ "./public/assets/environment.glb");
/* harmony import */ var _public_assets_environment_glb__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_public_assets_environment_glb__WEBPACK_IMPORTED_MODULE_5__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






class Level1 extends _GameScene__WEBPACK_IMPORTED_MODULE_1__.GameScene {
    constructor(engine, canvas, options) {
        super(engine, canvas, options);
    }
    initializeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const loadedAsset = yield _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.ImportMeshAsync(null, "", (_public_assets_environment_glb__WEBPACK_IMPORTED_MODULE_5___default()), this);
            // await SceneLoader.ImportMeshAsync(null, "./assets/", "environment.glb", this);
            for (let mesh of loadedAsset.meshes) {
                mesh.parent = this.rootNode;
            }
            const ground = loadedAsset.meshes.find(x => x.name === "Ground");
            ground.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: -20, z: 30 });
            const homeYard = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.TransformNode("HomeYard", this);
            homeYard.parent = this.rootNode;
            homeYard.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: -8, y: -20, z: 30 });
            homeYard.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI / 4 * 3);
            const house = loadedAsset.meshes.find(x => x.name === "House");
            house.parent = homeYard;
            house.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: 0, z: 0 });
            const fence = loadedAsset.meshes.find(x => x.name === "Fence");
            fence.parent = homeYard;
            fence.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 5, y: 0, z: -7 });
            fence.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI);
            for (let i = 1; i <= 9; i++) {
                const f = fence.clone(`FenceA${i}`, fence.parent);
                f.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x - i, y: fence.position.y, z: fence.position.z });
            }
            for (let i = 1; i <= 14; i++) {
                const f = fence.clone(`FenceB${i}`, fence.parent);
                f.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI / 2);
                f.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x - 10, y: fence.position.y, z: fence.position.z - 1 + i });
            }
            for (let i = 1; i <= 10; i++) {
                const f = fence.clone(`FenceC${i}`, fence.parent);
                f.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI);
                f.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x - 11 + i, y: fence.position.y, z: fence.position.z + 14 });
            }
            for (let i = 1; i <= 14; i++) {
                const f = fence.clone(`FenceD${i}`, fence.parent);
                f.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), -Math.PI / 2);
                f.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: fence.position.x, y: fence.position.y, z: fence.position.z + 15 - i });
            }
            const barn = loadedAsset.meshes.find(x => x.name === "Barn");
            barn.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 10, y: -20, z: 30 });
            barn.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), -Math.PI / 4 * 3);
            const streetlight = loadedAsset.meshes.find(x => x.name === "Streetlight");
            streetlight.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 1, y: -20, z: 27 });
            streetlight.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), Math.PI);
            // Physics:
            for (let mesh of loadedAsset.meshes) {
                this._getRidOfParentNodes(mesh);
            }
            ground.physicsImpostor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.PhysicsImpostor(ground, _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, this);
            const player = new _Player__WEBPACK_IMPORTED_MODULE_3__.Player(this);
            yield player.initializeAsync();
            player.position = player.position.add(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3(-12, 0, 0));
        });
    }
    _getRidOfParentNodes(mesh) {
        const worldMatrix = mesh.computeWorldMatrix(true).clone();
        mesh.parent = null;
        mesh.freezeWorldMatrix(worldMatrix, true);
        mesh.unfreezeWorldMatrix();
    }
}


/***/ }),

/***/ "./src/Level2.ts":
/*!***********************!*\
  !*** ./src/Level2.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Level2": () => (/* binding */ Level2)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _GameScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameScene */ "./src/GameScene.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math */ "./src/Math.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class Level2 extends _GameScene__WEBPACK_IMPORTED_MODULE_1__.GameScene {
    constructor(engine, canvas, options) {
        super(engine, canvas, options);
        const box = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.MeshBuilder.CreateBox("box", { size: 1 }, this);
        box.position = (0,_Math__WEBPACK_IMPORTED_MODULE_2__.createVector3)({ x: 0, y: 0, z: 2 });
    }
    initializeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}


/***/ }),

/***/ "./src/Math.ts":
/*!*********************!*\
  !*** ./src/Math.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math */ "./src/Math.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Player {
    constructor(scene) {
        this._scaling = 0.02;
        this._position = (0,_Math__WEBPACK_IMPORTED_MODULE_1__.createVector3)({ x: 0, y: -20 + 1 + 7.25, z: 20 });
        this._scene = scene;
    }
    initializeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const loadedAsset = yield _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.ImportMeshAsync(null, "./assets/", "player.glb", this._scene);
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
        });
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value.clone();
        this._mesh.position = this._position.scale(this._scaling);
    }
}


/***/ }),

/***/ "./src/SceneSwitcher.ts":
/*!******************************!*\
  !*** ./src/SceneSwitcher.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SceneSwitcher": () => (/* binding */ SceneSwitcher)
/* harmony export */ });
/* harmony import */ var _Level1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Level1 */ "./src/Level1.ts");
/* harmony import */ var _Level2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Level2 */ "./src/Level2.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class SceneSwitcher {
    constructor(engine, canvas) {
        this._currentScene = null;
        this._levelIndex = 0;
        this._levelBuilders = {};
        // A dictionary: [index]: <level constructor>
        this._levelBuilders[0] = () => {
            return new _Level1__WEBPACK_IMPORTED_MODULE_0__.Level1(engine, canvas);
        };
        this._levelBuilders[1] = () => {
            return new _Level2__WEBPACK_IMPORTED_MODULE_1__.Level2(engine, canvas);
        };
    }
    loadFirstSceneAsync() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.currentScene) === null || _a === void 0 ? void 0 : _a.dispose());
            this._currentScene = null;
            this._levelIndex = 0;
            this._currentScene = this._levelBuilders[this._levelIndex]();
            yield this._currentScene.initializeAsync();
        });
    }
    loadNextSceneAsync() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.currentScene) === null || _a === void 0 ? void 0 : _a.dispose());
            this._currentScene = null;
            this._levelIndex++;
            if (this._levelIndex >= Object.keys(this._levelBuilders).length)
                this._levelIndex = 0;
            this._currentScene = this._levelBuilders[this._levelIndex]();
            yield this.currentScene.initializeAsync();
        });
    }
    get currentScene() {
        return this._currentScene;
    }
}


/***/ }),

/***/ "./src/Worker.ts":
/*!***********************!*\
  !*** ./src/Worker.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _appInitializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appInitializer */ "./src/appInitializer.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const scope = globalThis;
const appInitializer = new _appInitializer__WEBPACK_IMPORTED_MODULE_0__.AppInitializer();
globalThis.CANNON = __webpack_require__(/*! cannon */ "./node_modules/cannon/build/cannon.js");
scope.onmessage = (ev) => __awaiter(void 0, void 0, void 0, function* () {
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
            yield appInitializer.loadFirstSceneAsync();
            break;
        case "loadNextScene":
            yield appInitializer.loadNextSceneAsync();
            break;
        case "inspector":
            yield appInitializer.switchInspector();
            break;
    }
});


/***/ }),

/***/ "./src/appInitializer.ts":
/*!*******************************!*\
  !*** ./src/appInitializer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppInitializer": () => (/* binding */ AppInitializer)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _SceneSwitcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SceneSwitcher */ "./src/SceneSwitcher.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class AppInitializer {
    init(canvas) {
        this._canvas = canvas;
        this._engine = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Engine(this._canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this._sceneSwitcher = new _SceneSwitcher__WEBPACK_IMPORTED_MODULE_1__.SceneSwitcher(this._engine, this._canvas);
        this._engine.runRenderLoop(() => {
            var _a;
            (_a = this._sceneSwitcher.currentScene) === null || _a === void 0 ? void 0 : _a.render();
        });
    }
    resize(width, height) {
        this._canvas.width = width;
        this._canvas.height = height;
        this._engine.resize();
    }
    loadFirstSceneAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._sceneSwitcher.loadFirstSceneAsync();
        });
    }
    loadNextSceneAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._sceneSwitcher.loadNextSceneAsync();
        });
    }
    switchInspector() {
        return __awaiter(this, void 0, void 0, function* () {
            const scene = this._sceneSwitcher.currentScene;
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            }
            else {
                yield scene.debugLayer.show({
                    embedMode: false,
                    overlay: true,
                });
            }
        });
    }
}


/***/ }),

/***/ "./public/assets/environment.glb":
/*!***************************************!*\
  !*** ./public/assets/environment.glb ***!
  \***************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected character '\u0002' (1:4)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n(Source code omitted for this binary file)");

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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_cannon_build_cannon_js-node_modules_babylonjs_core_index_js-node_modules-954a49"], () => (__webpack_require__("./src/Worker.ts")))
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 			return "js/" + chunkId + ".bundleName.js";
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
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_Worker_ts": 1
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
//# sourceMappingURL=src_Worker_ts.bundleName.js.map