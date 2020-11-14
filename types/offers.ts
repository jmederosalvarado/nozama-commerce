export type OfferPreview = {
  id: string;
  name: string;
  image?: string;
  price: number;
  rating: number;
};

export type OfferDetails = {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  rating: number;
};

export type OfferNew = {
  name: string;
  description: string;
  image?: string;
  price: number;
  seller: string;
};
