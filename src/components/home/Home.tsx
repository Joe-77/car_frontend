import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Home() {
  const { setType }: any = useContext(Context);

  return (
    <section>
      <div className="container mx-auto px-4 md:px-0 lg:w-[85%] mt-8 flex flex-col-reverse lg:flex-row gap-7 sm:items-center justify-between pb-7">
        <div className="max-w-[723px] w-full">
          <h3 className="text-xl sm:text-2xl lg:text-4xl  font-bold">
            Get an instant estimate of your car price using artificial
            intelligence
          </h3>
          <p className="my-5 text-lg mx-5">
            Our AI-driven system analyzes thousands of data points to give you
            the most precise estimate for your vehicle in just seconds.
          </p>

          <div className="flex justify-center mt-7">
            <button
              onClick={() => setType("login")}
              className="bg-[#44B564] rounded-xl text-white"
            >
              <Link to="/prediction" className="w-full block px-10 py-2">
                Start
              </Link>
            </button>
          </div>
        </div>
        <div>
          <img
            loading="lazy"
            src="/bg.jpg"
            alt="background"
            className="max-w-[500px] w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
