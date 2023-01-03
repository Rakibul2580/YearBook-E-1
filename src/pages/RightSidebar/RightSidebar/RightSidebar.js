import React, { useEffect, useState } from "react";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

const RightSidebar = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://yourbookserver-rakibul2580.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(users);
  return (
    <div className="justify-center items-center bg-gray-100">
      <div>
        <h1 className="text-2xl font-semibold px-2 text-center py-5">
          People you may know
        </h1>
      </div>
      <div className="overflow-auto h-96 mb-16">
        {users.map((user) => (
          <div key={user._id} className="my-3 bg-white py-2 rounded-md">
            <div className="flex mx-[5%] justify-start items-start ">
              <img
                src={user.img}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-2">
                <h1>{user.fastName + " " + user.lastName}</h1>
                <p>{user.gender}</p>
              </div>
            </div>
            <div className="flex mt-3 justify-around items-center">
              <button className="bg-gray-300 w-[40%] flex justify-center items-center text-xl p-1 rounded-md">
                <FaUserTimes />
              </button>
              <button className="bg-green-500 w-[40%] flex justify-center items-center text-xl p-1 rounded-md">
                <FaUserCheck />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <h1 className="h-screen">Coming soon</h1>
      </div>
    </div>
  );
};

export default RightSidebar;
