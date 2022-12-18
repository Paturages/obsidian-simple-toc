import { Editor, MarkdownView, Plugin } from 'obsidian';

const toHash = (str: string) => {
	const words = str.replace(/^#+ /, '').toLowerCase().split(/[^A-z0-9]/).filter(x => x.trim());
	return `#${words.join('-')}`;
}

export default class SimpleTOC extends Plugin {
	async onload() {
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'simple-toc',
			name: 'Simple Table of Contents',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const fullText = editor.getValue();
				const headings = fullText.split('\n').filter(line => line.trim().startsWith('#'));
				editor.replaceRange(
					headings.map(title => {
						// The amount of indentation depends on the amount of #s
						const indentation = 2 * (title.split(' ')[0].length - 1);
						const text = title.split(' ').slice(1).join(' ');
						return `${' '.repeat(indentation)}* [${text}](${toHash(title)})`;
					}).join('\n'),
					editor.getCursor()
				);
			}
		});
	}
}
