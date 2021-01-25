const playwright = require("playwright-aws-lambda");

const getAbsoluteURL = (path) => {
  const baseURL = "https://drew.tech/";
  return baseURL + path;
};

exports.handler = async (event) => {
  const browser = await playwright.launchChromium({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630,
    },
  });
  // Generate the full URL out of the given path (GET parameter)
  const url = getAbsoluteURL(event.query["path"] || "");
  await page.goto(url, {
    timeout: 15 * 1000,
  });
  const data = await page.screenshot({
    type: "png",
  });
  await browser.close();

  const response = {
    statusCode: 200,
    headers: {
      "Cache-Control": "s-maxage=31536000, stale-while-revalidate",
      "Content-Type": "image/png",
    },
    body: data,
  };
  return response;
};
