import React, { useEffect, useRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { StyledCard, Media, Details, Title, CardActionsStyled } from "./styles";

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,
  activeArticle,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (i === activeArticle) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [i, activeArticle]);
  return (
    <StyledCard ref={ref} active={activeArticle === i}>
      <CardActionArea href={url} target="_blank">
        <Media
          image={
            urlToImage ||
            "https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png"
          }
          title={title}
        />
        <Details>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </Details>
        <Title gutterBottom variant="h5" component="h2">
          {title}
        </Title>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionsStyled>
        <Button size="small" color="primary" href={url}>
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary" component="h2">
          {i + 1}
        </Typography>
      </CardActionsStyled>
    </StyledCard>
  );
};

export default NewsCard;
