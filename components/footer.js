import Link from "next/link";

export default function Footer() {
  return (
    <div className="pt-12">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500">Follow</span>
        </div>
      </div>

      <div className="pt-4 text-gray-800">
        <h4 className="text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-10 font-extrabold text-green-900 sm:leading-none">
          Interested in hearing more from me?
        </h4>{" "}
        <div className="mt-2">
          Sign up for my newsletter where I write about:
        </div>
        <ul className="mt-2 notion-list notion-list-disc">
          <li>earning a living on the internet</li>
          <li>tech for solo-founders</li>
          <li>software as a service</li>
        </ul>
        <Link href="https://signup.drew.tech" passHref>
          <div className="bg-green-900 mt-2 text-white cursor-pointer inline-flex px-10 leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center uppercase py-4 border border-transparent items-center hover:bg-green-600  hover:border hover:border-green-900 rounded-md">
            Subscribe
          </div>
        </Link>
      </div>
    </div>
  );
}
