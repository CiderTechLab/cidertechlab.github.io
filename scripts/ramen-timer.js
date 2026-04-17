/**
 * ラーメンタイマー用スクリプト
 * @author S.K
 */
export {};

/**
 * タイマー時間設定
 */
const selectTimeForm = document.querySelector('.select-time');
const radioList = selectTimeForm.querySelectorAll('input[name="time"]');
let setTime = radioList[1].value;
for (const time of radioList) {
	time.addEventListener('change', () => {
		setTime = time.value;
	});
}

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
	progressBar.max = setTime;
	let count = 0;

	progressBarIntervalId = setInterval(() => {
		count += 1;
		progressBar.value = count;

		if (count >= setTime) {
			clearInterval(progressBarIntervalId);
		}
	}, 1000);
}

/**
 * 残り時間表示用関数
 */
function remainingTimeCount() {
	let remainingTimeText = document.querySelector('.remaining-time');
	let count = setTime;
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
		const remainingText = document.querySelector('.remaining-text');
		remainingText.textContent = 'ラーメンが完成しました！';
	}, setTime * 1000);
});

/**
 * リセットボタン
 * - プログレスバーと残り時間をリセットする
 */
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {
	clearInterval(progressBarIntervalId);
	clearInterval(remainingTimeIntervalId);
	const progressBar = document.querySelector('.progress-bar');
	const remainingTimeText = document.querySelector('.remaining-time');
	const remainingText = document.querySelector('.remaining-text');
	progressBar.value = 0;
	remainingTimeText.textContent = '0';
	remainingText.innerHTML = '残り<span class="remaining-time">0</span>秒';
});

/**
 * 一時停止ボタン
 * - タイマーを一時停止する
 */
const stopButton = document.querySelector('.stop-button');
stopButton.addEventListener('click', () => {
	clearInterval(progressBarIntervalId);
	clearInterval(remainingTimeIntervalId);
});
