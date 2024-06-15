// src/components/NewsCards/NewsCards.js
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Grow, Grid, Typography } from "@mui/material";
import { Container, InfoCardStyled, CardStyled } from "./styles";

const infoCards = [
  { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#1565c0",
    title: "News by Categories",
    info: "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
  },
  {
    color: "#283593",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  console.log(articles.length);
  if (!articles.length) {
    console.log("Entered in to if condition");
    return (
      <Grow in>
        <Container container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard, index) => {
            return (
              <InfoCardStyled item xs={12} sm={6} md={4} lg={3} key={index}>
                <CardStyled style={{ backgroundColor: infoCard.color }}>
                  <Typography variant="h5" component="h5">
                    {infoCard.title}
                  </Typography>
                  {infoCard.info ? (
                    <Typography variant="h6" component="h6">
                      <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                      {infoCard.info}
                    </Typography>
                  ) : null}
                  <Typography variant="h6" component="h6">
                    Try Saying: <br></br>
                    <i>{infoCard.text}</i>
                  </Typography>
                </CardStyled>
              </InfoCardStyled>
            );
          })}
        </Container>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Container container alignItems="stretch" spacing={3}>
        {articles.map((article, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ display: "flex" }}
            key={i}
          >
            {console.log(`activearticle : ${activeArticle} and i : ${i}`)}
            <NewsCard article={article} i={i} activeArticle={activeArticle} />
          </Grid>
        ))}
      </Container>
    </Grow>
  );
};

export default NewsCards;
