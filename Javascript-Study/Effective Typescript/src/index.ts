type Language = 'Javascript' | 'Typescript';
interface GovnernedLanguage {
	language: Language
	org: string
}

function complain(language: GovnernedLanguage) { /* */}
const ts = {
	language: 'Typescript' as const,
	org: 'MS'
}
complain(ts); 