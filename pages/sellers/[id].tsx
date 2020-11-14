import OfferCard from "../../components/offers/offer-card";
import AuctionCard from "../../components/auctions/auction-card";
import StarIconSM from "../../components/icons/heroicons/small/star";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SellerDetails } from "../../types/sellers";
import { api } from "../../fetch/clients";
import { OfferPreview } from "../../types/offers";
import { AuctionPreview } from "../../types/auctions";

export default function SellerPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const [seller, setSeller] = useState<SellerDetails>();
  useEffect(() => {
    async function fetchSeller() {
      try {
        const { data } = await api.get<SellerDetails>(`sellers/${id}`);
        setSeller(data);
      } catch (error) {}
    }

    if (!id) return;
    fetchSeller();
  }, [id]);

  const [offers, setOffers] = useState<OfferPreview[]>();
  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data } = await api.get<OfferPreview[]>(`offers`, {
          params: {
            seller: id,
          },
        });
        setOffers(data);
      } catch (error) {}
    }

    if (!id) return;
    fetchOffers();
  }, [id]);

  const [auctions, setAuctions] = useState<AuctionPreview[]>();
  useEffect(() => {
    async function fetchAuctions() {
      try {
        const { data } = await api.get<AuctionPreview[]>(`auctions`, {
          params: {
            seller: id,
          },
        });
        setAuctions(data);
      } catch (error) {}
    }

    if (!id) return;
    fetchAuctions();
  }, [id]);

  const [selected, setSelected] = useState<"offers" | "auctions">("offers");

  if (!seller) {
    return <div></div>;
  }

  return (
    <div>
      <div className="w-full">
        <div className="relative overflow-hidden aspect-ratio-4/3 sm:aspect-ratio-none sm:h-64 shadow-lg rounded-b-lg">
          <img
            className="absolute w-full h-full object-cover object-center"
            src={seller.image || "/img/user.jpg"}
          />
          <div className="flex items-center justify-center py-2 bg-gray-100 bg-opacity-75 backdrop-blur absolute z-10 bottom-0 inset-x-0">
            <div className="font-bold text-gray-600">{seller.name}</div>
            <div className="flex items-center justify-center border-l-2 border-gray-500 ml-5 pl-5">
              <span className="font-extrabold text-gray-600 text-sm">
                {seller.rating}
              </span>
              <StarIconSM className="text-yellow-600 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex items-center justify-center mt-5">
          <button
            onClick={() => {
              setSelected("offers");
            }}
            className={`text-center text-xl md:text-2xl font-bold focus:outline-none pl-5 pr-2 border-r-2 border-b-2 ${
              selected === "offers"
                ? "text-gray-600 border-gray-500"
                : "text-gray-500 hover:text-indigo-400 border-gray-300 hover:border-indigo-300"
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => {
              setSelected("auctions");
            }}
            className={`text-center text-xl md:text-2xl font-bold focus:outline-none pl-2 pr-5 border-l-2 border-b-2 ${
              selected === "auctions"
                ? "text-gray-600 border-gray-500"
                : "text-gray-500 hover:text-indigo-400 border-gray-300 hover:border-indigo-300"
            }`}
          >
            Auctions
          </button>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-8 place-items-center">
          {selected === "offers" &&
            offers &&
            offers.map((offer, i) => <OfferCard offer={offer} key={i} />)}
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-8 place-items-center">
          {selected === "auctions" &&
            auctions &&
            auctions.map((auction, i) => (
              <AuctionCard auction={auction} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}
