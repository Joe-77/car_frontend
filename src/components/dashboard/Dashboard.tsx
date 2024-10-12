import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  const [data, setData] = useState([[]]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: any) => {
    setLoading(true);
    axios
      .delete(`https://car-backend-dusky.vercel.app/feedback/${id}`)
      .then(() => {
        setData((prevData: any) =>
          prevData.filter((item: any) => item._id !== id)
        );
        currentItems.filter((item: any) => item._id !== id);
        toast.success("Feedback deleted successfully");
        setLoading(false);
      })
      .catch(() => {
        console.error("Failed to delete item");
        toast.error("Failed to delete feedback");
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("https://car-backend-dusky.vercel.app/feedback")
      .then((res: any) => {
        setData(res.data);
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  return (
    <section>
      <div className="container mx-auto px-4 md:px-0 lg:w-[85%] mt-14 pb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Feedbacks</h3>
        </div>
        <div className="mt-8">
          <div className=" mb-5 flex justify-end">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-teal-600 text-white rounded-lg mx-1 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Prev
            </button>
            <span className="px-4 py-2">
              {currentPage} from {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-teal-600 text-white rounded-lg mx-1 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
          <div className="overflow-auto">
            <table className="border border-gray-300 min-h-20 w-full min-w-[600px] ">
              <thead>
                <tr>
                  <th className="p-4 border-l w-[55px]">#</th>
                  <th className="p-4 border-l w-[400px]">User ID</th>
                  <th className="p-4 border-l w-[800px]">Feedback</th>
                  <th className="p-4 border-l"></th>
                </tr>
              </thead>
              <tbody className="border-t">
                {currentItems.map((data: any, index) => (
                  <tr key={data.id} className="border-t">
                    <td className="border-l text-center p-5">{index + 1}</td>
                    <td className="border-l text-center p-5">{data?.userId}</td>
                    <td className="border-l text-center p-5 border-r">
                      {data?.msg}
                    </td>

                    <td className="px-10">
                      <div className="flex items-center justify-center gap-5">
                        <button
                          onClick={() => handleDelete(data._id)}
                          disabled={loading ? true : false}
                          className=" disabled:bg-gray-500 disabled:cursor-not-allowed bg-red-500 px-4 py-2 rounded-lg duration-500 hover:scale-110 text-xl text-white"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
