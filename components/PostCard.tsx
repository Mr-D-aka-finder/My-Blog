import React, { ReactHTML } from "react";
//日付指定で情報を取得できるAPI
import moment from "moment";
//サイト内遷移
import Link from "next/link";

const PostCard = ({ post }: any) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1
        className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold"
        key={post.slug}
      >
        {/* 各投稿に飛べるようにslug基準でlinkを設定 */}
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            alt={post.author.name}
            height="30px"
            width="30px"
            className="align-middle rounded-full"
            src={post.author.photo.url}
          />
          <p className="inline align-middle text-black ml-2 text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-black">
          <span>
            {/* これから日付を取得したいときはこいつに世話になろう */}
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <p className="text-center text-lg text-black font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 transform hover:translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            この記事を読む
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
