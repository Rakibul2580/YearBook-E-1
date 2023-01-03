import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import {
  FaFlag,
  FaPhotoVideo,
  FaRegCommentDots,
  FaRegThumbsUp,
  FaVideo,
} from "react-icons/fa";
import CommentModal from "../Home/CommentModal";
import Modal from "../Home/Modal";

const Profile = () => {
  const { userData, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modal, SetModal] = useState("");
  const [comments, SetComments] = useState({});
  const [count, setCount] = useState(true);

  useEffect(() => {
    fetch(`https://yourbookserver-rakibul2580.vercel.app/post/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, [user?.email, count]);

  const handelLike = (id) => {
    const like = {
      name: user?.displayName,
      type: "",
      email: user?.email,
      img: user?.photoURL,
    };

    const match = posts.find((post) => post._id === id);
    const likeMatch = match.like.find((post) => post?.email === user?.email);
    if (likeMatch) {
      handelDelete(likeMatch, id);
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

  const handelDelete = (likeMatch, id) => {
    fetch(`https://yourbookserver-rakibul2580.vercel.app/like/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(likeMatch),
    })
      .then((res) => res.json())
      .then((data) => setCount(!count))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-100">
      <div className=" mx-auto bg-white rounded-md">
        <div className="flex flex-col w-full overflow-hidden rounded">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"
            alt=""
            className="w-full rounded-md h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="mx-auto p-2 -mt-24 space-y-6 lg:max-w-2xl sm:px-10 lg:rounded-md">
            <img
              alt=""
              className="w-40 h-40 rounded-full ring-2 ring-offset-2 ring-white"
              src={userData?.img}
            />
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              {userData?.fastName + " " + userData?.lastName}
            </h1>
            <p className="text-xl font-medium text-black my-2">
              {friends.length} friends
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div className="">
                <img
                  src={userData?.img}
                  alt=""
                  className="rounded-full w-11 h-11 mt-1"
                />
              </div>
              <input
                className="w-9/12 p-2 rounded-md mx-auto border-2 border-gray-100"
                type="text"
                placeholder="Text"
              />
            </div>
            <div className="flex justify-around items-center border-t-2 mt-5 py-5">
              <div className="flex justify-center space-x-2 items-center">
                <span>
                  <FaVideo className="text-green-500" />
                </span>
                <span>Live video</span>
              </div>
              <div className="flex justify-center space-x-2 items-center">
                <span>
                  <FaPhotoVideo className="text-green-500" />
                </span>
                <span>Photo/video</span>
              </div>
              <div className="flex justify-center space-x-2 items-center">
                <span>
                  <FaFlag className="text-green-500" />
                </span>
                <span>Life event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {posts.length === 0 && <div>you</div>}
      {posts.length >= 0 && (
        <div>
          {posts.map((post) => (
            <div key={post._id} className="shadow-inner bg-white rounded-xl">
              <div className="flex items-center mb-2 mt-4 pt-4">
                <div className="">
                  <img
                    src={userData?.img}
                    alt=""
                    className="w-10 h-10 bg-slate-200 rounded-full"
                  />
                </div>
                <div className="text-left ml-4">
                  <h1>{post?.userName}</h1>
                  <p>{post?.date.slice(0, 16).replace("T", "-")}</p>
                </div>
              </div>
              <h1 className="mb-2 text-left px-2">{post?.title}</h1>
              <img src={post?.img} alt="" className="w-full" />
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
          {!modal && <Modal SetModal={SetModal}></Modal>}
          {!modal && (
            <CommentModal
              setCount={setCount}
              comments={comments}
              SetModal={SetModal}
            ></CommentModal>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
