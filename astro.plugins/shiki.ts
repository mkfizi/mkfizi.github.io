import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerNotationFocus,
    transformerNotationErrorLevel,
} from '@shikijs/transformers'

// Configuration
const config = {
    themes: {
        light: 'github-light',
        dark: 'github-dark',
    },
    langs: ['js', 'ts', 'json', 'html', 'css', 'bash', 'markdown'],
    wrap: true,
};



// Shiki transformers configuration
const transformers = [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerNotationFocus(),
    transformerNotationErrorLevel(),
    {
        name: 'transformer-wrapper',
        preprocess(code, options) {
            const metaString = options.meta?.__raw ?? '';
            const meta = Object.fromEntries(
                [...metaString.matchAll(/(\w+)="([^"]*)"/g)].map(([_, k, v]) => [k, v])
            );
            if (typeof meta.copy === 'undefined') meta.copy = 'true';
            
            this.meta = meta;
            this.rawCode = code;
            return code;
        },
        pre(pre) {
            pre.properties.style = null;
            console.log('meta copy:', this.meta.copy);
            
            return {
                type: 'element',
                tagName: 'div',
                properties: { class: 'code-block' },
                children: [
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: { class: 'code-header' },
                        children: [
                            {
                                type: 'element',
                                tagName: 'p',
                                children: [{ type: 'text', value: this.meta.title ?? pre.properties.dataLanguage }],
                            },
                            ...(this.meta.copy === 'true'
                            ? [
                                {
                                    type: 'element',
                                    tagName: 'button',
                                    properties: {
                                        type: 'button',
                                        'aria-label': 'Copy code.',
                                        'x-data': `{ 
                                            isCopied: false,
                                            code: ${JSON.stringify(this.rawCode)},
                                            copy() {
                                                navigator.clipboard.writeText(this.code);
                                                this.isCopied = true;
                                                setTimeout(() => { this.isCopied = false }, 2000);
                                            }
                                        }`,
                                        '@click': 'copy()'
                                    },
                                    children: [
                                        {
                                            type: 'raw',
                                            value: `<svg x-show="!isCopied" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/></svg>`
                                        },
                                        {
                                            type: 'raw',
                                            value: `<svg x-show="isCopied" x-cloak xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/><path d="M9 14l2 2l4 -4"/></svg>`
                                        }
                                    ]
                                }
                            ]
                            : [])
                        ],
                    },
                    pre,
                ],
            };
        },
    }
];

const shiki = {
    ...config,
    transformers,
};

export default shiki;