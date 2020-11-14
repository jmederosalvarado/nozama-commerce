import { useRouter } from "next/router";
import CurrencyDollarIconSM from "../../components/icons/heroicons/small/currency-dollar";
import ShoppingCartIconSM from "../../components/icons/heroicons/small/shopping-cart";
import UserGroupIconSM from "../../components/icons/heroicons/small/user-group";
import Countdown from "react-countdown";
import ClockIconSM from "../../components/icons/heroicons/small/clock";
import CheckIconSM from "../../components/icons/heroicons/small/check";
import { useEffect, useState } from "react";
import { AuctionDetails } from "../../types/auctions";
import { api } from "../../fetch/clients";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function AuctionPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const [auction, setAuction] = useState<AuctionDetails>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [bid, setBid] = useState(-1);

  useEffect(() => {
    async function fetchAuction() {
      try {
        const { data } = await api.get<AuctionDetails>(`auctions/${id}`);
        setAuction(data);
      } catch (error) {}
    }

    if (!id) return;
    fetchAuction();
  }, [id, user]);

  if (!auction) {
    return <div></div>;
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <img
        className="w-full mx-auto rounded-b-lg shadow-lg object-cover object-center"
        src={auction.image || "/img/auction.jpg"}
      />
      <div className="p-10 flex flex-col md:flex-row item-center md:items-start md:justify-right">
        <div className="md:border-r-2 md:border-gray-400 md:w-2/3 md:pr-10 md:pb-10">
          <div className="text-gray-700 font-bold truncate text-center md:text-left text-xl">
            {auction.name}
          </div>

          <p className="mt-3 text-center md:text-left">{auction.description}</p>
        </div>

        <div className="mt-5 md:mt-0 md:ml-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <CurrencyDollarIconSM className="text-green-700 w-5 h-5" />
              <span className="font-extrabold text-gray-600 ml-px">
                {auction.price}
              </span>
            </div>

            <div className="border border-gray-600 bg-gray-600 h-4 mx-2"></div>

            <div className="flex items-center justify-center">
              <span className="font-extrabold text-gray-600">
                {auction.bids}
              </span>
              <UserGroupIconSM className="text-indigo-600 w-5 h-5 ml-px" />
            </div>
          </div>
          <Countdown
            date={auction.closing}
            renderer={({
              completed,
              formatted: { hours, minutes, seconds },
            }) => (
              <>
                <div className="mt-2 flex items-center justify-center text-gray-600">
                  <ClockIconSM className="w-5 h-5" />
                  <span className="ml-1 text-sm font-bold">
                    {completed ? "closed" : `${hours}:${minutes}:${seconds}`}
                  </span>
                </div>
                <div className="mt-2 md:mt-3 w-full flex items-center justify-center">
                  {user && !completed && (
                    <div className="rounded-full overflow-hidden shadow-xl flex items-center justify-center relative pl-6 w-32">
                      <button
                        className="bg-indigo-400 hover:bg-indigo-500 flex items-center justify-center absolute left-0 inset-y-0 pl-1 pr-px"
                        onClick={async () => {
                          try {
                            const { data } = await api.post<AuctionDetails>(
                              `bid/${auction.id}`,
                              {
                                bidder: user.username,
                                price: bid,
                              }
                            );
                            setAuction(data);
                          } catch (error) {}
                        }}
                      >
                        <CheckIconSM className="w-5 h-5 text-white" />
                      </button>
                      <input
                        type="number"
                        value={bid === -1 ? "" : bid}
                        onChange={(e) => {
                          e.preventDefault();
                          const bid = e.target.value;
                          setBid(bid ? Number.parseFloat(bid) : -1);
                        }}
                        className="min-w-0 focus:outline-none bg-white text-center shadow-inner text-gray-600 font-bold"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
