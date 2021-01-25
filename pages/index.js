import Link from "next/link";
import Footer from "../components/footer";

const NOTION_BLOG_ID = "ad594837ce354521a7eed4ffb95954a2";

export const getPublishedPosts = async () => {
  const results = await fetch(
    `https://notion.drewtech.workers.dev/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
  return results
    .filter((x) => typeof x.date === "string")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export async function getStaticProps() {
  const allPosts = await getPublishedPosts();

  const posts = allPosts.filter((x) => typeof x.date === "string"); // index page only show pages with publish dates

  return {
    props: {
      posts,
    },
    revalidate: 300,
  };
}

function HomePage({ posts }) {
  const featuredPosts = posts.filter((x) => x.featured == "true");
  return (
    <div className="px-2 container mx-auto py-4 md:py-12 lg:py-16 lg:px-48 xl:px-56 2xl:px-96">
      <Header />
      <div className="pt-12">
        <Highlights />
        <BestPosts posts={featuredPosts} />
        <Posts posts={posts} />
      </div>
      <Footer />
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              Tech
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              I'm interested in tech that enables solo-founders to build
              sustainable companies. Tech I'm interested in right now:{" "}
              <b>Amplify, Next.js, Supabase, Tailwind, and Vercel</b>.
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              Finance
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              I love all things finance – personal, business, stock market, etc.
              I've recently become interested in the buying and selling of small
              SaaS companies.{" "}
              <b>
                My goal is to earn a full-time income via bootstrapped products.
              </b>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              Building FitVitals
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              As I was evaluating performance monitoring tools, I noticed they
              are all missing the team-based features. I'm building{" "}
              <Link href="https://fitvitals.dev" passHref>
                <a className="underline ">FitVitals</a>
              </Link>{" "}
              cross functional <b>teams</b> and{" "}
              <Link href="/topics/core-web-vitals" passHref>
                <a className="underline font-bold">Core Web Vitals</a>
              </Link>{" "}
              as first class citizens.
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              Documenting my progress
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              I write for a few reasons: I like helping other people, I think
              more clearly when I'm writing, and it keeps me accountable. I've
              written quite a bit about{" "}
              <Link href="/topics/nextjs" passHref>
                <a className="underline">Next.js</a>
              </Link>
              ,{" "}
              <Link href="/topics/core-web-vitals" passHref>
                <a className="underline">Core Web Vitals</a>
              </Link>
              ,{" and "}
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
      <div>
        <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
          Hi, I'm Drew.
        </h1>
        <h3 className="pt-4 text-xl lg:text-2xl xl:text-3xl">
          Let's build something together.
        </h3>
      </div>
      <div className="pt-4">
        <p>
          I work a full-time job in tech and bootstrap products on the side to
          earn financial freedom. I write about tech that enables solo-founders,
          my Indie Hacker journey, and personal learnings along the way.{" "}
          <Link href="/about" passHref>
            <a className="underline">Read more</a>
          </Link>
          .
        </p>
      </div>
    </>
  );
};

const BestPosts = ({ posts }) => {
  if (!posts) {
    return (
      <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
        Some of my best posts:
      </h3>
    );
  }
  return (
    <div className="mt-24">
      <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
        Some of my best posts:
      </h3>
      <ul className="mt-4">
        {posts.slice(0, 8).map((post) => (
          <li
            key={post.slug}
            className="underline text-black pt-2 md:pt-4 md:text-xl"
          >
            <Link key={post.slug} href="/[slug]" as={`/${post.slug}`}>
              {post.Name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Posts = ({ posts }) => {
  if (!posts) {
    return (
      <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
        Recent posts:
      </h3>
    );
  }
  return (
    <div className="mt-20">
      <h3 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
        Recent posts:
      </h3>
      <ul className="mt-4">
        {posts.slice(0, 6).map((post) => (
          <li
            key={post.slug}
            className="underline text-black pt-2 md:pt-4 md:text-xl"
          >
            <Link key={post.slug} href="/[slug]" as={`/${post.slug}`}>
              {post.Name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="pt-4">
        <Link href="/posts" passHref>
          <a className="underline">See all posts</a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
