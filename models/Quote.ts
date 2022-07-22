export type Quote = {
  id: string;
  author: string;
  quote: string;
};

export function emptyQuote(): Quote {
  return {
    id: "",
    author: "",
    quote: "",
  };
}
