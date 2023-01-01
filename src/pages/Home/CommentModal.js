import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaTelegramPlane } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";

const CommentModal = ({ comments, SetModal, setCount }) => {
  const { user } = useContext(AuthContext);
  const displayName = user?.displayName;
  const email = user?.email;
  const photoURL = user?.photoURL;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handelPost = (data) => {
    const comment = {
      name: displayName,
      text: data.text,
      email: email,
      type: "",
      img: photoURL,
    };
    SetModal("1");
    fetch(`http://localhost:5000/comment/${comments._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        setCount((count) => !count);
        SetModal("");
        console.log(data);
      })
      .catch((err) => console.log(err));

    reset();
  };
  return (
    <div>
      <div>
        <input type="checkbox" id="comment-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h1>Write Comment</h1>
              <label
                htmlFor="comment-modal"
                className="btn btn-sm bg-slate-200 border-none text-black  hover:text-white"
              >
                X
              </label>
            </div>
            <div>
              <form
                onSubmit={handleSubmit(handelPost)}
                className="flex my-5 relative items-center space-y-5 w-full"
              >
                <input
                  type="text"
                  {...register("text", { required: true })}
                  placeholder="Write a comment..."
                  className="input w-full"
                />
                {errors.exampleRequired && <span>This field is required</span>}
                <button
                  className="absolute -top-3 right-4 text-4xl"
                  type="submit"
                >
                  <FaTelegramPlane />
                </button>
              </form>
              <div>
                {comments?.comments?.map((comment, index) => (
                  <div key={index} className="flex my-3 items-start">
                    <div className="text-left">
                      {comment?.img && (
                        <div className="avatar online">
                          <div className="w-10 bg-slate-200 rounded-full">
                            <img src={comment?.img} alt="" />
                          </div>
                        </div>
                      )}
                      {!comment?.img && (
                        <div className=" avatar online">
                          <div className="w-10 bg-slate-200 rounded-full">
                            <FcBusinessman className="text-4xl ml-[2px]"></FcBusinessman>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-left ml-10">
                      <h1>{comment?.name}</h1>
                      <p>{comment?.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
