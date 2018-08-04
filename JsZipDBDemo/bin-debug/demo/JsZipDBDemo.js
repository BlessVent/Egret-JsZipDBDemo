var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var JsZipDBDemo = (function (_super) {
    __extends(JsZipDBDemo, _super);
    function JsZipDBDemo() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/demo/demo.exml";
        _this.load();
        return _this;
    }
    JsZipDBDemo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    JsZipDBDemo.prototype.load = function () {
        var zipBin = RES.getRes("Dragon_zip"), //以二进制加载压缩文件
        zip = new JSZip(zipBin), //创建 JSZip实例
        factory = new dragonBones.EgretFactory(), //创建龙骨工厂实例
        skeletonData = zip.file("Dragon_ske.dbbin").asArrayBuffer(), //找到对应文件 转换成对应格式
        textureData = JSON.parse(zip.file("Dragon_tex.json").asText()), //json需要转换一下
        texture = new egret.Texture();
        //把文件图片转换成二进制字符 使用egret.BitmapData.create 创建bitmapData
        texture.bitmapData = egret.BitmapData.create("arraybuffer", zip.file("Dragon_tex.png").asArrayBuffer());
        //骨架  纹理 都处理完后 就是正常的使用流程了 
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        var armature = factory.buildArmatureDisplay("Dragon");
        armature.animation.play("walk", 0);
        this.addChild(armature);
        armature.x = 200;
        armature.y = 600;
        armature.scaleX = 0.8;
        armature.scaleY = 0.8;
    };
    return JsZipDBDemo;
}(eui.Component));
__reflect(JsZipDBDemo.prototype, "JsZipDBDemo");
