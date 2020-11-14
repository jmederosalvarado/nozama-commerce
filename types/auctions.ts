export type AuctionPreview = {
  id: string;
  name: string;
  image?: string;
  price: number;
  bids: number;
};

export type AuctionDetails = {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  bids: number;
  closing: string;
};

export type AuctionNew = {
  name: string;
  description: string;
  image?: string;
  seller: string;
  price: number;
  duration: number;
};
