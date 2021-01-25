// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPublishedPosts } from "../index";

const postsRssXml = (blogPosts) => {
  let latestPostDate = "";
  let rssItemsXml = "";
  blogPosts.forEach((node) => {
    const post = node;
    const postDate = Date.parse(post.date);

    // Remember to change this URL to your own!
    const postHref = `https://drew.tech/${post.slug}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }

    rssItemsXml += `
      <item>
        <title><![CDATA[${post.Name}]]></title>
        <link>${postHref}</link>
        <pubDate>${post.date}</pubDate>
        <guid isPermaLink="false">${postHref}</guid>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (blogPosts) => {
  const { rssItemsXml, latestPostDate } = postsRssXml(blogPosts);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[Next.js Jobs]]></title>
        <link>https://drew.tech</link>
        <description>
          <![CDATA[I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something.]]>
        </description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
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
