import Link from "next/link";
import { NotionRenderer } from "react-notion";

import { getAllPosts } from "../posts";
import { getAllTags } from "./index";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Footer from "../../components/footer";

export async function getStaticProps({ params: { tag } }) {
  // Get all posts again
  const posts = await getAllPosts();
  const tags = await getAllTags();

  const tagData = tags.find((x) => x.Name === tag);
  const tagArticles = tagData["Related to Drew.tech (Property)"];
  const taggedPosts = posts.filter((x) => tagArticles.includes(x.id) && x.date);

  const blocks = await fetch(
    `https://notion.drewtech.workers.dev/v1/page/${tagData.id}`
  ).then((res) => res.json());

  const namesAndSlugs = taggedPosts.map((x) => ({
    date: x.date,
    Name: x.Name,
    slug: x.slug,
  }));

  if (taggedPosts.length === 0) {
    return {
      props: {},
    };
  }

  return {
    props: {
      posts: namesAndSlugs,
      topic: tag,
      blocks,
    },
    revalidate: 60,
  };
}

const Page = ({ posts, topic, blocks }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!posts) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const readableTopic = topic.replace(/-/g, " ");

  return (
    <>
      {posts && (
        <>
          <Head>
            <title>{`drew.tech – ${readableTopic}`}</title>
            <meta
              property="og:title"
              content={`drew.tech – ${readableTopic}`}
            />
            <meta
              property="twitter:title"
              content={`drew.tech – ${readableTopic}`}
            />
            <meta name="title" content={`drew.tech – ${readableTopic}`} />
            <meta
              name="description"
              content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`https://drew.tech/topics/${topic}`}
            />
            <meta property="og:title" content="drew.tech" />
            <meta
              property="og:description"
              content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
            />

            <meta property="twitter:card" content="summary_large_image" />
            <meta
              property="twitter:url"
              content={`https://drew.tech/topics/${topic}`}
            />
            <meta
              property="twitter:title"
              content={`drew.tech – ${readableTopic}`}
            />
            <meta
              property="twitter:description"
              content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
            />
          </Head>
          <div className="px-2 container mx-auto py-4 md:py-12 lg:py-16 lg:px-48 xl:px-56 2xl:px-96">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
              {readableTopic}
            </h1>
            <div className="pt-4">
              <NotionRenderer blockMap={blocks} darkMode={false} />
            </div>
            <h3 className="pt-4">
              {posts.length === 1 ? `1 post` : `${posts.length} posts`}
            </h3>
            <div className="pt-4">
              <ul>
                {posts.map(
                  (post) =>
                    post.date && (
                      <li
                        key={post.slug}
                        className="underline text-black pt-2 md:pt-4 md:text-xl"
                      >
                        <Link
                          key={post.slug}
                          href="/[slug]"
                          as={`/${post.slug}`}
                        >
                          {post.Name}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const tags = await getAllTags();
  return {
    paths: tags.map((topic) => `/topics/${topic.Name}`),
    fallback: true,
  };
}

export default Page;
