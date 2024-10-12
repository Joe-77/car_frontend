import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEyeOff } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function Login({ setShowLoginPage }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const { setType, handleAuthSuccess, setRole }: any = useContext(Context);

  const [showPass, setShowPass] = useState<boolean>(false);

  const route = useNavigate();

  const handleLogin = (data: any) => {
    // TODO: Implement login logic
    console.log(data);

    axios
      .post("{url}/login_user", data)
      .then((response) => {
        console.log(response);
        handleAuthSuccess();
        localStorage.setItem("role", "");
        // setRole(); // Add role
        reset();
        route("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        // Handle error
      });
  };

  return (
    <div>
      <div className="p-8">
        <h2 className="text-xl font-semibold uppercase">sign in</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.com+$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Email"
            className={`w-full p-3 mt-4 border-2 border-gray-400 outline-none rounded-lg ${
              errors.email && "border-red-600"
            }`}
          />
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className={`w-full p-3 mt-4 border-2 border-gray-400 outline-none rounded-lg ${
                errors.password && "border-red-600"
              }`}
            />
            <span
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute top-1/2 -translate-y-[27%] right-2 text-2xl cursor-pointer"
            >
              {showPass ? <IoMdEyeOff /> : <MdRemoveRedEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-black text-white font-bold rounded-xl"
          >
            Sign In
          </button>

          <button
            onClick={() => setType("reset")}
            type="button"
            className="mt-5 text-center text-sm"
          >
            forget your{" "}
            <span className="underline underline-offset-2">username</span> or{" "}
            <span className="underline underline-offset-2">password</span>
          </button>
        </form>
      </div>

      <div className="w-full h-[80vh] bg-gray-200 p-8 flex flex-col gap-3 items-center">
        <h5 className="text-sm">Don't have an account?</h5>
        <button
          type="button"
          onClick={() => setShowLoginPage(false)}
          className="bg-teal-600  text-white rounded-xl duration-300 hover:bg-teal-800"
        >
          <Link to="/sign-up" className="px-6 py-2 block">
            Join Now
          </Link>
        </button>
      </div>
    </div>
  );
}
