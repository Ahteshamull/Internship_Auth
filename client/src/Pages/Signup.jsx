import React from "react";
import { motion } from "framer-motion";
import Input from "../Components/Input";
import { Eye, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router";

export default function Signup() {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl  shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            icon={User}
            type="text"
            placeholder="Full Name"
            value={data.name}
          />
          <Input
            onChange={handleChange}
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={data.email}
          />
          <Input
            onChange={handleChange}
            icon={Lock}
            type="text"
            placeholder="Password"
            value={data.password}
          />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >Sign Up</motion.button>
        </form>
          </div>
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center ">
              <p className="text-sm text-gray-400">Already have an account? <Link to={"/login"} className="text-green-500 hover:underline">
              Login
              </Link></p>
          </div>
    </motion.div>
  );
}
