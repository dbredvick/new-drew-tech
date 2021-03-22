import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'tailwindcss/tailwind.css';
import '../styles/react-notion-overrides.css';
import { GoogleFonts } from 'next-google-fonts';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>drew.tech</title>
        <meta name="title" content="drew.tech" />
        <meta
          name="description"
          content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drew.tech" />
        <meta property="og:title" content="drew.tech" />
        <meta
          property="og:description"
          content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://drew.tech" />
        <meta property="twitter:title" content="drew.tech" />
        <meta
          property="twitter:description"
          content="I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together."
        />
        <meta
          property="og:image"
          content={`https://drew.tech/api/thumbnail?path=${router.asPath}`}
        />
        <meta
          property="twitter:image"
          content={`https://drew.tech/api/thumbnail?path=${router.asPath}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          defer
          data-website-id="b693215d-a58d-41c8-b68b-8fad4d8881e4"
          src="https://data.drew.tech/umami.js"
        />
      </Head>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
