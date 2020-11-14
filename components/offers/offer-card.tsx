import StarIconSM from "../icons/heroicons/small/star";
import Link from "next/link";
import { OfferPreview } from "../../types/offers";
import CurrencyDollarIconSM from "../icons/heroicons/small/currency-dollar";
import PencilIconSM from "../icons/heroicons/small/pencil";
import TrashIconSM from "../icons/heroicons/small/trash";

export type OfferCardProps = {
  offer: OfferPreview;
  editable?: boolean;
  onDelete?: () => void;
};

export default function OfferCard({
  offer,
  onDelete,
  editable = false,
}: OfferCardProps) {
  return (
    <div className="w-full max-w-xs">
      <div className="relative aspect-ratio-5/4 rounded-lg overflow-hidden shadow-lg">
        <img
          src={offer.image || "/img/offer.jpg"}
          className="absolute object-cover object-center w-full h-full"
        />
      </div>

      <div className="px-8 -mt-16 relative">
        <div className="p-5 bg-white bg-opacity-75 backdrop-blur rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <CurrencyDollarIconSM className="text-green-700 w-4 h-4" />
              <span className="font-extrabold text-sm text-gray-600 ml-px">
                {offer.price}
              </span>
            </div>

            <div className="border border-gray-600 bg-gray-600 h-4 mx-2"></div>

            <div className="flex items-center justify-center">
              <span className="font-extrabold text-sm text-gray-600">
                {offer.rating}
              </span>
              <StarIconSM className="text-yellow-600 w-4 h-4 ml-px" />
            </div>

            {editable && (
              <>
                <div className="border border-gray-600 bg-gray-600 h-4 mx-2"></div>
                <Link href="/user/offers/[id]" as={`/user/offers/${offer.id}`}>
                  <a className="text-gray-600 hover:text-indigo-600">
                    <PencilIconSM className="w-4 h-4" />
                  </a>
                </Link>
                <button
                  className="text-gray-600 hover:text-indigo-600 focus:outline-none ml-1"
                  onClick={onDelete}
                >
                  <TrashIconSM className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <div className="mt-2 text-gray-700 font-bold truncate text-center">
            {offer.name}
          </div>

          <div className="mt-2 w-full flex items-center justify-center">
            <Link href="/offers/[id]" as={`/offers/${offer.id}`}>
              <a className="uppercase text-xs text-indigo-400 hover:text-indigo-500 font-extrabold tracking-wide">
                View details
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
