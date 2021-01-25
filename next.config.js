module.exports = {
  async rewrites() {
    return [
      {
        destination: "/api/sitemap",
        source: "/sitemap.xml",
      },
      {
        destination: "/api/rss",
        source: "/rss.xml",
      },
    ];
  },
};
