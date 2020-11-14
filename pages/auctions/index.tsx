import { useEffect, useState } from "react";
import AuctionCard from "../../components/auctions/auction-card";
import { AuctionPreview } from "../../types/auctions";
import { api } from "../../fetch/clients";

export default function Auctions() {
  const [auctions, setAuctions] = useState<AuctionPreview[]>();

  useEffect(() => {
    async function fetchAuctions() {
      try {
        const { data } = await api.get<AuctionPreview[]>("auctions");
        setAuctions(data);
      } catch (error) {}
    }

    fetchAuctions();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-gray-700 text-xl md:text-3xl pt-5 font-extrabold">
        Current auctions
      </div>
      <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8 place-items-center">
        {auctions &&
          auctions.map((auction, i) => (
            <AuctionCard auction={auction} key={i} />
          ))}
      </div>
    </div>
  );
}
