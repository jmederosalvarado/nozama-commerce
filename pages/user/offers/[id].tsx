import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../../fetch/clients";
import { OfferDetails } from "../../../types/offers";

export default function OfferDetailsPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const [offer, setOffer] = useState<OfferDetails>();

  useEffect(() => {
    async function fetchOffer() {
      try {
        const { data } = await api.get<OfferDetails>(`offers/${id}`);
        setOffer(data);
      } catch (error) {}
    }

    if (!id) return;
    fetchOffer();
  }, [id]);

  if (!offer) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      <div className="rounded-b-lg shadow-lg overflow-hidden">
        <img
          className="w-full h-64 object-cover object-center"
          src={offer.image || "/img/offer.jpg"}
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
                setOffer((offer) => ({
                  ...offer,
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
              value={offer.name}
              onChange={(e) => {
                e.preventDefault();
                const name = e.target.value;
                setOffer((offer) => ({
                  ...offer,
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
                setOffer((offer) => ({
                  ...offer,
                  description: description,
                }));
              }}
              value={offer.description}
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
              value={offer.price === -1 ? "" : offer.price}
              onChange={(e) => {
                e.preventDefault();
                const price = e.target.value;
                setOffer((offer) => ({
                  ...offer,
                  price: price ? Number.parseFloat(price) : -1,
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
                const { data } = await api.put<OfferDetails>(
                  `/offers/${offer.id}`,
                  offer
                );
                setOffer(data);
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
