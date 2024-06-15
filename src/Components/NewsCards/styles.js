import { styled } from "@mui/system";
import { Grid } from "@mui/material";

export const Container = styled(Grid)({
  padding: "0 5%",
  width: "100%",
  margin: 0,
});

export const InfoCardStyled = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "10%",
  borderRadius: 10,
  color: "white",
  textAlign: "center",
});

export const CardStyled = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "20px",
  borderRadius: 10,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  textAlign: "center",
  boxSizing: "border-box",
});
