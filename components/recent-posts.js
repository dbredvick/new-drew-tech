export default function Component({ posts }) {
  return (
    <div className="bg-gray-50 pt-16 pb-20 px-4 lg:pt-24 lg:pb-28 ">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Most recent posts
          </h2>
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
