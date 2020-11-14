import { SellerPreview } from "../../types/sellers";
import StarIconSM from "../icons/heroicons/small/star";
import Link from "next/link";

export type SellerCardProps = {
  seller: SellerPreview;
};

export default function SellerCard({ seller }: SellerCardProps) {
  return (
    <div className="w-full max-w-xs">
      <div className="relative aspect-ratio-square rounded-full overflow-hidden shadow-lg">
        <img
          src={seller.image || "/img/user.jpg"}
          className="absolute object-cover object-center w-full h-full"
        />
      </div>

      <div className="px-10 -mt-16 relative">
        <div className="p-5 bg-white bg-opacity-50 backdrop-blur rounded-lg shadow-lg">
          <div className="text-gray-700 font-bold text-center truncate">
            {seller.username}
          </div>

          <div className="mt-1 flex items-center justify-center gap-5">
            <Link href="/sellers/[id]" as={`/sellers/${seller.username}`}>
              <a className="uppercase text-sm text-indigo-400 hover:text-indigo-500 font-extrabold tracking-wide">
                Visit
              </a>
            </Link>

            <div className="flex items-center justify-center">
              <span className="font-extrabold text-gray-600 text-sm">
                {seller.rating}
              </span>
              <StarIconSM className="text-yellow-600 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
