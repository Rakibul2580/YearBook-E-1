import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";

const Modal = ({ SetModal }) => {
  const { user, userData } = useContext(AuthContext);
  const displayName = user?.displayName;
  const email = user?.email;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const x = "28273534f15193232bf3f2551f053a4c";
  const handelPost = (data) => {
    const img = data.image[0];
    const formData = new FormData();
    formData.append("image", img);
    const url = "https://api.imgbb.com/1/upload";
    fetch(`${url}?key=${x}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const post = {
          userName: displayName,
          userEmail: email,
          userImg: userData.img,
          title: data.text,
          img: result.data.display_url,
          like: [],
          comments: [],
        };
        SetModal("1");
        fetch("https://yourbookserver-rakibul2580.vercel.app/post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((data) => {
            SetModal("");
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    reset();
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h1>Create post</h1>
            <label htmlFor="my-modal" className="btn">
              X
            </label>
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit(handelPost)}
              className="flex space-y-5 flex-col w-full"
            >
              <input
                type="text"
                {...register("text")}
                placeholder="Type here"
                className="input w-full"
              />
              <input
                type="file"
                {...register("image", { required: false })}
                placeholder="Type here"
                className="input w-full"
              />
              {errors.exampleRequired && <span>This field is required</span>}
              <button
                type="submit"
                className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
