import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEyeOff } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "sonner";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const { setType }: any = useContext(Context);

  const [showPass, setShowPass] = useState<boolean>(false);

  const handleLogin = (data: any) => {
    const customData = {
      username: data.name,
      email: data.email,
      password: data.password,
    };

    axios
      .post("{url}/register_user", customData)
      .then(() => {
        toast.success(`Successfully registered`);
        reset();
      })
      .catch((err) => {
        toast.error(`Failed to register: ${err.message}`);
        console.log(err);
      });
  };

  return (
    <div className="min-h-[90vh] bg-gray-200 py-20">
      <div className="container mx-auto px-4  lg:w-3/5 bg-white shadow-md flex flex-col md:flex-row gap-10 py-5 rounded-xl">
        <div className="md:w-1/2">
          <img
            src="/register.webp"
            alt="logo"
            className="w-full h-[400px] rounded-lg"
          />
        </div>

        <div className="md:w-1/2">
          <div>
            <h2 className="text-xl font-semibold">Create New Account</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <input
                {...register("name", {
                  required: true,
                })}
                type="text"
                placeholder="username"
                className={`w-full p-3 mt-4 border-2 border-gray-400 outline-none rounded-lg ${
                  errors.name && "border-red-600"
                }`}
              />

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
                Register
              </button>
            </form>
          </div>

          <div className="w-full p-8 flex flex-col gap-3 items-center">
            <h5 className="text-sm">Have an account?</h5>
            <button
              onClick={() => setType("login")}
              type="button"
              className="bg-teal-600 px-6 py-2 text-white rounded-xl duration-300 hover:bg-teal-800"
            >
              Login Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
