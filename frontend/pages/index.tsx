import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { v4 as uuidv4 } from "uuid";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Layout, AppButton } from "../components";
import { ButtonType, Quote, emptyQuote } from "../models";
import { api } from "../api";

export default function Home() {
  const router = useRouter();

  const [quote, setQuote] = useState<Quote>(emptyQuote());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const quoteContainer = {
    whiteSpace: "break-space",
    height: "80%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    marginRight: "20px",
    marginLeft: "20px",
  };

  const quoteStyle = {
    textAlign: "center",
    fontSize: "3rem",
    fontWeight: "300",
  };

  const authorStyle = {
    textAlign: "right",
    fontSize: "3rem",
    fontWeight: "400",
  };

  const buttonsContainer = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "40px",
    paddingBottom: "15px",
    height: "20%",
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    setIsLoading(false);

    getRandomQuote().then((q) => setQuote(q));
  }, [isLoading]);

  const markQuoteAsFav = () => api.add(quote);

  return (
    <Layout>
      <Box sx={quoteContainer}>
        <Typography sx={quoteStyle}>{quote.quote}</Typography>
        <Typography sx={authorStyle}>- {quote.author}</Typography>
      </Box>
      <Box sx={buttonsContainer}>
        <AppButton
          type={ButtonType.Secondary}
          label={"Get another"}
          handleClick={() => setIsLoading(true)}
        />
        <AppButton
          type={ButtonType.Primary}
          label={"Mark as fav"}
          endIcon={<FavoriteIcon />}
          handleClick={() => markQuoteAsFav()}
        />
        <AppButton
          type={ButtonType.Primary}
          label={"Go to list"}
          handleClick={() =>
            router.push({
              pathname: "/favQuotes",
              query: { quote: JSON.stringify(quote) },
            })
          }
        />
      </Box>
    </Layout>
  );
}

async function getRandomQuote(): Promise<Quote> {
  const { data } = await client.query({
    query: gql`
      {
        randomQuote {
          quote
          author
        }
      }
    `,
  });

  return {
    id: uuidv4(),
    quote: data.randomQuote.quote,
    author: data.randomQuote.author,
  };
}
