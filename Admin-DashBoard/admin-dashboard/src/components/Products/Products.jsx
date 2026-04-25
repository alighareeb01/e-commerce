import React, { useEffect, useState } from "react";
import Productrendering from "../Productrendering/Productrendering";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  async function getData() {
    try {
      const res = await fetch(
        "https://e-commerce-backend-three-khaki.vercel.app/api/v1/products",
        {
          method: "GET",
        },
      );
      const data = await res.json();

      setProducts(data.products);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className=" flex justify-between text-white mb-5">
        <div className="grid grid-cols-2 gap-5 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg p-5 rounded-2xl  ">
          <span className="cursor-pointer hover:text-violet-600 transition delay-50 duration-300 ease-in-out">
            add product
            <FontAwesomeIcon icon={faSquarePlus} />
          </span>
          <span className="cursor-pointer hover:text-violet-600 transition delay-50 duration-300 ease-in-out">
            delete product <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
        <div className=" bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg p-5 rounded-2xl">
          number of products
          <p className=" flex justify-center">{products.length}</p>
        </div>
      </div>
      {isError ? (
        // <p className="text-white flex justify-center">somethoing went wrong </p>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-white">
          <p className="text-xl font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-300 text-sm mb-4">
            We couldn’t load the products. Please try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 transition rounded-lg"
          >
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {products.map((el) => {
            return <Productrendering products={el} key={el._id} />;
          })}
        </div>
      )}
    </div>
  );
}
