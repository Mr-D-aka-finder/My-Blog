import Head from "next/head";
import { Key } from "react";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";

type HomeProps = {
  posts: any;
};

export default function Home({ posts }: HomeProps) {
  return (
    <div className="container mx-auto px-10 mb-8 bg-gray-300">
      <Head>
        <title>Dai Blog</title>
      </Head>
      {/* スマホの場合は縦並び、1024px以上はグリッドスタイルを変更、感覚は48px */}
      <div className="grid grid-flow-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1" key={posts.title}>
          {posts.map((post: { node: any; title: Key | null | undefined }) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        {/* lgの場合はブログ記事を横に4つ表示、それ以外は1つ表示 */}
        <div className="lg:col-span-4 col-span-1">
          {/* lgの範囲内でrelativeに配置。
        relativeで親要素を基準に動くように指定 */}
          <div className="lg:sticky relative top-8">
            <PostWidget categories={posts.categories} slug={posts.slug} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

//promiseを返すことを約束する関数
//getStaticPropsでビルド時にデータを取得して事前にHTMLファイルのレンダリングを行うことができる
export async function getStaticProps() {
  //getPostsの処理が完了後、結果を返す。投稿がなければ空の配列を返す
  const posts = (await getPosts()) || [];
  //結果(props)には投稿の結果をオブジェクト形式で返す
  return {
    props: { posts },
  };
}
