import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { FcBusinessman } from "react-icons/fc";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import CommentModal from "./CommentModal";
import { Vortex } from "react-loader-spinner";

const Home = () => {
  const [modal, SetModal] = useState("");
  const [comments, SetComments] = useState({});
  const [posts, setPosts] = useState([]);
  const { user, userData } = useContext(AuthContext);
  const [count, setCount] = useState(true);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch("https://yourbookserver-rakibul2580.vercel.app/post")
      .then((res) => res.json())
      .then((data) => {
        data.reverse();
        setPosts(data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, [count]);

  const handelLike = (id) => {
    const like = {
      name: user?.displayName,
      type: "",
      email: user?.email,
      img: user?.photoURL,
    };

    const match = posts?.find((post) => post._id === id);
    const likeMatch = match?.like?.find((post) => post?.email === user?.email);
    const pushLike = match?.like?.filter((post) => post?.email !== user?.email);
    if (likeMatch) {
      handelDelete(pushLike, id);
    } else {
      fetch(`https://yourbookserver-rakibul2580.vercel.app/post/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(like),
      })
        .then((res) => res.json())
        .then((data) => setCount(!count))
        .catch((err) => console.log(err));
    }
  };

  const handelDelete = (pushLike, id) => {
    fetch(`https://yourbookserver-rakibul2580.vercel.app/like/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(pushLike),
    })
      .then((res) => res.json())
      .then((data) => setCount(!count))
      .catch((err) => console.log(err));
  };
  if (loader) {
    return (
      <div className="flex justify-center">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 pt-3">
      <div className="flex justify-start items-center">
        <div className=" avatar online ml-2">
          <div className="w-10 bg-slate-200 rounded-full">
            <img src={userData?.img} alt="" />
          </div>
        </div>
        <label
          htmlFor="my-modal"
          className="btn w-[84%] ml-3 btn-sm bg-gray-200 border-0"
        >
          What's on your mind, Rakibul?
        </label>
      </div>
      {posts.map((post) => (
        <div
          key={post._id}
          className="shadow-inner my-2 bg-white rounded-xl w-full"
        >
          <div className="flex items-center mb-2 mt-4 pt-4">
            <div>
              {post?.userImg && (
                <div className="avatar online">
                  <div className="w-10 bg-slate-200 rounded-full">
                    <img src={post?.userImg} alt="" />
                  </div>
                </div>
              )}
              {!post?.userImg && (
                <div className=" avatar online ml-2">
                  <div className="w-10 bg-slate-200 rounded-full">
                    <FcBusinessman className="text-4xl ml-[2px]"></FcBusinessman>
                  </div>
                </div>
              )}
            </div>
            <div className="text-left ml-4">
              <h1>{post?.userName}</h1>
              <p>{post?.date.slice(0, 16).replace("T", "-")}</p>
            </div>
          </div>
          <h1 className="mb-2 text-left px-2">{post?.title}</h1>
          <img src={post?.img} alt="" className="w-full rounded-sm" />
          <div className="flex justify-around py-2 border-y-2 mt-3">
            <button
              onClick={() => handelLike(post._id)}
              className="btn btn-ghost btn-sm"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-2xl"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <FaRegThumbsUp />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item">
                  {post?.like?.length}
                </span>
              </div>
            </button>
            <label
              onClick={() => SetComments(post)}
              htmlFor="comment-modal"
              className="btn btn-ghost btn-sm"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-2xl"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <FaRegCommentDots />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item">
                  {post?.comments?.length}
                </span>
              </div>
            </label>
          </div>
        </div>
      ))}
      {!modal && <Modal setCount={setCount} SetModal={SetModal}></Modal>}
      {!modal && (
        <CommentModal
          setCount={setCount}
          comments={comments}
          SetModal={SetModal}
        ></CommentModal>
      )}
    </div>
  );
};

export default Home;
