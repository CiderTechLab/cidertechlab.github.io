/**
 * ラーメンタイマー用スクリプト
 * @author S.K
 */
export {};

/**
 * タイマー時間設定
 */
let setTime = 3;

function progressBarCount() {
	const progressBar = document.querySelector('.progress-bar');
	const maxTime = new Date().getSeconds() + setTime;
	progressBar.max = maxTime;

	setInterval(() => {
		progressBar.value = maxTime - new Date().getSeconds();
		console.log(progressBar.value);
	}, 100);

	if (progressBar.value === 0) {
		clearInterval();
	}
}

function remainingTimeCount() {
	const remainingTimeText = document.querySelector('.remaining-time');
	const maxTime = new Date().getSeconds() + setTime;

	setInterval(() => {
		remainingTimeText.textContent = maxTime - new Date().getSeconds();
		console.log(remainingTimeText.textContent);
	}, 100);

	if (remainingTimeText.textContent === '0') {
		clearInterval();
	}
}

/**
 * スタートボタンを取得し、タイマーイベントを追加
 */
const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {
	progressBarCount();
	remainingTimeCount();
	setTimeout(() => {
		alert('ラーメンが完成しました！');
	}, setTime);
});
