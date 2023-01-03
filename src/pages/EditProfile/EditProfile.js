import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

const EditProfile = () => {
  const { profile, userData, setTotol } = useContext(AuthContext);
  const [animate, SetAnimate] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const x = "28273534f15193232bf3f2551f053a4c";
  const handelSignUp = (data) => {
    SetAnimate(true);
    const { fastName, lastName, birthday, gender } = data;
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
        let url = result.data.display_url;
        const user = {
          fastName,
          lastName,
          birthday,
          gender,
          img: url,
        };
        fetch(
          `https://yourbookserver-rakibul2580.vercel.app/user/${userData?._id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const name = fastName + " " + lastName;
            profile(name, url);
            setTotol((togol) => !togol);
            toast.success("Edit Profile Successfully");
            SetAnimate(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    reset();
  };

  return (
    <div>
      <div>
        <div className="w-full -mt-4 p-4 rounded-md shadow sm:p-8 dark:bg-width dark:text-black">
          <div className="mb-5">
            <h2 className="mb-3 text-3xl font-semibold text-center">
              Create a new account
            </h2>
            <p className="text-sm text-center dark:text-gray-400">
              It’s quick and easy.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handelSignUp)}
            className="space-y-8 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-left ml-1 text-sm">
                  Fast Name: {userData.fastName}
                </label>
                <input
                  type="text"
                  {...register("fastName", { required: true })}
                  placeholder="Fast Name *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-900 dark:bg-gray-100 dark:text-gray-900 focus:dark:border-violet-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-left ml-1 text-sm">
                  Last Name: {userData.lastName}
                </label>
                <input
                  type="text"
                  {...register("lastName", { required: true })}
                  placeholder="Last Name *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-900 dark:bg-gray-100 dark:text-gray-900 focus:dark:border-violet-400"
                />
              </div>
              <div className="space-y-2 space-x-2 flex items-center">
                <img
                  src={userData?.img}
                  alt=""
                  className="rounded-full w-11 h-11 mt-1"
                />
                <input
                  type="file"
                  {...register("image", { required: true })}
                  placeholder="Mobile number or email *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-900 dark:bg-gray-100 dark:text-gray-900 focus:dark:border-violet-400"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="space-y-2 w-full">
                <label htmlFor="email" className="block text-left ml-1 text-sm">
                  Birthday: {userData.birthday}
                </label>
                <input
                  type="date"
                  {...register("birthday", { required: true })}
                  className="w-full px-3 py-[8px] border rounded-md dark:border-gray-900 dark:bg-gray-100 dark:text-gray-900 focus:dark:border-violet-400"
                />
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="email" className="block text-left ml-1 text-sm">
                  Gender: {userData.gender}
                </label>
                <select
                  {...register("gender", { required: true })}
                  className="w-full px-3 py-[9.5px] border rounded-md dark:border-gray-900 dark:bg-gray-100 dark:text-gray-900 focus:dark:border-violet-400"
                >
                  <option defaultValue>Select Gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            {errors.exampleRequired && <span>This field is required</span>}
            {!animate && (
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-green-500 dark:text-gray-100"
              >
                Submit
              </button>
            )}
            {animate && (
              <button
                type="submit"
                className="w-full flex justify-center px-8 py-3 font-semibold rounded-md dark:bg-green-500 dark:text-gray-100"
              >
                <div className="w-6 h-6  border-4 border-dashed rounded-full animate-spin dark:border-white"></div>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
