import { loadFile } from '@lib/api/file/fetch-markdown';
import { getMarkdownPaths } from '@lib/api/github/fetch-markdown';

// Publish Github Issues as Statuc Site Pages with raw Markdown text

const Issues = ({ posts }) => {
  console.log(`mdString 222: ${posts}`);
  return (
    <pre style={{ "wordWrap": "break-word", "whiteSpace": "pre-wrap" }}>{posts}</pre>
  )
}

export async function getStaticProps(context) {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  const slug = context.params.slug;
  // const mdString = await loadMDRaw(slug)
  const mdString = await loadFile(slug)
  console.log(`mdString: ${mdString}`);
  // data = JSON.stringify(json)

  return {
    props: {
      posts: mdString
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  const issues = await getMarkdownPaths()


  // Get the paths we want to pre-render based on posts
  const paths = issues.map((issue) => ({
    params: { slug: issue },
  }))
  console.log(paths);
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false }
}

export default Issues