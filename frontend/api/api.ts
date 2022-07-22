import { Quote, ItemList, QueryPager } from "../models";
import { Pager } from "../components";

const quotes: Quote[] = [];

export const api = {
  getAll(query: QueryPager): ItemList<Quote> {
    const start = query.limit * query.offset;
    const items = quotes.slice(start, query.limit + start);
    return {
      items,
      count: quotes.length,
    };
  },

  add: (q: Quote) => {
    if (
      quotes.find((i) => i.id === q.id) ||
      quotes.find((i) => i.quote === q.quote)
    ) {
      return;
    }
    quotes.push(q);
  },

  delete: (id: string) => {
    const index = quotes.findIndex((f) => f.id === id);
    if (index !== -1) {
      quotes.splice(index, 1);
    }
  },
};
