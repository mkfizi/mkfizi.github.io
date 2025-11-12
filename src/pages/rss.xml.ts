import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
    return rss({
        title: 'Khafizi Noh\'s Logs',
        description: 'Khafizi Noh is a skilled full-stack web developer from Cyberjaya, Malaysia, specialized in web development.',
        site: context.site + '/logs',
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        customData: `<language>en-us</language>`,
    });
}