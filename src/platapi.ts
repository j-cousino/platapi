import { createShader, createProgram, resizeCanvasToDisplaySize} from './webglUtils.ts';

function vertexShaderSource(): string {

const source: string = 
`#version 300 es
// an attribute will receive data from a buffer
in vec2 position;
uniform vec2 resolution;

// all shaders have a main function
void main() {
    vec2 scaled = position / ( resolution / 2.0 );
    vec2 translated = scaled - 1.0;
    vec2 mirrored = translated * vec2(1,-1);

    gl_Position = vec4(mirrored, 0, 1);
}
`
return source;  
}

function fragmentShaderSource(): string {

    const source: string = 
    `#version 300 es
    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default
    precision mediump float;
    out vec4 fragmentColor;
    uniform vec4 color;

    void main() {
        fragmentColor = color;
    }
    `
    return source;  
}
    
export function renderView(
    canvas: HTMLCanvasElement,
    objects: { pos: number[], color: number[]}[]
) {
    var gl = canvas.getContext("webgl2");
    if(!gl) {
        console.log("Could not get a webgl2 context!");
        return;
    }

    // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource());
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource());

  // Link the two shaders into a program
  var program = createProgram(gl, vertexShader, fragmentShader);

  // look up where the vertex data needs to go.
  var positionLoc = gl.getAttribLocation(program, "position");
  var resolutionLoc = gl.getUniformLocation(program, "resolution");
  var colorLoc = gl.getUniformLocation(program, "color");

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


  // code above this line is initialization code.
  // code below this line is rendering code.

  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement, 1);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionLoc);
  
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionLoc, size, type, normalize, stride, offset);

  gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);

  // draw
  for( var i = 0; i < objects.length; i++){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( objects[i].pos ), gl.STATIC_DRAW);
    gl.uniform4fv(colorLoc, objects[i].color)
    gl.drawArrays(gl.TRIANGLES, 0, objects[i].pos.length );
  }

}

