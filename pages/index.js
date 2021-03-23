import Link from 'next/link';
import Footer from '../components/footer';
import BestPosts from '../components/best-posts';
import Revue from '../components/revue';
import Newsletter from '../components/newsletter';
import Updates from '../components/updates';

import { getAllTags } from './topics';

const cheerio = require('cheerio');

const NOTION_BLOG_ID = 'ad594837ce354521a7eed4ffb95954a2';
const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://drew.tech';

export const getPublishedPosts = async () => {
  const results = await fetch(
    `https://notion.drewtech.workers.dev/v1/table/${NOTION_BLOG_ID}`
  ).then(res => res.json());
  return results
    .filter(x => typeof x.date === 'string')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getRevuePosts = async () => {
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
  return posts;
};

export async function getStaticProps() {
  const allPosts = await getPublishedPosts();
  const revuePosts = await getRevuePosts();

  const tags = await getAllTags();

  let posts = await allPosts.map(x => ({
    ...x,
    topics: x.Tags.map(tagId => tags.find(tag => tag.id === tagId)),
  }));

  posts = posts.filter(x => typeof x.date === 'string'); // index page only show pages with publish dates

  return {
    props: {
      posts,
      revuePosts,
    },
    revalidate: 300,
  };
}

function HomePage({ posts, revuePosts }) {
  const featuredPosts = posts.filter(x => x.featured === 'true');
  return (
    <div className="px-2 container mx-auto py-4 md:py-12 lg:py-16  lg:px-56">
      <Header />
      <div className="pt-16">
        <Highlights />
      </div>
      <div className="pt-16">
        <Updates />
      </div>

      <div className="pt-16">
        <BestPosts posts={featuredPosts} />
      </div>
      <div className="pt-16">
        <Revue posts={revuePosts} />
      </div>
      <div className="pt-8">
        <Newsletter />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

const Highlights = () => {
  return (
    <>
      <dl className="pt-8 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-16">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
              {/* Heroicon name: globe-alt */}

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              <a href="#revue">The Bootstrapper's Journey Weekly</a>
            </dt>
            <dd className="mt-2 text-base text-gray-500 prose prose-green">
              I'm writing a weekly newsletter documenting my progress towards
              ramen profitability. Check out the{' '}
              <a href="https://newsletter.drew.tech/issues/being-on-the-hook-issue-1-408972">
                first issue
              </a>{' '}
              and <a href="#signup">sign up</a> if you're interested.
            </dd>
          </div>
        </div>
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
              {/* Heroicon name: scale */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 335 276"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="30"
                  d="m302 70a195 195 0 0 1 -299 175 142 142 0 0 0 97 -30 70 70 0 0 1 -58 -47 70 70 0 0 0 31 -2 70 70 0 0 1 -57 -66 70 70 0 0 0 28 5 70 70 0 0 1 -18 -90 195 195 0 0 0 141 72 67 67 0 0 1 116 -62 117 117 0 0 0 43 -17 65 65 0 0 1 -31 38 117 117 0 0 0 39 -11 65 65 0 0 1 -32 35"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              <a href="https://plzdm.me">plzdm.me</a>
            </dt>
            <dd className="mt-2 text-base text-gray-500 prose prose-green">
              Everyone seems to have a the same DM problem on Twitter. This app
              gives everyone DM superpowers.
              <br />
              <a href="https://plzdm.me">Check it out</a>.
            </dd>
          </div>
        </div>
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
              {/* Heroicon name: scale */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              <a href="https://fitvitals.dev">FitVitals.dev</a>
            </dt>
            <dd className="mt-2 text-base text-gray-500 prose prose-green">
              <Link href="https://fitvitals.dev" passHref>
                <a className="underline ">FitVitals</a>
              </Link>{' '}
              is performance monitoring for cross functional <b>teams</b> built
              with{' '}
              <Link href="/topics/core-web-vitals" passHref>
                <a className="underline font-bold">Core Web Vitals</a>
              </Link>{' '}
              as a priority.
            </dd>
          </div>
        </div>
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              <a href="https://drew.tech">drew.tech</a>
            </dt>
            <dd className="mt-2 text-base text-gray-500 prose prose-green">
              This site is the home of my longer writing that's more timeless.
              It ranges from technical content to personal growth. I've written
              about{' '}
              <Link href="/topics/nextjs" passHref>
                <a className="underline">Next.js</a>
              </Link>
              ,{' '}
              <Link href="/topics/core-web-vitals" passHref>
                <a className="underline">Core Web Vitals</a>
              </Link>
              ,{' and '}
              <Link href="/topics/side-projects" passHref>
                <a className="underline">various side projects</a>
              </Link>
              .
            </dd>
          </div>
        </div>
      </dl>
    </>
  );
};

const Header = () => {
  return (
    <>
      <div className="pt-6">
        <div className="w-full inline-flex items-center">
          <img
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-green-300"
            src="/drew-small-2.jpg"
            alt=""
          />
          <div className="pl-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-10 font-extrabold  sm:leading-none">
              Hi, I'm Drew.
            </h1>
            <a
              className="text-accents-2 text-sm pt-2"
              href="https://twitter.com/dbredvick"
            >
              @DBredvick
            </a>
          </div>
        </div>
      </div>
      <div className="pt-12 prose prose-green">
        <p>
          I bootstrap products as a solo-founder while working a full-time job.
          On the road to ramen profitability & writing about it as I go. Check
          out what I'm working on below.{' '}
          <Link href="/about" passHref>
            <a className="underline">Read more</a>
          </Link>
          .
        </p>
      </div>
    </>
  );
};

// const BestPosts = ({ posts }) => {
//   if (!posts) {
//     return (
//       <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
//         Some of my best posts:
//       </h3>
//     );
//   }
//   return (
//     <div className="mt-24">
//       <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
//         Some of my best posts:
//       </h3>
//       <ul className="mt-4">
//         {posts.slice(0, 8).map((post) => (
//           <li
//             key={post.slug}
//             className="underline text-black pt-2 md:pt-4 md:text-xl"
//           >
//             <Link key={post.slug} href="/[slug]" as={`/${post.slug}`}>
//               {post.Name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const Posts = ({ posts }) => {
//   if (!posts) {
//     return (
//       <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
//         Recent posts:
//       </h3>
//     );
//   }
//   return (
//     <div className="mt-20">
//       <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
//         Recent posts:
//       </h3>
//       <ul className="mt-4">
//         {posts.slice(0, 6).map(post => (
//           <li
//             key={post.slug}
//             className="underline text-black pt-2 md:pt-4 md:text-xl"
//           >
//             <Link key={post.slug} href="/[slug]" as={`/${post.slug}`}>
//               {post.Name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <div className="pt-4">
//         <Link href="/posts" passHref>
//           <a className="underline">See all posts</a>
//         </Link>
//       </div>
//     </div>
//   );
// };

export default HomePage;
