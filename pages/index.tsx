import Link from "next/link";
import { useEffect, useState } from "react";
import { OfferPreview } from "../types/offers";
import { mockapi } from "../fetch/clients";
import OfferCard from "../components/offers/offer-card";
import SellerCard from "../components/sellers/seller-card";
import AuctionCard from "../components/auctions/auction-card";
import { SellerPreview } from "../types/sellers";
import { AuctionPreview } from "../types/auctions";

function TopOffersSection() {
  const [offers, setOffers] = useState<OfferPreview[]>();

  useEffect(() => {
    async function fetchTopOffers() {
      try {
        const { data } = await mockapi.get<OfferPreview[]>("offers/top");
        setOffers(data);
      } catch (error) {}
    }

    fetchTopOffers();
  }, []);

  return (
    <section id="top-offers-section" className="container mx-auto mt-12 px-8">
      <h1 className="text-gray-700 text-lg text-center font-extrabold">
        Top rated offers
      </h1>
      <div className="mt-6 flex items-center justify-center flex-col gap-8 lg:flex-row lg:gap-5">
        {offers &&
          offers.map((offer, i) => <OfferCard offer={offer} key={i} />)}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Link href="/offers">
          <a className="text-indigo-400 hover:text-indigo-500 font-extrabold uppercase tracking-wide">
            View All
          </a>
        </Link>
      </div>
    </section>
  );
}

function TopAuctionsSection() {
  const [auctions, setAuctions] = useState<AuctionPreview[]>();

  useEffect(() => {
    async function fetchTopAuctions() {
      try {
        const { data } = await mockapi.get<AuctionPreview[]>("auctions/top");
        setAuctions(data);
      } catch (error) {}
    }

    fetchTopAuctions();
  }, []);

  return (
    <section id="top-auctions-section" className="container mx-auto mt-12 px-8">
      <h1 className="text-gray-700 text-lg text-center font-extrabold">
        Most bidded auctions
      </h1>
      <div className="mt-6 flex items-center justify-center flex-col gap-8 lg:flex-row lg:gap-5">
        {auctions &&
          auctions.map((seller, i) => <AuctionCard auction={seller} key={i} />)}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Link href="/auctions">
          <a className="text-indigo-400 hover:text-indigo-500 font-extrabold uppercase tracking-wide">
            View All
          </a>
        </Link>
      </div>
    </section>
  );
}

function TopSellersSection() {
  const [sellers, setSellers] = useState<SellerPreview[]>();

  useEffect(() => {
    async function fetchTopSellers() {
      try {
        const { data } = await mockapi.get<SellerPreview[]>("sellers/top");
        setSellers(data);
      } catch (error) {}
    }

    fetchTopSellers();
  }, []);

  return (
    <section id="top-sellers-section" className="container mx-auto mt-12 px-8">
      <h1 className="text-gray-700 text-lg text-center font-extrabold">
        Our most popular sellers
      </h1>
      <div className="mt-6 flex items-center justify-center flex-col gap-8 lg:flex-row lg:gap-5">
        {sellers &&
          sellers.map((seller, i) => <SellerCard seller={seller} key={i} />)}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Link href="/sellers">
          <a className="text-indigo-400 hover:text-indigo-500 font-extrabold uppercase tracking-wide">
            View All
          </a>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div id="home-page">
      <section id="hero-section">
        <div className="bg-hero bg-cover shadow-lg rounded-b-lg overflow-hidden">
          <div className="bg-gray-700 bg-opacity-25 backdrop-blur h-full w-full px-8 py-24">
            <div className="text-white text-center leading-tight">
              <h1 className="font-extrabold text-4xl tracking-tight">
                Nozama Commerce
              </h1>
              <p className="mx-auto mt-4 max-w-lg">
                Nozama is designed for good quality, blazing fast commerce.
                Start now to enjoy the best e-commerce experience from the
                confort of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TopOffersSection />
      <TopAuctionsSection />
      <TopSellersSection />
    </div>
  );
}
