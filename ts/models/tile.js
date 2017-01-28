var AITown;
(function (AITown) {
    var Tile = (function () {
        function Tile(controller, layerBackground, tileIndex, x, y) {
            if (tileIndex === void 0) { tileIndex = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.defaultScale = 0.15;
            this.sizeCalcScaleX = 0.986;
            this.sizeCalcScaleY = 0.886;
            this.mapId = null;
            this.row = 0;
            this.col = 0;
            this.baseTileIndex = null;
            this.offsetX = 0;
            this.offsetY = 0;
            this.up = null;
            this.down = null;
            this.left = null;
            this.right = null;
            this.controller = controller;
            this.layerBackground = layerBackground;
            this.offsetX = x;
            this.offsetY = y;
            this.SetTile(tileIndex);
        }
        Object.defineProperty(Tile.prototype, "width", {
            get: function () {
                return this.baseSprite.width * this.sizeCalcScaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "height", {
            get: function () {
                return this.baseSprite.height * this.sizeCalcScaleY;
            },
            enumerable: true,
            configurable: true
        });
        Tile.prototype.SetTile = function (tileIndex) {
            if (tileIndex === this.baseTileIndex) {
                return;
            }
            if (!this.baseSprite) {
                this.baseSprite = PIXI.Sprite.fromFrame("tile" + tileIndex + ".png");
                this.layerBackground.addChild(this.baseSprite);
                this.UpdateTransform();
            }
            else {
                var texture = PIXI.Texture.fromFrame("tile" + tileIndex + ".png");
                this.baseSprite.texture = texture;
            }
            this.baseTileIndex = tileIndex;
            this.baseSprite.updateTransform();
        };
        Tile.prototype.UpdateTransform = function () {
            var _this = this;
            this.baseSprite.pivot.x = this.baseSprite.width * 0.5;
            this.baseSprite.pivot.y = this.baseSprite.height * 0.5;
            this.baseSprite.x = this.offsetX;
            this.baseSprite.y = this.offsetY;
            this.baseSprite.scale.x = this.defaultScale;
            this.baseSprite.scale.y = this.defaultScale;
            if (editor) {
                this.baseSprite.interactive = true;
                var points = [new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale) - (this.baseSprite.height * 0.5 * this.sizeCalcScaleY / this.defaultScale)),
                    new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale) + (this.baseSprite.width * 0.5 * this.sizeCalcScaleX / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale)),
                    new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale) + (this.baseSprite.height * 0.5 * this.sizeCalcScaleY / this.defaultScale)),
                    new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale) - (this.baseSprite.width * 0.5 * this.sizeCalcScaleX / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale))
                ];
                this.baseSprite.hitArea = new PIXI.Polygon(points);
                this.baseSprite.addListener("mousedown", function (ev) {
                    _this.SetTile(_this.controller.selectedTile);
                });
                this.baseSprite.addListener("mouseover", function (ev) {
                    if (_this.controller.isPrimaryMouseDown) {
                        _this.SetTile(_this.controller.selectedTile);
                    }
                    _this.baseSprite.y = _this.offsetY - 1;
                });
                this.baseSprite.addListener("mouseout", function (ev) {
                    if (_this.controller.isPrimaryMouseDown) {
                        _this.SetTile(_this.controller.selectedTile);
                    }
                    _this.baseSprite.y = _this.offsetY;
                });
            }
        };
        return Tile;
    }());
    AITown.Tile = Tile;
})(AITown || (AITown = {}));
