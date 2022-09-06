/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/input/gamepadInput.ts":
/*!***********************************!*\
  !*** ./src/input/gamepadInput.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GamepadInput": () => (/* binding */ GamepadInput)
/* harmony export */ });
class GamepadInput {
    _worker;
    constructor(worker) {
        this._worker = worker;
        window.addEventListener("gamepadconnected", this._gamepadConnectedHandler);
        window.addEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);
    }
    // noinspection JSUnusedGlobalSymbols
    dispose() {
        window.removeEventListener("gamepadconnected", this._gamepadConnectedHandler);
        window.removeEventListener("gamepaddisconnected", this._gamepadDisconnectedHandler);
    }
    update() {
        const message = {
            type: "gamepad",
            payload: {
                state: this._readGamepads(),
            },
        };
        this._worker.postMessage(message);
    }
    _gamepadConnectedHandler = (_ev) => {
        console.info("Gamepad connected");
    };
    _gamepadDisconnectedHandler = (_ev) => {
        console.info("Gamepad disconnected");
    };
    _readGamepads() {
        // The first four axes are: moveX, moveZ, lookX, and lookZ.
        const axes = [];
        for (let gamepad of navigator.getGamepads()) {
            if (gamepad === null)
                continue;
            for (let value of gamepad.axes) {
                axes.push(value);
                if (axes.length >= 4)
                    break;
            }
            if (axes.length >= 4)
                break;
        }
        const moveVector = axes.length >= 2
            ? { x: axes[0], y: 0, z: -axes[1] }
            : { x: 0, y: 0, z: 0 };
        const lookVector = axes.length >= 4
            ? { x: axes[2], y: 0, z: -axes[3] }
            : { x: 0, y: 0, z: 0 };
        return { moveVector, lookVector };
    }
}


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
/************************************************************************/
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
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "main-" + "0824f429dee3810baf0c" + ".js";
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input_gamepadInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input/gamepadInput */ "./src/input/gamepadInput.ts");

class App {
    worker;
    constructor() {
        console.log("%cUnnamed Shooter App", "background: lime");
        // create the canvas html element and attach it to the webpage
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        if ("OffscreenCanvas" in window) {
            // @ts-ignore
            const offscreen = canvas.transferControlToOffscreen();
            this.worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_worker_ts"), __webpack_require__.b));
            const msgOffscreen = { type: "offscreen", payload: { canvas: offscreen } };
            this.worker.postMessage(msgOffscreen, [offscreen]);
            const resizeHandler = () => {
                const msgResize = { type: "resize", payload: { width: window.innerWidth, height: window.innerHeight } };
                this.worker.postMessage(msgResize);
            };
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("load", () => {
                const msgLoad = { type: "loadFirstScene" };
                this.worker.postMessage(msgLoad);
                // To update resolution:
                resizeHandler();
            });
            window.addEventListener("keydown", async (ev) => {
                // Hide/show the Inspector:
                if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyI") {
                    const msgInspector = { type: "inspector" };
                    this.worker.postMessage(msgInspector);
                }
                // Load next scene:
                if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey && ev.code === "KeyN") {
                    const msgNextScene = { type: "loadNextScene" };
                    this.worker.postMessage(msgNextScene);
                }
            });
        }
        else {
            canvas.hidden = true;
            const div = document.createElement("div");
            div.innerText = "Unfortunately your browser doesn't support Offscreen canvas API";
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
const app = new App();
const gamepadInput = new _input_gamepadInput__WEBPACK_IMPORTED_MODULE_0__.GamepadInput(app.worker);
const updateHandler = () => {
    gamepadInput.update();
    requestAnimationFrame(updateHandler);
};
updateHandler();

})();

/******/ })()
;
//# sourceMappingURL=main-76b0700d9bd96355ffea.js.map