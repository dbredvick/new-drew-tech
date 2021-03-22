import { NotionRenderer } from 'react-notion';

import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from './posts';
import { getAllTags } from './topics';
import Updates from '../components/updates';

export async function getStaticProps({ params: { slug } }) {
  // Get all posts again
  const posts = await getAllPosts();
  const tags = await getAllTags();

  const post = posts.find(t => t.slug === slug);

  const topics = tags
    .filter(x => post?.Tags?.includes(x.id))
    .map(x => ({
      readable: x.Name.replace(/-/g, ' '),
      slug: x.Name,
    }));

  // Find the current blogpost by slug

  if (!post) {
    return {
      props: {},
    };
  }

  const blocks = await fetch(
    `https://notion.drewtech.workers.dev/v1/page/${post.id}`
  ).then(res => res.json());

  return {
    props: {
      blocks,
      post,
      topics,
    },
    revalidate: 60,
  };
}

const Page = ({ post, blocks, topics }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }
  return (
    <>
      {post && (
        <>
          <Head>
            <title>{`drew.tech – ${post.Name}`}</title>
            <meta property="og:title" content={`drew.tech – ${post.Name}`} />
            <meta
              property="twitter:title"
              content={`drew.tech – ${post.Name}`}
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`https://drew.tech/${post.slug}`}
            />
            <meta
              property="twitter:url"
              content={`https://drew.tech/${post.slug}`}
            />
            <meta
              property="description"
              content={
                post?.intro ??
                "I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
              }
            />
            <meta
              property="og:description"
              content={
                post?.intro ??
                "I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
              }
            />
          </Head>
          <div className="px-2 container mx-auto py-4 md:py-12 lg:py-16 lg:px-48 xl:px-56 2xl:px-96">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
              {post.Name}
            </h1>
            {post.date && (
              <h3 className="pt-8">{new Date(post.date).toDateString()}</h3>
            )}
            <div className="pt-4">
              {topics.map(topic => (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mr-2 hover:underline">
                  <Link href={`/topics/${topic.slug}`}>{topic.readable}</Link>
                </span>
              ))}
            </div>
            {post?.intro && <div className="pt-8 prose">{post.intro}</div>}

            <div className="prose prose-green">
              <NotionRenderer blockMap={blocks} darkMode={false} />
            </div>
            {post?.CTA === 'none' && <></>}
            {typeof post.CTA !== 'undefined' && post.CTA !== 'none' && (
              <>
                <div className="pt-12">
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-sm text-gray-500">
                        Follow
                      </span>
                    </div>
                  </div>

                  <Updates />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(row => `/${row.slug}`),
    fallback: true,
  };
}

export default Page;
