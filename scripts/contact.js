const form = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

const fields = {
	name: {
		input: document.getElementById('name'),
		error: document.getElementById('name-error'),
	},
	gender: {
		input: document.querySelector('input[name="gender"]'),
		error: document.getElementById('gender-error'),
	},
	email: {
		input: document.getElementById('email'),
		error: document.getElementById('email-error'),
	},
	phone: {
		input: document.getElementById('phone'),
		error: document.getElementById('phone-error'),
	},
	category: {
		input: document.getElementById('category'),
		error: document.getElementById('category-error'),
	},
	message: {
		input: document.getElementById('message'),
		error: document.getElementById('message-error'),
	},
	attachment: {
		input: document.getElementById('attachment'),
		error: document.getElementById('attachment-error'),
		name: document.getElementById('attachment-name'),
	},
};

const isBlank = (value) => value.trim().length === 0;

/**
 * エラーメッセージの設定
 */
const setError = (field, message) => {
	field.error.textContent = message;
	field.input.setAttribute('aria-invalid', 'true');
};

/**
 * エラーメッセージのクリア
 */
const clearError = (field) => {
	field.error.textContent = '';
	field.input.removeAttribute('aria-invalid');
};

/**
 * バリテーションチェック
 */
const validateName = () => {
	if (isBlank(fields.name.input.value)) {
		setError(fields.name, '名前を入力してください');
		return false;
	}
	clearError(fields.name);
	return true;
};

const validateGender = () => {
	if (!fields.gender.input.checked) {
		setError(fields.gender, '性別を選択してください');
		return false;
	}
	clearError(fields.gender);
	return true;
};

const validateEmail = () => {
	const value = fields.email.input.value.trim();
	if (value.length === 0) {
		setError(fields.email, 'メールアドレスを入力してください');
		return false;
	}
	if (!fields.email.input.checkValidity()) {
		setError(fields.email, 'メール形式が正しくありません');
		return false;
	}
	clearError(fields.email);
	return true;
};

const validatePhone = () => {
	const value = fields.phone.input.value.trim();
	if (value.length === 0) {
		clearError(fields.phone);
		return true;
	}
	const phonePattern = /^[0-9+()\- ]+$/;
	if (!phonePattern.test(value)) {
		setError(fields.phone, '電話番号の形式が正しくありません');
		return false;
	}
	clearError(fields.phone);
	return true;
};

const validateCategory = () => {
	if (fields.category.input.value === '') {
		setError(fields.category, '種別を選択してください');
		return false;
	}
	clearError(fields.category);
	return true;
};

const validateMessage = () => {
	if (isBlank(fields.message.input.value)) {
		setError(fields.message, '内容を入力してください');
		return false;
	}
	clearError(fields.message);
	return true;
};

const isAllowedFile = (file) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
	const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

	if (allowedTypes.includes(file.type)) {
		return true;
	}

	const name = file.name.toLowerCase();
	return allowedExtensions.some((ext) => name.endsWith(ext));
};

const validateAttachment = () => {
	const file = fields.attachment.input.files[0];
	if (!file) {
		clearError(fields.attachment);
		return true;
	}
	if (!isAllowedFile(file)) {
		setError(fields.attachment, '対応していないファイル形式です');
		return false;
	}
	clearError(fields.attachment);
	return true;
};

/**
 * メッセージ入力欄の文字数カウント
 */
const updateMessageCount = () => {
	const count = document.getElementById('message-count');
	const maxLength = Number(fields.message.input.getAttribute('maxlength'));
	const currentLength = fields.message.input.value.length;
	const remaining = Math.max(maxLength - currentLength, 0);

	count.textContent = `残り ${remaining} 文字`;
	count.classList.toggle('is-limit', remaining === 0);
};

const resetStatus = () => {
	formStatus.textContent = '';
	formStatus.classList.remove('is-success');
};

fields.name.input.addEventListener('blur', validateName);
fields.email.input.addEventListener('blur', validateEmail);
fields.message.input.addEventListener('blur', validateMessage);
fields.message.input.addEventListener('input', updateMessageCount);

fields.attachment.input.addEventListener('change', () => {
	const file = fields.attachment.input.files[0];
	fields.attachment.name.textContent = file ? file.name : '未選択';
	if (file && !isAllowedFile(file)) {
		setError(fields.attachment, '対応していないファイル形式です');
		fields.attachment.input.value = '';
		fields.attachment.name.textContent = '未選択';
	} else {
		clearError(fields.attachment);
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	resetStatus();

	const validations = [
		validateName(),
		validateGender(),
		validateEmail(),
		validatePhone(),
		validateCategory(),
		validateMessage(),
		validateAttachment(),
	];

	if (validations.every(Boolean)) {
		formStatus.textContent = '内容は送信されません。';
		formStatus.classList.add('is-success');
		form.reset();
		updateMessageCount();
		fields.attachment.name.textContent = '未選択';
	}
});

updateMessageCount();

/**
 * 入力内容のダイアログ表示
 */
const confirmBtn = document.getElementById('confirmBtn');

const collectFormValues = () => {
	// 性別の未選択対応
	const checkedGender = document.querySelector('input[name="gender"]:checked');

	return {
		name: fields.name.input.value.trim(),
		gender: checkedGender ? checkedGender.value : '',
		email: fields.email.input.value.trim(),
		phone: fields.phone.input.value.trim(),
		category: fields.category.input.value,
		message: fields.message.input.value,
		attachment: fields.attachment.input.files[0]?.name ?? '未選択',
	};
};

confirmBtn.addEventListener('click', () => {
	const validations = [
		validateName(),
		validateGender(),
		validateEmail(),
		validatePhone(),
		validateCategory(),
		validateMessage(),
		validateAttachment(),
	];

	if (!validations.every(Boolean)) return;

	const v = collectFormValues();

	alert(
		[
			`名前: ${v.name}`,
			`性別: ${v.gender || '未選択'}`,
			`メール: ${v.email}`,
			`電話: ${v.phone || '未入力'}`,
			`種別: ${v.category}`,
			`内容: ${v.message}`,
			`添付: ${v.attachment}`,
		].join('\n')
	);
});
