import Link from "next/link";
import Head from "next/head";

const NOTION_BLOG_ID = "fee7a3e8996941bfbadbbcfd2f84d63e";

export const getAllTags = async () => {
  const results = await fetch(
    `https://notion.drewtech.workers.dev/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
  return results.sort((a, b) =>
    a.date && b.date ? new Date(b.date) - new Date(a.date) : a.date ? -1 : 1
  );
};

export async function getStaticProps() {
  const tags = await getAllTags();
  return {
    props: {
      topics: tags.sort((a, b) =>
        a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1
      ),
    },
    revalidate: 60,
  };
}

function HomePage({ topics }) {
  return (
    <div className="px-2 container mx-auto py-4 lg:px-48 xl:px-56 2xl:px-96">
      <div className="pt-12">
        <Topics topics={topics} />
      </div>
    </div>
  );
}

const Topics = ({ topics }) => {
  if (topics.length === 0) {
    return (
      <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
        Topics
      </h3>
    );
  }
  return (
    <>
      <Head>
        <title>drew.tech – Topics</title>
        <meta property="og:title" content={`drew.tech – Topics`} />
        <meta property="twitter:title" content={`drew.tech – Topics`} />
        <meta name="title" content="drew.tech – Topics" />
        <meta
          name="description"
          content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drew.tech/topics" />
        <meta property="og:title" content="drew.tech" />
        <meta
          property="og:description"
          content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://drew.tech/topics" />
        <meta property="twitter:title" content="drew.tech" />
        <meta
          property="twitter:description"
          content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
        />
      </Head>
      <div>
        <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
          Topics
        </h3>
        <ul>
          {topics.map((topic) => (
            <li
              key={topic.Name}
              className="underline text-black pt-2 md:pt-4 md:text-xl"
            >
              <Link
                key={topic.Name}
                href="/topics/[slug]"
                as={`/topics/${topic.Name}`}
              >
                {topic.Name.replace(/-/g, " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
