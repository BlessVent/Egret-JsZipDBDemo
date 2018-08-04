class JsZipDBDemo extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/demo/demo.exml";
		this.load();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private load(): void {
		let zipBin = RES.getRes("Dragon_zip"),//以二进制加载压缩文件
			zip: JSZip = new JSZip(zipBin),//创建 JSZip实例
			factory = new dragonBones.EgretFactory(),//创建龙骨工厂实例
			skeletonData = zip.file("Dragon_ske.dbbin").asArrayBuffer(),//找到对应文件 转换成对应格式
			textureData = JSON.parse(zip.file("Dragon_tex.json").asText()),//json需要转换一下
			texture = new egret.Texture();
		//把文件图片转换成二进制字符 使用egret.BitmapData.create 创建bitmapData
		texture.bitmapData = egret.BitmapData.create("arraybuffer", zip.file("Dragon_tex.png").asArrayBuffer());
		//骨架  纹理 都处理完后 就是正常的使用流程了 
		factory.parseDragonBonesData(skeletonData);
		factory.parseTextureAtlasData(textureData, texture);
		let armature: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("Dragon");
		armature.animation.play("walk", 0);
		this.addChild(armature);
		armature.x = 200;
		armature.y = 600;
		armature.scaleX = 0.8;
		armature.scaleY = 0.8;

	}
}