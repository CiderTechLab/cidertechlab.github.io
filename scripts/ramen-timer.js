/**
 * ラーメンタイマー用スクリプト
 * @author S.K
 */
export {};

/**
 * タイマー時間設定
 */
let setSecondTime = 10;

/**
 * タイマーID
 */
let progressBarIntervalId = null;
let remainingTimeIntervalId = null;

/**
 * プログレスバー用関数
 */
function progressBarCount() {
	const progressBar = document.querySelector('.progress-bar');
	progressBar.max = setSecondTime;
	let count = 0;

	progressBarIntervalId = setInterval(() => {
		count += 1;
		progressBar.value = count;

		if (count >= setSecondTime) {
			clearInterval(progressBarIntervalId);
		}
	}, 1000);
}

/**
 * 残り時間表示用関数
 */
function remainingTimeCount() {
	let remainingTimeText = document.querySelector('.remaining-time');
	let count = setSecondTime;
	remainingTimeText.textContent = count;

	remainingTimeIntervalId = setInterval(() => {
		count -= 1;
		remainingTimeText.textContent = count;

		if (count <= 0) {
			clearInterval(remainingTimeIntervalId);
		}
	}, 1000);
}

/**
 * スタートボタン
 * - スタートボタンを取得し、タイマーイベントを追加
 */
const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {
	// 既に実行中のタイマーがあれば停止
	if (progressBarIntervalId !== null) clearInterval(progressBarIntervalId);
	if (remainingTimeIntervalId !== null) clearInterval(remainingTimeIntervalId);

	progressBarCount();
	remainingTimeCount();
	setTimeout(() => {
		alert('ラーメンが完成しました！');
	}, setSecondTime * 1000);
});

/**
 * リセットボタン
 * - プログレスバーと残り時間をリセットする
 */
function resetTimer() {
	clearInterval(progressBarIntervalId);
	clearInterval(remainingTimeIntervalId);
	const progressBar = document.querySelector('.progress-bar');
	const remainingTimeText = document.querySelector('.remaining-time');
	progressBar.value = 0;
	remainingTimeText.textContent = '0';
}
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetTimer);
