import React, { useState } from "react";

import loginSchema from "../schema/loginSchema";

import { EyeOff, Eye } from "lucide-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import usePost from "../hooks/usePost";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import Wrapper from "../ui/common/Wrapper";
import { useAuth } from "../store/useAuth";

const Login = () => {
  const [passVisibility, setPassVisibility] = useState(false);

  const navigate = useNavigate();

  const {
    logInUser
  } = useAuth();

  const {postData: loginUser, loading} = usePost();


  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    const loginResponse = await loginUser("auth/login", {
      ...data
    });

    if(loginResponse?.success){
      toast.success(loginResponse?.message);
      console.log(loginResponse)
      logInUser(loginResponse?.data)
      navigate("/");
    } else{
      toast.error(loginResponse?.message)
    }
  };
  return (
    <Wrapper className="h-screen w-full flex items-center bg-[#8848b7] justify-center">
      <form
        className="bg-[#F2F9FF] px-6 py-4 rounded-lg space-y-4 shadow-sm w-full sm:w-10/12 md:w-3/5 lg:w-2/5 xl:w-3/12 max-w-[600px]"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="text-center text-2xl font-medium">Login</div>
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
        <Button disabled={loading} type="submit" className="mx-auto block">
          Register
        </Button>
        <span className="block text-center">Don't have an account? <Link className="underline" to={"/register"}>Register</Link></span>
      </form>
    </Wrapper>
  );
};

export default Login;
