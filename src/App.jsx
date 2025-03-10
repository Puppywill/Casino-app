import SlotMachine from "./components/SlotMachine";
import { Box } from "@mui/material";

export default function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      sx={{ backgroundColor: "#121212" }}
    >
      <SlotMachine />
    </Box>
  );
}
