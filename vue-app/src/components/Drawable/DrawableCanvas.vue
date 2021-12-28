<template>
  <div class="drawable-canvas">
    <div class="canvas-and-paints">
      <canvas
        v-bind:id="canvasId"
        class="image-frame paint-canvas"
        width="350"
        height="350"
      ></canvas>
      <div v-bind:id="paletteId" class="palette box">
        <div
          class="palette box is-pulled-right"
          style="background-color: black"
          v-on:click="colorSelected"
        ></div>
        <div
          class="palette box is-pulled-right"
          style="background-color: red"
          v-on:click="colorSelected"
        ></div>
        <div
          class="palette box is-pulled-right"
          style="background-color: green"
          v-on:click="colorSelected"
        ></div>
        <div
          class="palette box is-pulled-right"
          style="background-color: blue"
          v-on:click="colorSelected"
        ></div>
        <div
          class="palette box is-pulled-right"
          style="background-color: white"
          v-on:click="eraserSelected"
        ></div>
      </div>
    </div>
    <button
      v-on:click="$emit('drawing-finished', canvas.toString())"
      class="form-button finished-drawing"
    >
      I'm finished!
    </button>
  </div>
</template> 
<script>
export class DrawableCanvasElement {
  constructor(canvasElementId) {
    this.canvasElementId = canvasElementId;
    this.paintCanvas = document.getElementById(canvasElementId);
    this.paintContext = this.paintCanvas.getContext("2d");

    this.activeColour = "black";
    this.lineWidth = 1;
    this.dragging = false;
    this.cursorPoint = { x: 0, y: 0 };

    this.paintCanvas.onmousedown = (e) => {
      this.startDrawing(e);
    };
    this.paintCanvas.onmouseup = (e) => {
      this.stopDrawing(e);
    };
    this.paintCanvas.onmouseout = (e) => {
      this.stopDrawing(e);
    };
    this.paintCanvas.onmousemove = (e) => {
      this.makeMarks(e);
    };

    const canvas = this.paintCanvas;

    document.body.addEventListener(
      "touchstart",
      (e) => {
        if (e.target == canvas) {
          e.preventDefault();
          this.startDrawing(e);
        }
      },
      false
    );

    document.body.addEventListener(
      "touchend",
      (e) => {
        if (e.target == canvas) {
          e.preventDefault();
          this.stopDrawing(e);
        }
      },
      false
    );

    document.body.addEventListener(
      "touchmove",
      (e) => {
        if (e.target == canvas) {
          e.preventDefault();
          this.makeMarks(e);
        }
      },
      false
    );

    this.notificationBuffer = [];
    this.notificationBatch = 200;
  }

  registerPaletteElements(paletteContainer) {
    const palette = document.getElementById(paletteContainer);

    palette.addEventListener("click", (event) => {
      if (event.target.id !== paletteContainer) {
        for (let colour of palette.children) {
          colour.classList.remove("active");
        }

        event.target.classList.add("active");
        this.setActiveColour(event.target.style["background-color"]);
      }
    });

    palette.children[0].classList.add("active");

    return this;
  }

  setActiveColour(colour) {
    this.activeColour = colour;
  }

  clear() {
    this.paintContext.clearRect(0, 0, 100000, 100000);
  }

  getLocationFrom(e) {
    const location = { x: 0, y: 0 };

    if (e.constructor.name === "TouchEvent") {
      const bounds = e.target.getBoundingClientRect();
      const touch = e.targetTouches[0];

      location.x = touch.clientX - bounds.left - 10;
      location.y = touch.clientY - bounds.top - 10;
    } else {
      location.x = e.offsetX;
      location.y = e.offsetY;
    }

    return location;
  }

  startDrawing(e) {
    this.dragging = true;

    const location = this.getLocationFrom(e);
    this.cursorPoint = location;

    this.paintContext.lineWidth = this.lineWidth;
    this.paintContext.lineCap = "round";
    this.paintContext.filter = "blur(1px)";
    this.paintContext.beginPath();
    this.paintContext.moveTo(location.x, location.y);
    this.paintContext.strokeStyle = this.activeColour;
  }

  stopDrawing() {
    //e
    this.dragging = false;
    this.notify(null, true);
  }

  makeMarks(e) {
    if (!this.dragging) return;

    const location = this.getLocationFrom(e);
    this.paintContext.lineTo(location.x, location.y);
    this.paintContext.stroke();

    this.notify(location);
  }

  addMarks(markCollection) {
    this.paintContext.beginPath();
    this.paintContext.moveTo(location.x, location.y);
    this.paintContext.strokeStyle = this.activeColour;

    for (let location of markCollection) {
      this.paintContext.lineTo(location.x, location.y);
      this.paintContext.stroke();
    }
  }

  onNotification(callback) {
    this.notificationCallback = callback;
    return this;
  }

  notify(evt, force = false) {
    if (this.notificationCallback == null) {
      return;
    }

    if (evt != null) {
      this.notificationBuffer.push(evt);
    }

    if (
      (force || this.notificationBuffer.length === this.notificationBatch) &&
      this.notificationBuffer.length > 0
    ) { 
      this.notificationCallback(this.notificationBuffer);
      this.notificationBuffer = [];
    }
  }

  toString() {
    return this.paintCanvas.toDataURL("image/png");
  }
}
export default {
  props: { desenho: String },
  data: function () {
    return {
      canvasId: "canvas-" + crypto.getRandomValues(new Uint32Array(1))[0],
      paletteId: "palette-" + crypto.getRandomValues(new Uint32Array(1))[0],
      canvas: null,
    };
  },
  watch: {
    desenho() {
      const canvas = document.getElementById(this.canvasId);

      var ctx = canvas.getContext("2d");

      var image = new Image();
      image.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
      };
      image.src = this.desenho;

      //element.drawImage(, 0, 0);
    },
  },
  mounted: function () {
    const element = document.getElementById(this.canvasId);
    var thisVM = this;
    if (element && !this.canvas) {
      this.canvas = new DrawableCanvasElement(this.canvasId)
        .registerPaletteElements(this.paletteId)
        .onNotification(function () {
          console.log(thisVM.canvas.toString());
     //     thisVM.$emit("drawing-finished", );
        });
    }
  },

  methods: {
    colorSelected: async function () {
      this.canvas.paintCanvas.classList.remove("eraser");
      this.canvas.lineWidth = 1;
    },
    eraserSelected: async function () {
      this.canvas.paintCanvas.classList.add("eraser");
      this.canvas.lineWidth = 10;
    },
  },
};
</script>