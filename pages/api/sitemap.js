// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPublishedPosts } from "../index";

const postsRssXml = (blogPosts) => {
  let rssItemsXml = "";
  blogPosts.forEach((node) => {
    const post = node;

    const postHref = `https://drew.tech/${post.slug}`;

    rssItemsXml += `
      <url>
        <loc>${postHref}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
    </url>`;
  });
  return {
    rssItemsXml,
  };
};

const getRssXml = (blogPosts) => {
  const { rssItemsXml } = postsRssXml(blogPosts);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
            xmlns:xhtml="http://www.w3.org/1999/xhtml" 
            xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${rssItemsXml}
        </urlset>`;
};

export default async (req, res) => {
  const postData = await getPublishedPosts();
  // fetch your RSS data from somewhere here
  const blogPosts = getRssXml(postData);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.send(blogPosts);
  res.end();
};
