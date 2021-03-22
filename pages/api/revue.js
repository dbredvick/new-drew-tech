const cheerio = require('cheerio');

const revue = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await fetch('https://www.getrevue.co/api/v2/issues', {
        headers: new Headers({
          Authorization: `Bearer ${process.env.REVUE_API_KEY}`,
        }),
        method: 'GET',
      }).then(response => response.json());

      const posts = data.map(x => {
        const $ = cheerio.load(x.html);
        const intro = $('p:first').text();
        return {
          ...x,
          intro,
          url: x.url.replace(
            'www.getrevue.co/profile/dbredvick',
            'newsletter.drew.tech'
          ),
        };
      });
      return res.status(200).json({ posts });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
export default revue;
