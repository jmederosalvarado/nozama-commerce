import { useSelector } from "react-redux";
import CartOffer from "../../components/offers/cart-offer";
import { RootState } from "../../store";

export default function CartPage() {
  const { offers } = useSelector((state: RootState) => state.cart);

  return (
    <div className="container mx-auto">
      <div className="text-center text-gray-700 text-xl md:text-3xl pt-5 font-extrabold">
        Offers in cart
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center mt-2">
        <input
          className="min-w-0 border rounded-lg px-2 py-1 text-center text-sm font-bold uppercase"
          placeholder="Bank Account"
        />
        <button className="uppercase text-sm text-white font-bold bg-indigo-400 hover:bg-indigo-500 focus:outline-none rounded-lg px-2 py-1 mt-2 md:mt-0 md:ml-3">
          Checkout
        </button>
      </div>
      <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8 place-items-center">
        {offers && offers.map((offer, i) => <CartOffer id={offer} key={i} />)}
      </div>
    </div>
  );
}
