import { useForm } from "react-hook-form";
import {
  carBrands,
  colors,
  fuelTypes,
  Gear_Type,
  Options,
  Origin,
  vehicleModels,
} from "../../data/data";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Prediction() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const [rate, setRate]: any = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clean, setClean]: any = useState("-");
  const [average, setAverage]: any = useState("-");

  const handleAddFeedback = (msg: any) => {
    setLoading(true);
    const data = {
      message: msg.message,
      userId: "12356678",
    };

    axios
      .post("https://car-backend-dusky.vercel.app/add-feedback", data)
      .then(() => {
        toast.success("feedback added successfully");
        setLoading(false);
        reset();
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handlePrediction = (data: any) => {
    setLoading(true);

    const customData = {
      Make: data.brand,
      Type: data.type,
      Year: data.year,
      Origin: data.origin,
      Color: data.colors,
      Fuel_Type: data.fuel_type,
      Options: data.option,
      Gear_Type: data.gear,
      Mileage: data.mileage,
    };

    axios
      .post("{url}/predict", customData)
      .then((res) => {
        console.log(res);
        toast.success("Price prediction successful");
        setRate(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setRate(false);
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <section>
      <div className="min-h-[95vh] w-full bg-[url('/pre.webp')] bg-cover bg-center bg-no-repeat relative flex items-center pb-10">
        <div className="overlay absolute top-0 left-0 h-full w-full bg-black/60"></div>
        <div
          className={`container mx-auto px-4 ${
            rate ? "w-96" : "lg:w-1/2"
          } rounded-lg bg-white shadow-md py-5 z-20`}
        >
          <h3 className="text-lg font-bold text-center">
            {rate ? "Feedback" : "Know the price of any vehicle in just second"}
          </h3>
          {rate ? (
            <form onSubmit={handleSubmit(handleAddFeedback)} className="mt-8">
              <input
                {...register("message", { required: true })}
                type="text"
                className={`outline-none p-2 border-2 w-full rounded-md ${
                  errors.message && "border-red-600"
                }`}
              />
              <button
                disabled={loading}
                className="mt-4 w-full bg-blue-600 py-2 rounded-md text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Add
              </button>
              <button
                disabled={loading}
                type="button"
                onClick={() => setRate(false)}
                className="mt-4 w-full bg-gray-600 py-2 rounded-md text-white disabled:cursor-not-allowed"
              >
                back
              </button>
            </form>
          ) : (
            <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 mt-8">
              <form
                id="prediction"
                className="lg:w-3/4 grid grid-cols-1 xs:grid-cols-2 gap-4 max-h-[450px] h-full overflow-auto pb-5"
                onSubmit={handleSubmit(handlePrediction)}
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="make"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enter the manufacturer{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("brand", { required: true })}
                    id="make"
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  >
                    <option value="">Select a manufacturer</option>
                    {carBrands.map((e, index) => (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium text-gray-700"
                  >
                    Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("type", { required: true })}
                    id="type"
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  >
                    <option value="">Select a type</option>
                    {vehicleModels.map((e, index) => (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="colors"
                    className="text-sm font-medium text-gray-700"
                  >
                    Colors <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("colors", { required: true })}
                    id="colors"
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  >
                    <option value="">Select a type</option>
                    {colors.map((e, index) => (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errors.colors && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="gear"
                    className="text-sm font-medium text-gray-700"
                  >
                    Gear Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("gear", { required: true })}
                    id="gear"
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  >
                    <option value="">Select a type</option>
                    {Gear_Type.map((e, index) => (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errors.gear && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="year"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enter the year <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("year", { required: true, min: 0 })}
                    type="number"
                    id="year"
                    min={0}
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  />
                  {errors.year && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="option"
                    className="text-sm font-medium text-gray-700"
                  >
                    Option <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("option", { required: true })}
                    id="option"
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  >
                    <option value="">Select a type</option>
                    {Options.map((e, index) => (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errors.option && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="origin"
                    className="text-sm font-medium text-gray-700"
                  >
                    Origin <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("origin", { required: true })}
                    id="origin"
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  >
                    <option value="">Select a type</option>
                    {Origin.map((e, index) => (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errors.origin && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fuel_type"
                    className="text-sm font-medium text-gray-700"
                  >
                    Fuel Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("fuel_type", { required: true })}
                    id="fuel_type"
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  >
                    <option value="">Select a type</option>
                    {fuelTypes.map((e, index) => (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errors.fuel_type && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="mileage"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mileage <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("mileage", { required: true, min: 0 })}
                    type="number"
                    id="mileage"
                    min={0}
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm text-gray-700"
                  />
                  {errors.mileage && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="col-span-2 flex items-center gap-10">
                  <button
                    type="submit"
                    className="bg-blue-600 px-6 py-2 rounded-md text-white"
                  >
                    Get Estimate
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setRate(true)}
                    className="bg-green-600 px-6 py-2 rounded-md text-white disabled:cursor-not-allowed"
                  >
                    Rating
                  </button>
                </div>
              </form>
              <div className="bg-gray-100 shadow-md py-5 lg:w-1/4 h-fit pb-10">
                <div>
                  <h5 className="px-2 border-b border-b-[#ddd] pb-2 text-xs">
                    Price
                  </h5>
                  <div className="px-2 mt-2 flex items-center justify-between ">
                    <p className="text-xs">Total </p>
                    <p>{clean}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
