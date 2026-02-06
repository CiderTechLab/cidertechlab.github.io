/**
 * 目次自動生成スクリプト (toc.js)
 * note-layoutのmain内のh2, h3タグから自動的に目次を生成します。
 */

/**
 * 目次を生成する関数
 */
function generateTableOfContents() {
	// note-layoutが存在するかチェック
	const noteLayout = document.querySelector('.note-layout');
	if (!noteLayout) {
		return; // note-layoutがない場合は何もしない
	}

	// main要素を取得
	const mainElement = document.querySelector('main');
	if (!mainElement) {
		return;
	}

	// aside要素を取得
	const asideElement = document.querySelector('aside');
	if (!asideElement) {
		return;
	}

	// main内のh2とh3タグを取得（最初のsection内のh2は除外）
	const sections = mainElement.querySelectorAll('section');
	const headings = [];

	sections.forEach((section, sectionIndex) => {
		// 最初のsectionはページタイトルなのでスキップ
		if (sectionIndex === 0) {
			return;
		}

		// section内のh2とh3を取得
		const sectionHeadings = section.querySelectorAll('h2, h3');
		sectionHeadings.forEach((heading) => {
			headings.push(heading);
		});
	});

	if (headings.length === 0) {
		return;
	}

	// 目次のHTMLを生成
	let tocHTML = '<nav><ol class="sidebar__ol">';
	let h2Counter = 0;

	headings.forEach((heading, index) => {
		const tagName = heading.tagName.toLowerCase();
		const headingText = heading.textContent.trim();

		// IDがない場合は自動的に付与
		if (!heading.id) {
			heading.id = `heading-${index + 1}`;
		}

		if (tagName === 'h2') {
			h2Counter++;
			tocHTML += `<li><a href="#${heading.id}">${h2Counter}. ${headingText}</a></li>`;
		} else if (tagName === 'h3') {
			// h3の場合、番号は既存のIDまたは自動生成されたID番号を使用
			const headingNumber = heading.id.match(/^\d+$/) ? `${heading.id}. ` : '';
			tocHTML += `<li class="toc-h3"><a href="#${heading.id}">${headingNumber}${headingText}</a></li>`;
		}
	});

	tocHTML += '</ol></nav>';

	// aside内に目次を挿入
	asideElement.innerHTML = tocHTML;
}

/**
 * ページ読み込み完了後に目次を生成
 */
document.addEventListener('DOMContentLoaded', () => {
	generateTableOfContents();
});
