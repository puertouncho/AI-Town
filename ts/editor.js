var AITown;
(function (AITown) {
    var Editor = (function () {
        function Editor() {
            this.CreateRenderer();
        }
        Editor.prototype.CreateRenderer = function () {
            this.renderer = new PIXI.WebGLRenderer(800, 600);
            document.body.appendChild(this.renderer.view);
            //To change the background color
            this.renderer.backgroundColor = 0x061639;
            // Stage
            this.stage = new PIXI.Container();
            this.stage.name = "Editor Stage";
            //Tell the renderer to render the stage
            this.renderer.render(this.stage);
            requestAnimationFrame(this.MainLoop.bind(this));
        };
        Editor.prototype.MainLoop = function () {
            this.renderer.render(this.stage);
            requestAnimationFrame(this.MainLoop.bind(this));
        };
        Editor.prototype.ResourceLoader = function () {
            for (var i = 0; i < imageAssetData.length; ++i) {
                PIXI.loader
                    .add(imageAssetData[i].id, imageAssetData[i].src);
            }
            PIXI.loader.load(this.Start.bind(this));
        };
        Editor.prototype.Start = function () {
            console.log("Editor Started");
            this.stageController = new AITown.StageController(this.stage);
        };
        return Editor;
    }());
    AITown.Editor = Editor;
})(AITown || (AITown = {}));
var editor = new AITown.Editor();
editor.ResourceLoader();
