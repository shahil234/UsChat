import React, { useState } from "react";

import registerSchema from "../schema/registerSchema";

import { EyeOff, Eye } from "lucide-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import usePost from "../hooks/usePost";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

const Register = () => {
  const [passVisibility, setPassVisibility] = useState(false);

  const navigate = useNavigate();

  const {postData: registerUser, loading} = usePost();


  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    const registerResponse = await registerUser("auth/signup", {
      ...data
    });

    console.log(registerResponse, "response")
    if(registerResponse?.success){
      toast.success(registerResponse?.message);
      navigate("/login")
    } else{
      toast.error(registerResponse?.message)
    }
  };
  return (
    <div className="h-screen w-full flex items-center bg-[#8848b7] justify-center">
      <form
        className="bg-[#F2F9FF] px-6 py-4 rounded-lg space-y-4 shadow-sm w-full sm:w-10/12 md:w-3/5 xl:w-3/12"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="text-center text-2xl font-medium">Register</div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            className="ring-0"
            id="email"
            type="email"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input {...register("username")} id="username" type="text" />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="flex justify-between items-center">
            <Input
              {...register("password")}
              id="password"
              className="border-none focus:outline-none"
              type={passVisibility ? "text" : "password"}
            />
            <div
              onClick={() => setPassVisibility(!passVisibility)}
              className="cursor-pointer"
            >
              {passVisibility ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
          </div>
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" className="mx-auto block">
          Register
        </Button>
        <span className="block text-center">Already have an account? <Link className="underline" to={"/login"}>Login</Link></span>
      </form>
    </div>
  );
};

export default Register;
