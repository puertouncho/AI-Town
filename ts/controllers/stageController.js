var AITown;
(function (AITown) {
    var StageController = (function () {
        function StageController(stage) {
            this.GRID_X = 25;
            this.GRID_Y = 25;
            this.tilesMap = [];
            this.selectedTile = 1;
            this.isPrimaryMouseDown = false;
            this.isSecondaryMouseDown = false;
            this.layerContainer = new PIXI.Container();
            this.layerBackground = new PIXI.Container();
            this.layerContainer.addChild(this.layerBackground);
            stage.addChild(this.layerContainer);
            this.SetUpBaseGrid();
            this.SetUpScrollingFunctionality();
        }
        StageController.prototype.SetUpScrollingFunctionality = function () {
            var _this = this;
            this.layerContainer.interactive = true;
            this.layerContainer.addListener("rightdown", function (ev) {
                _this.isSecondaryMouseDown = true;
                _this.savedScrollPos = ev.data.global.clone();
            });
            this.layerContainer.addListener("mousemove", function (ev) {
                if (_this.isSecondaryMouseDown) {
                    var newPoint = ev.data.global;
                    _this.layerContainer.x += newPoint.x - _this.savedScrollPos.x;
                    _this.layerContainer.y += newPoint.y - _this.savedScrollPos.y;
                    _this.savedScrollPos = ev.data.global.clone();
                }
            });
            this.layerContainer.addListener("rightup", function (ev) {
                _this.isSecondaryMouseDown = false;
            });
            this.layerContainer.addListener("mousedown", function (ev) {
                _this.isPrimaryMouseDown = true;
            });
            this.layerContainer.addListener("mouseup", function (ev) {
                _this.isPrimaryMouseDown = false;
            });
        };
        StageController.prototype.SetUpBaseGrid = function () {
            var iniX = 400;
            var iniY = 0;
            var X = iniX;
            var Y = iniY;
            for (var r = 0; r < this.GRID_X; ++r) {
                for (var c = 0; c < this.GRID_Y; ++c) {
                    var tile = new AITown.Tile(this, this.layerBackground, 0, X, Y);
                    tile.row = r;
                    tile.col = c;
                    tile.mapId = r + "x" + c;
                    this.tilesMap[tile.mapId] = tile;
                    Y += tile.height * 0.5;
                    X += tile.width * 0.5;
                }
                iniX -= tile.width * 0.5;
                iniY += tile.height * 0.5;
                X = iniX;
                Y = iniY;
            }
            this.tilesMap.forEach(function (obj) {
                if (obj.row > 0) {
                    obj.left = this.tileMap[(obj.row - 1) + "x" + obj.col];
                }
                if (obj.row < (this.GRID_X - 1)) {
                    obj.right = this.tileMap[(obj.row + 1) + "x" + obj.col];
                }
                if (obj.col > 0) {
                    obj.up = this.tileMap[obj.row + "x" + (obj.col - 1)];
                }
                if (obj.col < (this.GRID_Y - 1)) {
                    obj.down = this.tileMap[obj.row + "x" + (obj.col + 1)];
                }
            });
        };
        return StageController;
    }());
    AITown.StageController = StageController;
})(AITown || (AITown = {}));
