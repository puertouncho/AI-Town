var AITown;
(function (AITown) {
    var UIController = (function () {
        function UIController(stage) {
            this.uiContainer = new PIXI.Container();
            stage.addChild(this.uiContainer);
            this.SetUpTileSelection();
        }
        UIController.prototype.SetUpTileSelection = function () {
            this.pannelTiles = new PIXI.Sprite(PIXI.loader.resources["grey_panel"]["texture"]);
            var tilesButton = new PIXI.Sprite(PIXI.loader.resources["stop"]["texture"]);
            tilesButton.x = this.pannelTiles.width * 0.8;
            tilesButton.y = 0;
            this.uiContainer.addChild(this.pannelTiles, tilesButton);
            function selectionTileClicked(index) {
                return (function () {
                    editor.stageController.selectedTile = index;
                });
            }
            var initY = 10;
            var initX = 10;
            for (var i = 0; i < 9; ++i) {
                var tile = PIXI.Sprite.fromFrame("tile" + i + ".png");
                tile.scale.x = 0.3;
                tile.scale.y = 0.3;
                tile.x = initX;
                tile.y = initY;
                tile.interactive = true;
                tile.buttonMode = true;
                this.pannelTiles.addChild(tile);
                initY += tile.height * 1.2;
                tile.addListener("mousedown", selectionTileClicked(i));
            }
        };
        return UIController;
    }());
    AITown.UIController = UIController;
})(AITown || (AITown = {}));
