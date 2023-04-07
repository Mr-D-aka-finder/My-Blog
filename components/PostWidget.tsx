import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import { graphCMSImageLoader } from "../util";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = (categories: any, slug: any) => {
  //const [状態変数、状態を変更するための関数] = useState(状態の初期値);
  //relatedPosts = 初期値、setRelatedPostsが呼び出されると指定の値に→relatedPostsの値がリセットされる
  const [relatedPosts, setRelatedPosts] = useState<string[]>([]);

  useEffect(() => {
    /* 類似の投稿を3つ昇順で取得 
    slug = 各々のブログ記事を表すもの　*/
    if (slug) {
      //類似投稿を取得
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
      {/* 課題、mapの型定義、keyの使用法
      keyにindexを使用して良い条件。
      配列の中身が静的である(計算、変更がされない)
      配列の中の要素がidを持っていない
      配列の破壊的変更が行われることがない
      */}
      {relatedPosts.map((post: any, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              unoptimized
              loader={graphCMSImageLoader}
              alt={post.title}
              className="align-middle rounded-full height=60px width=60px"
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
