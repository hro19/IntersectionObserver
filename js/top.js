/*****〇〇*****/

;(function() {
	"use strict";

	// ターゲット指定
	const targets = Array.from(document.querySelectorAll("img[data-src]"));

	// 実際の画像パス
	const img_path = "data-src";

	// オプション
	const options = {
		// 上下100px手前で発火
		rootMargin: "100px 0px"
	};

	// 初期化
	const observer = new IntersectionObserver(callback, options);

	targets.forEach(function(img) {
		// 監視の開始
		observer.observe(img);
	});

	// コールバック
	function callback(entries, object) {
		entries.forEach(function(entry) {

			// 交差していない
			if (!entry.isIntersecting) return;

			// ターゲット要素
			const img = entry.target;

			// 遅延ロード実行
			loading(img);

			// 監視の解除
			object.unobserve(img);
		});
	};

	// 遅延ロード
	function loading(img) {
		// data-srcの値を取得
		const src_val = img.getAttribute(img_path);
		if (src_val) {
			// 画像パスを設定
			img.src = src_val;
			img.onload = function() {
				// data-src属性を削除
				this.removeAttribute(img_path);
			};
		}
	};
})();