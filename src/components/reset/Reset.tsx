import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function Reset({ setShowLoginPage }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const { setType }: any = useContext(Context);

  const handleLogin = (data: any) => {
    // TODO: Implement login logic
    console.log(data);
    reset();
  };

  return (
    <div>
      <div className="p-8">
        <h2 className="text-xl font-semibold uppercase">Reset Password</h2>
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

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-black text-white font-bold rounded-xl"
          >
            Reset
          </button>

          <button
            onClick={() => setType("login")}
            type="button"
            className="mt-5 text-center text-sm  block w-full text-teal-700"
          >
            Login now
          </button>
        </form>
      </div>

      <div className="w-full h-[80vh] bg-gray-200 p-8 flex flex-col gap-3 items-center">
        <h5 className="text-sm">Don't have an account?</h5>
        <button
          onClick={() => setShowLoginPage(false)}
          type="button"
          className="bg-teal-600 text-white rounded-xl duration-300 hover:bg-teal-800"
        >
          <Link to="/sign-up" className="px-6 py-2 block">
            Join Now
          </Link>
        </button>
      </div>
    </div>
  );
}
