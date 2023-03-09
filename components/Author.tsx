import React from "react";

const Author = ({ author }: any) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-white">
      <div className="absolute left-0 right-0 -top-14">
        <img
          alt={author.name}
          height="100px"
          width="100px"
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      </div>
      <h3 className="text-black my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-black text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
