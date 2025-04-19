import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, } from "lucide-react";
import { Link } from "react-router";
import Input from "../Components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;
  const handleLogin = (e) => {
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
         Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
          />
          <div className="flex items-center mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
         
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" w-6 h-6 mx-auto animate-spin" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
       <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center ">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-green-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
    </motion.div>
  );
}
