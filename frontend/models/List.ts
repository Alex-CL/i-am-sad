import { Quote } from "./Quote";

export type List = {
  id: string;
  name: string;
  createdAt: Date;
  quotes: Quote[];
};
