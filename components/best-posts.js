import Link from 'next/link';

export default function Component({ posts }) {
  return (
    <div className="bg-gray-50 pt-16 pb-20 px-4 lg:pt-24 lg:pb-28 ">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Featured articles
          </h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-gray-500">
              Here is some of my best writing ranging in topics from personal
              growth to website performance monitoring.
            </p>
            <form className=" mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
              <div className="hidden">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 lg:max-w-xs"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                {/* <button
                  type="button"
                  className="hidden w-full bg-green-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:inline-flex"
                >
                  Notify me
                </button> */}
                <Link href="/posts" passHref>
                  <div className="w-full bg-green-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:inline-flex">
                    See all posts
                  </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {posts.slice(0, 8).map(post => (
            <div key={post.slug}>
              <a href={post.slug} className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  {post.Name}
                </p>

                <p className="mt-3 text-base text-gray-500">{post.intro}</p>
              </a>
              <div className="mt-3">
                <a
                  href={post.slug}
                  className="text-base font-semibold text-green-600 hover:text-green-500"
                >
                  Read full story
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
