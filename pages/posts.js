import Link from "next/link";
import Head from "next/head";

const NOTION_BLOG_ID = "ad594837ce354521a7eed4ffb95954a2";

export const getAllPosts = async () => {
  const results = await fetch(
    `https://notion.drewtech.workers.dev/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
  return results.sort((a, b) =>
    a.date && b.date ? new Date(b.date) - new Date(a.date) : a.date ? -1 : 1
  );
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

function HomePage({ posts }) {
  return (
    <div className="px-2 md:px-24 py-4 md:py-12 lg:px-96 lg:py-16">
      <div className="pt-12">
        <Posts posts={posts} />
      </div>
    </div>
  );
}

const Posts = ({ posts }) => {
  if (!posts) {
    return (
      <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
        All posts
      </h3>
    );
  }
  return (
    <>
      <Head>
        <title>drew.tech – All posts</title>
        <meta property="og:title" content={`drew.tech – All posts`} />
        <meta property="twitter:title" content={`drew.tech – All posts`} />
      </Head>
      <div>
        <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
          All posts
        </h3>
        <ul>
          {posts.map(
            (post) =>
              post.date && (
                <li
                  key={post.slug}
                  className="underline text-black pt-2 md:pt-4 md:text-xl"
                >
                  <Link key={post.slug} href="/[slug]" as={`/${post.slug}`}>
                    {post.Name}
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
