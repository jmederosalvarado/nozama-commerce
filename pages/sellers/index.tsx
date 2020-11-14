import { useEffect, useState } from "react";
import SellerCard from "../../components/sellers/seller-card";
import { SellerPreview } from "../../types/sellers";
import { api } from "../../fetch/clients";

export default function Sellers() {
  const [sellers, setSellers] = useState<SellerPreview[]>();

  useEffect(() => {
    async function fetchSellers() {
      try {
        const { data } = await api.get<SellerPreview[]>("sellers");
        setSellers(data);
      } catch (error) {}
    }

    fetchSellers();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-gray-700 text-xl md:text-3xl pt-5 font-extrabold">
        Our sellers
      </div>
      <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-8 gap-8 place-items-center">
        {sellers &&
          sellers.map((seller, i) => <SellerCard seller={seller} key={i} />)}
      </div>
    </div>
  );
}
