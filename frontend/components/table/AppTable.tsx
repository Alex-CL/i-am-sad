import React from "react";
import { Box, Table, TableContainer } from "@mui/material";
import { Head } from "./Head";
import { Pagination } from "./Pagination";
import { Body } from "./Body";
import { Actions, Field, Pager, Search, Sort } from "./types";
import useMediaQuery from "@mui/material/useMediaQuery";

const DEFAULT_ROW_KEY = "id";

export type TableProps<T, Q> = {
  readonly fields: Field<T>[];
  readonly items: T[];
  readonly rowKeyField: keyof T;

  readonly actions?: Actions<T>;
  readonly pager?: Pager;
};

export function AppTable<
  T extends { [key: string]: any },
  Q extends { [key: string]: any }
>(props: TableProps<T, Q>) {
  return (
    <>
      <TableContainer>
        <Table style={{ border: "none" }}>
          <Head fields={props.fields} actions={props.actions} />
          <Body
            actions={props.actions}
            fields={props.fields}
            items={props.items}
            rowKeyField={props.rowKeyField || DEFAULT_ROW_KEY}
          />
        </Table>
      </TableContainer>
      <Box display={"flex"} justifyContent={"flex-end"}>
        {props.pager && <Pagination {...props.pager} />}
      </Box>
    </>
  );
}
