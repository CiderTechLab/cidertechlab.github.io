/**
 * 目次(TableOfContents:toc)自動生成スクリプト (toc.js)
 * - note-layoutのmain内のh3, h4タグから自動的に目次を生成します。
 * @author S.K
 */
/**
 * 目次を生成する関数
 */
function createToc() {
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

	// main内のh3とh4タグを取得（最初のsection内のh2は除外）
	const sections = mainElement.querySelectorAll('section');
	const headings = [];

	sections.forEach((section, sectionIndex) => {
		// 最初のsectionはページタイトルなのでスキップ
		if (sectionIndex === 0) {
			return;
		}

		// section内のh3、h4を取得
		const sectionHeadings = section.querySelectorAll('h3, h4');
		sectionHeadings.forEach((heading) => {
			headings.push(heading);
		});
	});

	if (headings.length === 0) {
		return;
	}

	// 目次のHTMLを生成（PC版のみopenを付与）
	const isPC = window.innerWidth >= 1280;
	const openAttribute = isPC ? ' open' : '';
	let tocHTML = `<nav><details class="toc-accordion"${openAttribute}><summary class="toc-accordion"><h3>目次</h3></summary><ol class="sidebar__ol">`;

	headings.forEach((heading, index) => {
		const headingText = heading.textContent.trim();

		// IDがない場合は自動的に付与
		if (!heading.id) {
			heading.id = `heading-${index + 1}`;
		}
		tocHTML += `<li><a href="#${heading.id}">${headingText}</a></li>`;
	});
	tocHTML += '</ol></details></nav>';
	asideElement.innerHTML = tocHTML;
}

/**
 * ページ読み込み完了後に目次を生成
 */
document.addEventListener('DOMContentLoaded', () => {
	createToc();
});
