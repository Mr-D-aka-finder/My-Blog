import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

type PostWidgetProps = {
  categories: any;
  slug: any;
};

const PostWidget = ({ categories, slug }: PostWidgetProps) => {
  //const [状態変数、状態を変更するための関数] = useState(状態の初期値);
  //relatedPosts = 初期値、setRelatedPostsが呼び出されると指定の値に→relatedPostsの値がリセットされる
  const [relatedPosts, setRelatedPosts] = useState<string[]>([]);

  useEffect(() => {
    /* 類似の投稿を3つ昇順で取得 
    slug = 別の投稿　*/
    if (slug) {
      getSimilarPosts(categories, slug).then((relatedPosts) =>
        setRelatedPosts(relatedPosts)
      );
    } else {
      /* 最近の投稿を3つ昇順で表示 */
      getRecentPosts().then((relatedPosts) => setRelatedPosts(relatedPosts));
    }
  }, [slug]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "この記事に関連ある記事を読む" : "最近の記事を読む"}
      </h3>
      {/* 課題、mapの型定義、keyの使用法*/}
      {relatedPosts.map((post: any) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
