export default async function sitemap() {
    let routes = ['', '/uses', '/work', '/cv', 'social', '/life'].map((route) => ({
        url: `https://jonathansegal.io${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...routes];
}
