/**
 * ラーメンタイマー用スクリプト
 * @author S.K
 */
export {};

/**
 * タイマー時間設定
 */
const selectTimeForm = document.querySelector('.select-time');
const radioList = selectTimeForm.querySelectorAll(
	'input[type="radio"][name="time"]'
);
const customInput = document.querySelector('#custom-time');
let setTime = radioList[1].value;

for (const radio of radioList) {
	radio.addEventListener('change', () => {
		if (radio.value === 'custom') {
			customInput.disabled = false;
			customInput.focus();
			setTime = customInput.value || '60';
		} else {
			customInput.disabled = true;
			setTime = radio.value;
		}
	});
}

customInput.addEventListener('input', () => {
	customInput.value = customInput.value.replace(/[^0-9]/g, '');
	setTime = customInput.value || '60';
});

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
		const timerSectionModal = document.querySelector('.timer-section__modal');
		timerSectionModal.showModal();
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
	const remainingText = document.querySelector('.remaining-text');
	progressBar.value = 0;
	remainingText.innerHTML = '残り<span class="remaining-time">0</span>秒';
});
