(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["platapi"] = factory();
	else
		root["platapi"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderer: () => (/* binding */ renderer)
/* harmony export */ });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ "./src/scene.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _renderer_instances, _renderer_createProgram, _renderer_createShader, _renderer_resizeCanvasToDisplaySize;

const vertex_shader_source = `#version 300 es
in vec2 position;
uniform vec2 resolution;

void main() {
    vec2 zeroToOne = position / resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
}
`;
const fragment_shader_source = `#version 300 es
precision highp float;
out vec4 Color;
uniform vec4 fragColor;

void main() {
    Color = fragColor;
}
`;
class renderer {
    constructor(canvasId) {
        _renderer_instances.add(this);
        this.domElement =
            document.getElementById(canvasId);
        this.gl =
            this.domElement.getContext("webgl2");
        const multiplier = window.devicePixelRatio;
        this.width = this.domElement.clientWidth * multiplier;
        this.height = this.domElement.clientHeight * multiplier;
        var newScene = new _scene__WEBPACK_IMPORTED_MODULE_0__.scene();
        console.log('scene ID: %f', newScene.id);
    }
    setSize(width, height) {
        this.domElement.style.width = width;
        this.domElement.style.height = height;
        __classPrivateFieldGet(this, _renderer_instances, "m", _renderer_resizeCanvasToDisplaySize).call(this);
    }
    /**
     * * Clear the canvas
    */
    clear() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    /**
     * * Render the scene
     */
    render() {
        var program = __classPrivateFieldGet(this, _renderer_instances, "m", _renderer_createProgram).call(this);
        var positionLoc = this.gl.getAttribLocation(program, 'position');
        var resolutionLoc = this.gl.getUniformLocation(program, 'resolution');
        var fragColorLoc = this.gl.getUniformLocation(program, 'fragColor');
        var positionBuff = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuff);
        // code above is init, below is render
        __classPrivateFieldGet(this, _renderer_instances, "m", _renderer_resizeCanvasToDisplaySize).call(this);
        this.clear();
        this.gl.useProgram(program);
        this.gl.enableVertexAttribArray(positionLoc);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuff);
        this.gl.vertexAttribPointer(positionLoc, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.uniform2f(resolutionLoc, this.width, this.height);
        for (var i = 0; i < 50; i++) {
            var x = randomInt(this.width);
            var width = randomInt(this.width - x);
            var y = randomInt(this.height);
            var height = randomInt(this.height - y);
            const rectArray = createRectangle(x, y, width, height);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(rectArray), this.gl.STATIC_DRAW);
            this.gl.uniform4f(fragColorLoc, Math.random(), Math.random(), Math.random(), 1);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, rectArray.length / 2);
        }
    }
}
_renderer_instances = new WeakSet(), _renderer_createProgram = function _renderer_createProgram() {
    const vertexShader = __classPrivateFieldGet(this, _renderer_instances, "m", _renderer_createShader).call(this, this.gl.VERTEX_SHADER, vertex_shader_source);
    const fragmentShader = __classPrivateFieldGet(this, _renderer_instances, "m", _renderer_createShader).call(this, this.gl.FRAGMENT_SHADER, fragment_shader_source);
    var program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
    return null;
}, _renderer_createShader = function _renderer_createShader(type, source) {
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
    return null;
}, _renderer_resizeCanvasToDisplaySize = function _renderer_resizeCanvasToDisplaySize() {
    const multiplier = window.devicePixelRatio;
    const width = this.domElement.clientWidth * multiplier;
    const height = this.domElement.clientHeight * multiplier;
    if (this.domElement.width !== width || this.domElement.height !== height) {
        this.domElement.width = width;
        this.width = width;
        this.domElement.height = height;
        this.height = height;
        this.gl.viewport(0, 0, this.width, this.height);
        return true;
    }
    return false;
};
// Returns a random integer from 0 to range-1
function randomInt(range) {
    return Math.floor(Math.random() * range);
}
// create an array with the vertices to create a rectangle
function createRectangle(x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    return ([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]);
}


/***/ }),

/***/ "./src/scene.ts":
/*!**********************!*\
  !*** ./src/scene.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scene: () => (/* binding */ scene)
/* harmony export */ });
class scene {
    constructor() {
        this.id = 1;
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
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/platapi.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderer: () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_0__.renderer),
/* harmony export */   scene: () => (/* reexport safe */ _scene__WEBPACK_IMPORTED_MODULE_1__.scene)
/* harmony export */ });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scene */ "./src/scene.ts");




/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGFwaS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7O0FDVkEsOEJBQThCLFNBQUksSUFBSSxTQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlDQUFLO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzSU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDTjtBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGxhdGFwaS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vcGxhdGFwaS8uL3NyYy9yZW5kZXJlci50cyIsIndlYnBhY2s6Ly9wbGF0YXBpLy4vc3JjL3NjZW5lLnRzIiwid2VicGFjazovL3BsYXRhcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGxhdGFwaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxhdGFwaS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsYXRhcGkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGF0YXBpLy4vc3JjL3BsYXRhcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicGxhdGFwaVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJwbGF0YXBpXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsInZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9yZW5kZXJlcl9pbnN0YW5jZXMsIF9yZW5kZXJlcl9jcmVhdGVQcm9ncmFtLCBfcmVuZGVyZXJfY3JlYXRlU2hhZGVyLCBfcmVuZGVyZXJfcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZTtcbmltcG9ydCB7IHNjZW5lIH0gZnJvbSBcIi4vc2NlbmVcIjtcbmNvbnN0IHZlcnRleF9zaGFkZXJfc291cmNlID0gYCN2ZXJzaW9uIDMwMCBlc1xyXG5pbiB2ZWMyIHBvc2l0aW9uO1xyXG51bmlmb3JtIHZlYzIgcmVzb2x1dGlvbjtcclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICAgIHZlYzIgemVyb1RvT25lID0gcG9zaXRpb24gLyByZXNvbHV0aW9uO1xyXG4gICAgdmVjMiB6ZXJvVG9Ud28gPSB6ZXJvVG9PbmUgKiAyLjA7XHJcbiAgICB2ZWMyIGNsaXBTcGFjZSA9IHplcm9Ub1R3byAtIDEuMDtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNChjbGlwU3BhY2UgKiB2ZWMyKDEuMCwgLTEuMCksIDAuMCwgMS4wKTtcclxufVxyXG5gO1xuY29uc3QgZnJhZ21lbnRfc2hhZGVyX3NvdXJjZSA9IGAjdmVyc2lvbiAzMDAgZXNcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG5vdXQgdmVjNCBDb2xvcjtcclxudW5pZm9ybSB2ZWM0IGZyYWdDb2xvcjtcclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICAgIENvbG9yID0gZnJhZ0NvbG9yO1xyXG59XHJcbmA7XG5leHBvcnQgY2xhc3MgcmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhc0lkKSB7XG4gICAgICAgIF9yZW5kZXJlcl9pbnN0YW5jZXMuYWRkKHRoaXMpO1xuICAgICAgICB0aGlzLmRvbUVsZW1lbnQgPVxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICB0aGlzLmdsID1cbiAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xuICAgICAgICBjb25zdCBtdWx0aXBsaWVyID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGggKiBtdWx0aXBsaWVyO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQgKiBtdWx0aXBsaWVyO1xuICAgICAgICB2YXIgbmV3U2NlbmUgPSBuZXcgc2NlbmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NjZW5lIElEOiAlZicsIG5ld1NjZW5lLmlkKTtcbiAgICB9XG4gICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9yZW5kZXJlcl9pbnN0YW5jZXMsIFwibVwiLCBfcmVuZGVyZXJfcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSkuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogKiBDbGVhciB0aGUgY2FudmFzXG4gICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICogUmVuZGVyIHRoZSBzY2VuZVxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHByb2dyYW0gPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9yZW5kZXJlcl9pbnN0YW5jZXMsIFwibVwiLCBfcmVuZGVyZXJfY3JlYXRlUHJvZ3JhbSkuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uTG9jID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAncG9zaXRpb24nKTtcbiAgICAgICAgdmFyIHJlc29sdXRpb25Mb2MgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAncmVzb2x1dGlvbicpO1xuICAgICAgICB2YXIgZnJhZ0NvbG9yTG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ2ZyYWdDb2xvcicpO1xuICAgICAgICB2YXIgcG9zaXRpb25CdWZmID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwb3NpdGlvbkJ1ZmYpO1xuICAgICAgICAvLyBjb2RlIGFib3ZlIGlzIGluaXQsIGJlbG93IGlzIHJlbmRlclxuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9yZW5kZXJlcl9pbnN0YW5jZXMsIFwibVwiLCBfcmVuZGVyZXJfcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSkuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB0aGlzLmdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25Mb2MpO1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHBvc2l0aW9uQnVmZik7XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcihwb3NpdGlvbkxvYywgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0yZihyZXNvbHV0aW9uTG9jLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTA7IGkrKykge1xuICAgICAgICAgICAgdmFyIHggPSByYW5kb21JbnQodGhpcy53aWR0aCk7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSByYW5kb21JbnQodGhpcy53aWR0aCAtIHgpO1xuICAgICAgICAgICAgdmFyIHkgPSByYW5kb21JbnQodGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJhbmRvbUludCh0aGlzLmhlaWdodCAtIHkpO1xuICAgICAgICAgICAgY29uc3QgcmVjdEFycmF5ID0gY3JlYXRlUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHJlY3RBcnJheSksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICAgICAgdGhpcy5nbC51bmlmb3JtNGYoZnJhZ0NvbG9yTG9jLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgcmVjdEFycmF5Lmxlbmd0aCAvIDIpO1xuICAgICAgICB9XG4gICAgfVxufVxuX3JlbmRlcmVyX2luc3RhbmNlcyA9IG5ldyBXZWFrU2V0KCksIF9yZW5kZXJlcl9jcmVhdGVQcm9ncmFtID0gZnVuY3Rpb24gX3JlbmRlcmVyX2NyZWF0ZVByb2dyYW0oKSB7XG4gICAgY29uc3QgdmVydGV4U2hhZGVyID0gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfcmVuZGVyZXJfaW5zdGFuY2VzLCBcIm1cIiwgX3JlbmRlcmVyX2NyZWF0ZVNoYWRlcikuY2FsbCh0aGlzLCB0aGlzLmdsLlZFUlRFWF9TSEFERVIsIHZlcnRleF9zaGFkZXJfc291cmNlKTtcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX3JlbmRlcmVyX2luc3RhbmNlcywgXCJtXCIsIF9yZW5kZXJlcl9jcmVhdGVTaGFkZXIpLmNhbGwodGhpcywgdGhpcy5nbC5GUkFHTUVOVF9TSEFERVIsIGZyYWdtZW50X3NoYWRlcl9zb3VyY2UpO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgdGhpcy5nbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICB2YXIgc3VjY2VzcyA9IHRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKTtcbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGhpcy5nbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XG4gICAgdGhpcy5nbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuICAgIHJldHVybiBudWxsO1xufSwgX3JlbmRlcmVyX2NyZWF0ZVNoYWRlciA9IGZ1bmN0aW9uIF9yZW5kZXJlcl9jcmVhdGVTaGFkZXIodHlwZSwgc291cmNlKSB7XG4gICAgdmFyIHNoYWRlciA9IHRoaXMuZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgIHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICB2YXIgc3VjY2VzcyA9IHRoaXMuZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgdGhpcy5nbC5DT01QSUxFX1NUQVRVUyk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIHNoYWRlcjtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGhpcy5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgIHRoaXMuZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG4gICAgcmV0dXJuIG51bGw7XG59LCBfcmVuZGVyZXJfcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSA9IGZ1bmN0aW9uIF9yZW5kZXJlcl9yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKCkge1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aCAqIG11bHRpcGxpZXI7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodCAqIG11bHRpcGxpZXI7XG4gICAgaWYgKHRoaXMuZG9tRWxlbWVudC53aWR0aCAhPT0gd2lkdGggfHwgdGhpcy5kb21FbGVtZW50LmhlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG4vLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIHJhbmdlLTFcbmZ1bmN0aW9uIHJhbmRvbUludChyYW5nZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5nZSk7XG59XG4vLyBjcmVhdGUgYW4gYXJyYXkgd2l0aCB0aGUgdmVydGljZXMgdG8gY3JlYXRlIGEgcmVjdGFuZ2xlXG5mdW5jdGlvbiBjcmVhdGVSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciB4MSA9IHg7XG4gICAgdmFyIHgyID0geCArIHdpZHRoO1xuICAgIHZhciB5MSA9IHk7XG4gICAgdmFyIHkyID0geSArIGhlaWdodDtcbiAgICByZXR1cm4gKFtcbiAgICAgICAgeDEsIHkxLFxuICAgICAgICB4MiwgeTEsXG4gICAgICAgIHgxLCB5MixcbiAgICAgICAgeDEsIHkyLFxuICAgICAgICB4MiwgeTEsXG4gICAgICAgIHgyLCB5MixcbiAgICBdKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBzY2VuZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAxO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlcmVyJztcbmltcG9ydCB7IHNjZW5lIH0gZnJvbSAnLi9zY2VuZSc7XG5leHBvcnQgeyByZW5kZXJlciwgc2NlbmUgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==