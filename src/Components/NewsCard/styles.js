import { styled } from "@mui/system";
import { Card, CardMedia, CardActions, Typography } from "@mui/material";

export const StyledCard = styled(Card)(({ active }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderBottom: "10px solid white",
  ...(active && {
    borderBottom: "10px solid #22289a",
  }),
}));

export const Media = styled(CardMedia)({
  height: 170,
});

export const Details = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "20px",
});

export const Title = styled(Typography)({
  padding: "0 16px",
});

export const CardActionsStyled = styled(CardActions)({
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
});
