import { Button } from "@mui/material";
import { ButtonType } from "../../models";

type ButtonProps = {
  label: string;
  isOutlined?: boolean;
  type?: ButtonType;
  handleClick: () => void;
  endIcon?: JSX.Element;
};

export const AppButton = (props: ButtonProps) => {
  const defaultStyle = {
    width: "180px",
    height: "36px",
    whiteSpace: "nowrap",
    borderShadow: "20px",
  };

  return (
    <Button
      sx={{ ...getStyle(props.type), ...defaultStyle }}
      variant={props.isOutlined || !props.type ? "outlined" : "filled"}
      onClick={props.handleClick}
      endIcon={props.endIcon}
    >
      {reduceLabel(props.label)}
    </Button>
  );
};

function getStyle(type: ButtonType): string {
  const primary = {
    background:
      "linear-gradient(137deg, rgba(42,149,166,1) 0%, rgba(91,137,191,1) 44%, rgba(15,28,194,1) 84%, rgba(162,0,255,1) 100%)",
    color: "#FFF",
  };

  const secondary = {
    background:
      "linear-gradient(137deg, rgba(166,135,42,1) 0%, rgba(191,150,91,1) 15%, rgba(194,51,15,1) 89%, rgba(255,29,0,1) 100%)",
    color: "#FFF",
  };

  switch (type) {
    case ButtonType.Primary:
      return primary;
    case ButtonType.Secondary:
      return secondary;
    default:
      return "";
  }
}

function reduceLabel(s: string): string {
  const maxLabel = 14;

  return s.length > maxLabel ? s.substring(0, maxLabel) + "..." : s;
}
