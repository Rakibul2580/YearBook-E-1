/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import logo from "../images/logo.png";

const SingIn = () => {
  const { signUp, signIn, profile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(true);
  const [animate, SetAnimate] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const x = "28273534f15193232bf3f2551f053a4c";

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handelSignUp = (data) => {
    SetAnimate(true);
    const { fastName, lastName, email, password, birthday, gender } = data;

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
        const url = result.data.display_url;
        const user = {
          fastName,
          lastName,
          email,
          password,
          birthday,
          gender,
          img: url,
        };
        signUp(email, password)
          .then((result) => {
            fetch("http://localhost:5000/user", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((data) => {
                const name = fastName + " " + lastName;
                SetAnimate(false);
                profile(name, url);
                toast.success("SingUp Successfully");
                localStorage.setItem("Token", JSON.stringify(result.user.uid));
                navigate(from, { replace: true });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    reset();
  };
  const handelSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("LogIn Successfully");
        localStorage.setItem("Token", JSON.stringify(result.user.uid));
        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <img className="w-6/12 mx-auto mt-10" src={logo} alt="" />
      <div
        className={
          data
            ? "hidden"
            : "w-100% h-screen mt-20 flex justify-center items-center"
        }
      >
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100">
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
              <div className="flex space-x-2">
                <div className="space-y-2">
                  <input
                    type="text"
                    {...register("fastName", { required: true })}
                    placeholder="Fast Name *"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    {...register("lastName", { required: true })}
                    placeholder="Last Name *"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  {...register("image", { required: true })}
                  placeholder="Mobile number or email *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Mobile number or email *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Password *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="space-y-2 w-full">
                <label htmlFor="email" className="block text-sm">
                  Birthday *
                </label>
                <input
                  type="date"
                  {...register("birthday", { required: true })}
                  className="w-full px-3 py-[8px] border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="email" className="block text-sm">
                  Gender *
                </label>
                <select
                  {...register("gender", { required: true })}
                  className="w-full px-3 py-[9.5px] border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
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
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
              >
                Sign up
              </button>
            )}
            {animate && (
              <button
                type="submit"
                className="w-full flex justify-center px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
              >
                <div className="w-6 h-6  border-4 border-dashed rounded-full animate-spin dark:border-white"></div>
              </button>
            )}
          </form>

          <div className="my-6 space-y-4"></div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-400" />
            <p className="px-3 dark:text-gray-400">OR</p>
            <hr className="w-full dark:text-gray-400" />
          </div>
          <p className="text-sm text-center dark:text-gray-400">
            Already have an account?
            <button
              onClick={() => setData(!data)}
              className="focus:underline underline hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
      <div
        className={
          !data ? "hidden" : "w-100% h-screen flex justify-center items-center"
        }
      >
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-5">
            <h2 className="mb-3 text-3xl font-semibold text-center">
              Log Into Facebook
            </h2>
          </div>
          <form
            onSubmit={handelSignIn}
            className="space-y-8 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Mobile number or email *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password *"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                />
              </div>
              <button className="mt-4 text-center text-sky-600">
                Forgot account?
              </button>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
            >
              Sign in
            </button>
          </form>

          <div className="my-6 space-y-4"></div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-400" />
            <p className="px-3 dark:text-gray-400">OR</p>
            <hr className="w-full dark:text-gray-400" />
          </div>
          <p className="text-sm text-center dark:text-gray-400">
            Create new account
            <button
              onClick={() => setData(!data)}
              className="focus:underline underline hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
