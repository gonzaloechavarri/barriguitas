export type PricePoint = {
  date: Date;
  close: number;
};

export type AssetHistory = {
  isin: string;
  prices: PricePoint[];
};
