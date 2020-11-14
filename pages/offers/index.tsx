import { useEffect, useState } from "react";
import OfferCard from "../../components/offers/offer-card";
import { OfferPreview } from "../../types/offers";
import { mockapi } from "../../fetch/clients";

export default function Offers() {
  const [offers, setOffers] = useState<OfferPreview[]>();

  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data } = await mockapi.get<OfferPreview[]>("offers");
        setOffers(data);
      } catch (error) {}
    }

    fetchOffers();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-gray-700 text-xl md:text-3xl pt-5 font-extrabold">
        Current offers
      </div>
      <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8 place-items-center">
        {offers &&
          offers.map((offer, i) => <OfferCard offer={offer} key={i} />)}
      </div>
    </div>
  );
}
