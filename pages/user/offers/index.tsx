import { useEffect, useState } from "react";
import OfferCard from "../../../components/offers/offer-card";
import { OfferPreview } from "../../../types/offers";
import { mockapi } from "../../../fetch/clients";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Link from "next/link";
import PlusIconSM from "../../../components/icons/heroicons/small/plus";

export default function UserOffers() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [offers, setOffers] = useState<OfferPreview[]>();
  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data } = await mockapi.get<OfferPreview[]>("offers", {
          params: {
            seller: user && user.username,
          },
        });
        setOffers(data);
      } catch (error) {}
    }

    fetchOffers();
  }, [user]);

  return (
    <div className="container mx-auto">
      <div className="text-center text-gray-700 text-xl md:text-3xl pt-5 font-extrabold flex items-end justify-center">
        <span>Your Offers</span>
        <Link href="/user/offers/new">
          <a className="text-gray-500 hover:text-indigo-400 ml-2">
            <PlusIconSM className="w-10 h-10" />
          </a>
        </Link>
      </div>
      <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8 place-items-center">
        {offers &&
          offers.map((offer, i) => (
            <OfferCard offer={offer} editable key={i} />
          ))}
      </div>
    </div>
  );
}
