import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../fetch/clients";
import { RootState } from "../../../store";
import { AuctionDetails, AuctionNew } from "../../../types/auctions";

export default function AuctionNewPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [auction, setAuction] = useState<AuctionNew>({
    name: "",
    description: "",
    price: -1,
    seller: user && user.username,
    duration: -1,
  });

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      <div className="rounded-b-lg shadow-lg overflow-hidden">
        <img
          className="w-full h-64 object-cover object-center"
          src={auction.image || "/img/auction.jpg"}
        />
        <label className="w-full focus:outline-none text-center block uppercase font-bold text-xs p-1 text-gray-600 hover:bg-indigo-100">
          Choose File
          <input
            type="file"
            className="hidden w-full h-full"
            onChange={(e) => {
              e.preventDefault();
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = () => {
                const src = reader.result as string;
                setAuction((auction) => ({
                  ...auction,
                  image: src,
                }));
              };
              if (file) {
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
      </div>
      <div className="flex flex-col items-end mt-2">
        <div className="mt-2">
          <label className="text-gray-600 font-bold">
            Name:
            <input
              className="ml-2 bg-transparent border-b-2 focus:outline-none text-gray-700 align-bottom w-56"
              value={auction.name}
              onChange={(e) => {
                e.preventDefault();
                const name = e.target.value;
                setAuction((auction) => ({
                  ...auction,
                  name: name,
                }));
              }}
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="text-gray-600 font-bold">
            Description:
            <textarea
              rows={3}
              onChange={(e) => {
                e.preventDefault();
                const description = e.target.value;
                setAuction((auction) => ({
                  ...auction,
                  description: description,
                }));
              }}
              value={auction.description}
              className="ml-2 bg-transparent border-b-2 border-r-2 focus:outline-none text-gray-700 align-top w-56"
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="text-gray-600 font-bold">
            Price:
            <input
              className="ml-2 bg-transparent border-b-2 focus:outline-none text-gray-700 align-bottom w-56"
              type="number"
              value={auction.price === -1 ? "" : auction.price}
              onChange={(e) => {
                e.preventDefault();
                const price = e.target.value;
                setAuction((auction) => ({
                  ...auction,
                  price: price ? Number.parseFloat(price) : -1,
                }));
              }}
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="text-gray-600 font-bold">
            Auction duration in hours:
            <input
              className="ml-2 bg-transparent border-b-2 focus:outline-none text-gray-700 align-bottom w-56"
              type="number"
              value={auction.duration === -1 ? "" : auction.duration}
              onChange={(e) => {
                e.preventDefault();
                const duration = e.target.value;
                setAuction((auction) => ({
                  ...auction,
                  duration: duration ? Number.parseInt(duration) : -1,
                }));
              }}
            />
          </label>
        </div>
        <div className="mt-5">
          <button
            className="bg-indigo-400 hover:bg-indigo-500 focus:outline-none px-3 rounded-full py-1 text-white font-bold uppercase tracking-wide text-sm"
            onClick={async () => {
              try {
                const { data } = await api.post<AuctionDetails>(
                  `/auctions`,
                  auction
                );
                router.push("/user/auctions/[id]", `/user/auctions/${data.id}`);
              } catch (error) {}
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
