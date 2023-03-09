import React from "react";
import { getPosts, getPostDetails } from "../../services";
import { PostDetail, Categories, PostWidget, Author } from "../../components";

const PostDetails = ({ post }: any) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      {/* スマホの場合は一列おきに表示。lgでは12列。 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              categories={post.categories.map(
                (category: { slug: any }) => category.slug
              )}
              slug={post.slug}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

//getStaticPropsはページのコンテンツが外部データに依存する場合に使われる
//プレレンダリング時(ユーザーがアクセスする前に構築されているページ)にデータを取得するため。
//getStaticPropsでビルド時にデータを取得して事前にHTMLファイルのレンダリングを行うことができる
export async function getStaticProps({ params }: any) {
  //getPostsの処理が完了後、結果を返す。投稿がなければ空の配列を返す
  const data = await getPostDetails(params.slug);
  //結果(props)には投稿の結果をオブジェクト形式で返す
  //
  return {
    props: { post: data },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }: any) => ({ params: { slug } })),
    fallback: true,
  };
}
