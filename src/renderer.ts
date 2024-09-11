import { scene } from "./scene";

const vertex_shader_source: string =
`#version 300 es
in vec2 position;
uniform vec2 resolution;

void main() {
    vec2 zeroToOne = position / resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
}
`

const fragment_shader_source: string = 
`#version 300 es
precision highp float;
out vec4 Color;
uniform vec4 fragColor;

void main() {
    Color = fragColor;
}
`

export class renderer {
    domElement: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    width: number;
    height: number;

    constructor(canvasId: string) {
        this.domElement = 
            document.getElementById(canvasId) as HTMLCanvasElement;
        this.gl = 
            this.domElement.getContext("webgl2") as WebGL2RenderingContext;
        const multiplier = window.devicePixelRatio;
        this.width  = this.domElement.clientWidth  * multiplier;
        this.height = this.domElement.clientHeight * multiplier;
        var newScene = new scene();
        console.log('scene ID: %f', newScene.id);
    }

    setSize(width: string, height: string) {
        this.domElement.style.width = width;
        this.domElement.style.height = height;
        this.#resizeCanvasToDisplaySize();
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
        var program: WebGLProgram = this.#createProgram() as WebGLProgram;
        
        var positionLoc = this.gl.getAttribLocation(program, 'position');
        var resolutionLoc = this.gl.getUniformLocation(program, 'resolution')
        var fragColorLoc = this.gl.getUniformLocation(program, 'fragColor');

        var positionBuff = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuff);

        // code above is init, below is render
        this.#resizeCanvasToDisplaySize();
        this.clear();

        this.gl.useProgram(program);
        this.gl.enableVertexAttribArray(positionLoc);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuff);
        this.gl.vertexAttribPointer(
            positionLoc, 2, this.gl.FLOAT, false, 0, 0
        );

        this.gl.uniform2f(resolutionLoc, this.width, this.height);

        for( var i = 0; i < 50; i++){

            var x = randomInt(this.width);
            var width = randomInt(this.width - x);
            var y = randomInt(this.height);
            var height = randomInt(this.height - y);

            const rectArray = createRectangle(
                x,
                y,
                width,
                height,
            );

            this.gl.bufferData(
                this.gl.ARRAY_BUFFER, 
                new Float32Array(rectArray),
                this.gl.STATIC_DRAW);
            
            this.gl.uniform4f(fragColorLoc, Math.random(), Math.random(), Math.random(), 1);

            this.gl.drawArrays(this.gl.TRIANGLES, 0, rectArray.length/2);
        }
    }

    #createProgram(): WebGLProgram | null {
        const vertexShader = 
            this.#createShader(this.gl.VERTEX_SHADER, vertex_shader_source) as WebGLShader;
        const fragmentShader =
            this.#createShader(this.gl.FRAGMENT_SHADER, fragment_shader_source) as WebGLShader;
        var program: WebGLProgram = this.gl.createProgram() as WebGLProgram;
        
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if(success){
            return program;
        }

        console.log(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
        return null;            
    }

    #createShader(type: GLenum, source: string): WebGLShader | null {
        var shader: WebGLShader =
            this.gl.createShader(type) as WebGLShader;
        
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        var success = this.gl.getShaderParameter (
            shader,
            this.gl.COMPILE_STATUS 
        );
        
        if ( success ) {
            return shader;
        }

        console.log ( this.gl.getShaderInfoLog(shader) );
        this.gl.deleteShader(shader);
        return null;
    }

    /**
    * * Resize a canvas to match the size its displayed.
    * @return {boolean} true if the canvas was resized.
    */
    #resizeCanvasToDisplaySize() {
        const multiplier = window.devicePixelRatio;
        const width  = this.domElement.clientWidth  * multiplier;
        const height = this.domElement.clientHeight * multiplier;
        if (this.domElement.width !== width ||  this.domElement.height !== height) {
            this.domElement.width  = width;
            this.width = width;
            this.domElement.height = height;
            this.height = height;
            this.gl.viewport( 0, 0, this.width, this.height);
            return true;
        }
        return false;
    }

}

// Returns a random integer from 0 to range-1
function randomInt(range: number): number {
    return Math.floor(Math.random() * range);
}

// create an array with the vertices to create a rectangle
function createRectangle(
    x: number, 
    y: number, 
    width: number, 
    height: number ): number[] {

        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;

        return([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ])
}