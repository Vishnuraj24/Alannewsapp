import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import NewsCards from "./Components/NewsCards/NewsCards";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

const alankey =
  "25fea2ca5ae5d626fe0c42ef7027dec12e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const alanBtnInstance = useRef(null);

  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: alankey,
        onCommand: ({ command, articles, number }) => {
          if (command === "newHeadlines") {
            console.log(articles);
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === "highlight") {
            console.log(
              `this is setting of the active article ${activeArticle}`
            );
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === "open") {
            console.log(`article number : ${number}`);
            const parsednumber =
              number.length > 2
                ? wordsToNumbers(number, { fuzzy: true })
                : number;
            const article = articles[parsednumber - 1];

            if (parsednumber > articles.length) {
              alanBtnInstance.current.playText(
                "Please try again... No more articles"
              );
            } else if (article) {
              window.open(article.url, `_blank`);
              alanBtnInstance.current.playText(
                `Sure... Opening article number ${parsednumber}`
              );
            } else {
              alanBtnInstance.current.playText("Please try that again.....");
            }
          }
        },
      });
    }
  }, [activeArticle]);
  return (
    <>
      <Header></Header>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </>
  );
};

export default App;
