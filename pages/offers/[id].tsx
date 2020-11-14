import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CurrencyDollarIconSM from "../../components/icons/heroicons/small/currency-dollar";
import ShoppingCartIconSM from "../../components/icons/heroicons/small/shopping-cart";
import StarIconSM from "../../components/icons/heroicons/small/star";
import { OfferDetails } from "../../types/offers";
import { mockapi } from "../../fetch/clients";

export default function OfferPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const [offer, setOffer] = useState<OfferDetails>();

  useEffect(() => {
    async function fetchOffer() {
      try {
        const { data } = await mockapi.get<OfferDetails>(`offers/${id}`);
        setOffer(data);
      } catch (error) {}
    }

    fetchOffer();
  }, [id]);

  if (!offer) {
    return <div></div>;
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <img
        className="w-full mx-auto rounded-b-lg shadow-lg object-cover object-center"
        src={offer.image || "/img/offer.jpg"}
      />
      <div className="p-10 flex flex-col md:flex-row item-center md:items-start md:justify-right">
        <div className="md:border-r-2 md:border-gray-400 md:w-2/3 md:pr-10 md:pb-5">
          <div className="text-gray-700 font-bold truncate text-center md:text-left text-xl">
            {offer.name}
          </div>

          <p className="mt-3 text-center md:text-left">{offer.description}</p>
        </div>

        <div className="mt-5 md:mt-0 md:ml-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <CurrencyDollarIconSM className="text-green-700 w-5 h-5" />
              <span className="font-extrabold text-gray-600 ml-px">
                {offer.price}
              </span>
            </div>

            <div className="border border-gray-600 bg-gray-600 h-4 mx-2"></div>

            <div className="flex items-center justify-center">
              <span className="font-extrabold text-gray-600">
                {offer.rating}
              </span>
              <StarIconSM className="text-yellow-600 w-5 h-5 ml-px" />
            </div>
          </div>
          <div className="mt-2 md:mt-3 w-full flex items-center justify-center">
            <button className="text-white bg-indigo-400 hover:bg-indigo-500 inline-flex items-center justify-center px-3 py-1 rounded-full">
              <span className="text-sm uppercase font-extrabold tracking-wide">
                Add to Cart
              </span>
              <ShoppingCartIconSM className="ml-1 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
