import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ConfettiExplosion from "react-confetti-explosion";
import { Link as RouterLink } from "react-router-dom";
import sanityClient from "../sanityClient";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

function Game() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [duelPlayer1, setDuelPlayer1] = useState();
  const [duelPlayer2, setDuelPlayer2] = useState();
  const players = useSelector((state) => state.players.players);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    async function fetchGame() {
      try {
        const GROQ = '*[_type == "duel" || _type == "neverHaveIEver" || _type == "pointingGame"]';
        // const GROQ = '*[_type == "duel"]';
        const response = await sanityClient.fetch(GROQ);
        console.log(response);

        if (response.length === 0) {
          throw new Error("No game found");
        } else {
          setShuffledQuestions(shuffleArray([...response]));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchGame();
  }, []);

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsExploding(false);
    } else {
      setIsEnd(true);
      setIsExploding(false);
    }
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  useEffect(() => {
    if (currentQuestion) {
      if (currentQuestion._type === "pointingGame" && !isEnd) {
        document.body.style.backgroundColor = "#43455C";
        setIsExploding(true);
      } else if (currentQuestion._type === "duel" && !isEnd) {
        document.body.style.backgroundColor = "#3c3f58";
      } else if (currentQuestion._type === "neverHaveIEver" && !isEnd) {
        document.body.style.backgroundColor = "#707793";
      } else if (isEnd) {
        document.body.style.backgroundColor = "#2E3047";
      }
    }
  }, [currentQuestion, isEnd]);

  // console.log("Current Question", currentQuestion._type);
  // console.log("Spillere", players);

  useEffect(() => {
    if (currentQuestion && currentQuestion._type === "duel") {
      const pickRandomPlayers = () => {
        const indexOne = Math.floor(Math.random() * players.length);
        let indexTwo = Math.floor(Math.random() * players.length);

        // Ensure indexTwo is different from indexOne
        while (indexOne === indexTwo) {
          indexTwo = Math.floor(Math.random() * players.length);
        }

        setDuelPlayer1(players[indexOne]);
        setDuelPlayer2(players[indexTwo]);
      };

      pickRandomPlayers();
    }
  }, [players, currentQuestion]);

  console.log(duelPlayer1, duelPlayer2);

  return (
    <Grid container direction={"column"} m={"0 auto"} mt={8} flexGrow={1} justifyContent={"space-between"} px={2}>
      {currentQuestion && !isEnd && (
        <>
          <Grid className="questionContainer" sx={{ heigt: "200px" }}>
            {currentQuestion._type === "pointingGame" ? (
              <Grid>
                {isExploding && <ConfettiExplosion colors={["#d4afb9", "#d1cfe2", "#7ec4cf", "#daeaf6"]} />}
                <Typography component={"p"} variant="gameTypeHeading" textAlign={"center"} mb={4}>
                  Peikeleik
                </Typography>
                <Typography component={"p"} variant="gameQuestion" textAlign={"center"}>
                  {currentQuestion.statement}
                </Typography>
              </Grid>
            ) : currentQuestion._type === "duel" ? (
              <Grid>
                <Typography component={"p"} variant="gameTypeHeading" textAlign={"center"} mb={1}>
                  Rygg mot rygg
                </Typography>
                <Grid container gap={1} justifyContent={"center"} mb={3}>
                  <Typography variant="vsHeading">
                    {duelPlayer1} VS {duelPlayer2}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography component={"p"} variant="duelQuestion" textAlign={"center"}>
                    {currentQuestion.firstStatement}
                  </Typography>
                  <Divider variant="middle" sx={{ bgcolor: "#2E3047", marginTop: "1rem", marginBottom: "1rem" }} />
                  <Typography component={"p"} variant="duelQuestion" textAlign={"center"}>
                    {currentQuestion.secondStatement}
                  </Typography>
                  <Divider variant="middle" sx={{ bgcolor: "#2E3047", marginTop: "1rem", marginBottom: "1rem" }} />
                  <Typography component={"p"} variant="duelQuestion" textAlign={"center"}>
                    {currentQuestion.thirdStatement}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid>
                <Typography component={"p"} variant="gameTypeHeading" textAlign={"center"} mb={4}>
                  Jeg har aldri...
                </Typography>
                <Typography component={"p"} variant="gameQuestion" textAlign={"center"}>
                  ...{currentQuestion.statement.toLowerCase()}
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
      {isEnd ? (
        <Grid container justifyContent={"space-between"} flexGrow={1}>
          <Grid container justifyContent={"center"}>
            <Typography variant="gameTypeHeading" textAlign={"center"}>
              Gratulerer!
            </Typography>
            <Typography variant="gameQuestion" textAlign={"center"}>
              Dere har kommet dere gjennom en hel runde 🍻
            </Typography>
          </Grid>
          <Grid width={"100%"}>
            <Button fullWidth variant="contained" component={RouterLink} to="/">
              Tilbake til forsiden
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          onClick={handleNext}
          variant="contained"
          sx={{ marginBottom: 2, backgroundColor: "#3bba70", color: "black", fontFamily: "'New Amsterdam', sans-serif", fontSize: "18px" }}
        >
          <Typography variant="buttonLabel">Neste</Typography>
        </Button>
      )}
    </Grid>
  );
}

export default Game;
