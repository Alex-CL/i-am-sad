import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { v4 as uuidv4 } from "uuid";
import {
  Layout,
  AppButton,
  AppTable,
  Actions,
  Field,
  Pager,
} from "../components";
import { ButtonType, Quote, emptyQuote, QueryPager } from "../models";
import { api } from "../api";

const rowsPerPage = 5;

export default function FavQuotes() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [items, setItems] = useState<Quote[]>([]);
  const [pager, setPager] = useState<Pager>();
  const [selectedQuote, setSelectedQuote] = useState<Quote>(emptyQuote());

  const quoteContainer = {
    whiteSpace: "break-space",
    height: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
  };

  const textStyle = {
    fontSize: "1rem",
    paddingTop: "20px",
  };

  const noQuotesStyle = {
    fontSize: "2rem",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    textAlign: "center",
  };

  const buttonsContainer = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: "15px",
    height: "10%",
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    setIsLoading(false);
    const query = {
      limit: rowsPerPage,
      offset: page,
    };
    const itemList = api.getAll(query);
    setItems(itemList.items);
    setCount(itemList.count);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    setPager({
      page,
      count,
      handleChangePage,
      rowsPerPage,
      handleChangeRowsPerPage: () => {},
    });
  }, [page, count, rowsPerPage]);

  const fields: Field<Quote>[] = [
    {
      label: "Quote",
      name: "quote",
    },
    {
      label: "Author",
      name: "author",
    },
  ];

  const readQuote = (q: Quote) => setSelectedQuote(q);

  const deleteQuote = (q: Quote) => {
    api.delete(q.id);
    if (q.id === selectedQuote.id) {
      setSelectedQuote(emptyQuote());
    }
    setIsLoading(true);
  };

  const actions: Actions<List> = {
    actionsColumn: "Actions",
    items: [
      {
        handler: readQuote,
        icon: <VisibilityIcon />,
        label: "Read",
      },
      {
        handler: deleteQuote,
        icon: <DeleteIcon />,
        label: "Remove",
      },
    ],
  };

  const handleChangePage = (event: unknown, value: number) => setPage(value);

  return (
    <Layout>
      <Box sx={quoteContainer}>
        {items.length > 0 ? (
          <>
            <p style={textStyle}>Your favourite quotes:</p>
            <AppTable
              actions={actions}
              fields={fields}
              items={items}
              rowKeyField={"id"}
              pager={pager}
            />
            {selectedQuote.id && (
              <>
                <p>{selectedQuote.quote}</p>
                <p style={{ textAlign: "right" }}>- {selectedQuote.author}</p>
              </>
            )}
          </>
        ) : (
          <Typography sx={noQuotesStyle}>
            When you add quotes, they will appear here
          </Typography>
        )}
      </Box>
      <Box sx={buttonsContainer}>
        <AppButton
          type={ButtonType.Secondary}
          label={"Go back"}
          handleClick={() => router.push("/")}
        />
      </Box>
    </Layout>
  );
}
