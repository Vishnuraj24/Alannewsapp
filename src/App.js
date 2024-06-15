import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import NewsCards from "./Components/NewsCards/NewsCards";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { auth } from "./firebase";

const alankey =
  "25fea2ca5ae5d626fe0c42ef7027dec12e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const alanBtnInstance = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  useEffect(() => {
    console.log("isLoggedIn state:", isLoggedIn); // Log initial and changes to isLoggedIn
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      if (!alanBtnInstance.current) {
        console.log("ALAN BUTTON", isLoggedIn);
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
    } else {
      if (alanBtnInstance.current) {
        console.log("deactivating alan button");
        alanBtnInstance.current.deactivate();
        alanBtnInstance.current.remove();
        alanBtnInstance.current = null;
      }
    }
  }, [isLoggedIn, activeArticle]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state on successful login
    console.log("Logged In:", isLoggedIn); // Log initial and changes to isLoggedIn
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false); // Update login state on logout
      console.log("Logged Out:", isLoggedIn);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // return (
  //   <>
  //     <Header></Header>
  //     <NewsCards articles={newsArticles} activeArticle={activeArticle} />
  //   </>
  // );

  // ADDING THE NEW CODE FOR AUTHENTICATION
  return (
    <Router>
      {!isLoggedIn ? (
        <>
          {" "}
          <Header withLogoutButton={isLoggedIn} onLogout={handleLogout} />
          <Login onLoginSuccess={handleLoginSuccess} />
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Header
                  withLogoutButton={isLoggedIn}
                  onLogout={handleLogout}
                  emailname={auth.currentUser?.email}
                />
                <NewsCards
                  articles={newsArticles}
                  activeArticle={activeArticle}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          {/* Add other routes here */}
        </Routes>
      )}
    </Router>
  );
};

export default App;
