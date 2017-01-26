var AITown;
(function (AITown) {
    var Tile = (function () {
        function Tile(controller, layerBackground, tileIndex, x, y) {
            if (tileIndex === void 0) { tileIndex = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.defaultScale = 0.15;
            this.sizeCalcScaleX = 0.99;
            this.sizeCalcScaleY = 0.89;
            this.mapId = null;
            this.row = 0;
            this.col = 0;
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
            if (!this.baseSprite) {
                this.baseSprite = PIXI.Sprite.fromFrame("tile" + tileIndex + ".png");
                this.layerBackground.addChild(this.baseSprite);
                this.UpdateTransform();
            }
            else {
                var texture = PIXI.Texture.fromFrame("tile" + tileIndex + ".png");
                this.baseSprite.texture = texture;
            }
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
            /*var graphic = new PIXI.Graphics();
            graphic.beginFill(0x000000);
            graphic.drawPolygon( [0,-(this.baseSprite.height*0.5*this.sizeCalcScaleY),
                                (this.baseSprite.width*0.5*this.sizeCalcScaleX), 0,
                                0, (this.baseSprite.height*0.5*this.sizeCalcScaleY),
                                -(this.baseSprite.width*0.5*this.sizeCalcScaleX), 0
                                ]);
            graphic.endFill();
            graphic.x = this.offsetX;
            graphic.y = this.offsetY;
            graphic.alpha = 0.5;
            this.layerBackground.addChild(graphic);*/
            if (editor) {
                this.baseSprite.interactive = true;
                var points = [new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale) - (this.baseSprite.height * 0.5 * this.sizeCalcScaleY / this.defaultScale)),
                    new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale) + (this.baseSprite.width * 0.5 * this.sizeCalcScaleX / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale)),
                    new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale) + (this.baseSprite.height * 0.5 * this.sizeCalcScaleY / this.defaultScale)),
                    new PIXI.Point((this.baseSprite.width * 0.5 / this.defaultScale) - (this.baseSprite.width * 0.5 * this.sizeCalcScaleX / this.defaultScale), (this.baseSprite.height * 0.5 / this.defaultScale))
                ];
                this.baseSprite.hitArea = new PIXI.Polygon(points);
                this.baseSprite.addListener("mousedown", function (ev) {
                    console.log(_this.mapId);
                    _this.SetTile(_this.controller.selectedTile);
                    ev.stopPropagation();
                });
            }
        };
        return Tile;
    }());
    AITown.Tile = Tile;
})(AITown || (AITown = {}));
