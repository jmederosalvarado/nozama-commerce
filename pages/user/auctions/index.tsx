import React, { useEffect, useState } from "react";
import { api } from "../../../fetch/clients";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Link from "next/link";
import PlusIconSM from "../../../components/icons/heroicons/small/plus";
import { AuctionPreview } from "../../../types/auctions";
import AuctionCard from "../../../components/auctions/auction-card";

export default function UserAuctions() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [reload, setReload] = useState<boolean>(false);

  const [auctions, setAuctions] = useState<AuctionPreview[]>();
  useEffect(() => {
    async function fetchAuctions() {
      try {
        const { data } = await api.get<AuctionPreview[]>("auctions", {
          params: {
            seller: user && user.username,
          },
        });
        setAuctions(data);
      } catch (error) {}
    }

    fetchAuctions();
  }, [user, reload]);

  return (
    <div className="container mx-auto">
      <div className="text-center text-gray-700 text-xl md:text-3xl pt-5 font-extrabold flex items-end justify-center">
        <span>Your Auctions</span>
        <Link href="/user/auctions/new">
          <a className="text-gray-500 hover:text-indigo-400 ml-2">
            <PlusIconSM className="w-10 h-10" />
          </a>
        </Link>
      </div>
      <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8 place-items-center">
        {auctions &&
          auctions.map((auction, i) => (
            <AuctionCard
              auction={auction}
              // editable
              // onDelete={async () => {
              //   try {
              //     await api.delete(`/auctions/${auction.id}`);
              //     setReload((r) => !r);
              //   } catch (error) {}
              // }}
              // key={i}
            />
          ))}
      </div>
    </div>
  );
}
