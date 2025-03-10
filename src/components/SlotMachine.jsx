import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const symbols = ["🍒", "🍋", "🍉", "🔔", "⭐", "🍇", "7️⃣"];

export default function SlotMachine() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(false);
  const [credits, setCredits] = useState(100);
  const [bet, setBet] = useState(10);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCredits(100);
    setHistory([]);
  };

  const spinReels = () => {
    if (credits < bet) return;

    setSpinning(true);
    setWinner(false);

    let spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(finalReels);
      setSpinning(false);

      let resultMessage = "";
      let newCredits = credits - bet;

      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        setWinner(true);
        newCredits += bet * 3;
        resultMessage = `🎉 You won ${bet * 3} credits! 🎉`;
      } else {
        resultMessage = `❌ You lost ${bet} credits`;
      }

      setCredits(newCredits);
      setHistory([{ date: new Date().toLocaleString(), result: resultMessage }, ...history.slice(0, 5)]);
    }, 2000);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding={isMobile ? "10px" : "20px"}
      sx={{ backgroundColor: "#f5f5f5", color: "#333" }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: isMobile ? "20px" : "40px",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "20px",
          width: isMobile ? "90%" : "400px",
          maxWidth: "400px",
          boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
          🎰 Slot Machine 🎰
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4CAF50" }}>
          💰 Credits: {credits}
        </Typography>

        <Box my={2}>
          <Typography variant="subtitle1">💵 Bet:</Typography>
          <Select
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            disabled={spinning}
            sx={{
              minWidth: "100px",
              backgroundColor: "#eee",
              borderRadius: "5px",
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Box>

        <Box display="flex" justifyContent="center" fontSize={isMobile ? 50 : 70} my={3}>
          {reels.map((symbol, index) => (
            <Box key={index} mx={isMobile ? 1 : 2}>
              {symbol}
            </Box>
          ))}
        </Box>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="primary" onClick={spinReels} disabled={spinning || credits < bet}>
            🎲 Spin
          </Button>
          <Button variant="contained" color="secondary" onClick={resetGame}>
            🔄 Reset Game
          </Button>
        </Box>
      </Paper>

      <Button variant="contained" color="info" onClick={() => setShowHistory(!showHistory)} sx={{ marginTop: "15px" }}>
        📜 {showHistory ? "Hide History" : "Show History"}
      </Button>

      {showHistory && (
        <Paper
          elevation={6}
          sx={{ marginTop: "20px", padding: "20px", backgroundColor: "#fff", borderRadius: "20px", width: isMobile ? "90%" : "300px", maxWidth: "300px" }}
        >
          <Typography variant="h6" gutterBottom>
            📜 Game History
          </Typography>
          <List>
            {history.map((entry, index) => (
              <ListItem key={index}>
                <ListItemText primary={entry.result} secondary={entry.date} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}