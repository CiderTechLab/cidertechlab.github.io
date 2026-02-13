/**
 * カードリストのドラッグスクロール機能
 */
/** .cards要素の取得 */
const cardLists = document.querySelectorAll('.cards');

/**
 * ドラッグスクロールの実装
 */
cardLists.forEach((el) => {
	let isDown = false; // ドラッグ中かのフラグ
	let startX = 0; // ドラッグ開始時のマウスX座標
	let startScrollLeft = 0; // ドラッグ開始時のスクロール位置
	let moved = 0; // ドラッグでマウスが移動した距離

	/**
	 * ポインタダウンイベント
	 */
	el.addEventListener('pointerdown', (e) => {
		if (e.button !== 0) return;

		isDown = true;
		moved = 0;
		el.classList.add('is-dragging');
		startX = e.clientX;
		startScrollLeft = el.scrollLeft;
	});

	/**
	 * ポインタムーブイベント
	 */
	el.addEventListener('pointermove', (e) => {
		if (!isDown) return;

		const dx = e.clientX - startX; // マウスの移動量
		moved = Math.max(moved, Math.abs(dx));
		el.scrollLeft = startScrollLeft - dx;
	});

	/**
	 * ポインタアップ・キャンセルイベント
	 * @param {*} e
	 */
	const end = (e) => {
		isDown = false;
		el.classList.remove('is-dragging');
		if (e) {
		}
	};

	el.addEventListener('pointerup', end);
	el.addEventListener('pointercancel', end);

	// ドラッグしてたらクリックを無効化
	el.addEventListener('click', (e) => {
		// aタグをクリックした場合はスキップ
		if (e.target.closest('a')) return;
		if (moved > 5) {
			e.stopImmediatePropagation();
		}
	});
});
