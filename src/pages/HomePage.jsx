import { Button, Grid, IconButton, List, TextField, Typography } from "@mui/material";
import { Cancel as CancelIcon, Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import { addPlayer, cancelEdit, deletePlayer, editPlayer, savePlayer, updateEditedName } from "../redux/slice/playerSlice";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import { useRef, useState } from "react";

function HomePage() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);
  const editingIndex = useSelector((state) => state.players.editingIndex);
  const editedName = useSelector((state) => state.players.editedName);
  const [newPlayer, setNewPlayer] = useState("");
  const inputRef = useRef();

  const handleAddPlayer = () => {
    if (newPlayer.trim()) {
      dispatch(addPlayer(newPlayer));
      setNewPlayer("");
    }
  };

  const handleEditPlayer = (index) => {
    dispatch(editPlayer({ index }));
  };

  const handleSaveEdit = () => {
    dispatch(savePlayer(editedName));
  };

  const handleCancelEdit = () => {
    dispatch(cancelEdit());
  };

  const handleDeletePlayer = (index) => {
    dispatch(deletePlayer(index));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddPlayer(); // Call the add player function
    }
  };

  return (
    <Grid container direction="column" m="0 auto" width="100%" height="100vh" flexWrap={"nowrap"}>
      <Grid container justifyContent="center" mt={3}>
        <Typography component="h1" variant="gameTypeHeading">
          Peikeleik
        </Typography>
      </Grid>

      {/* Player List Section */}
      <Grid
        container
        direction="column"
        px={2}
        flexWrap={"nowrap"}
        flexGrow={1} // Makes this section take up remaining vertical space
        overflow="hidden" // Prevents the overall grid from expanding when there's overflow
      >
        <Typography variant="homePageLabel" sx={{ fontFamily: "'New Amsterdam', sans-serif", fontWeight: 100, fontSize: "24px" }}>
          Spillere:
        </Typography>
        <List
          sx={{
            flexGrow: 1, // Allows the list to take all available space within this section
            mb: 2,
            maxHeight: "100%", // Ensures list doesn’t exceed available space
            overflow: "auto",
          }}
        >
          <Grid container direction="column" gap={2}>
            {players.map((player, index) => (
              <Grid
                container
                component="li"
                key={index}
                bgcolor="#3BBA9C"
                px={2}
                py={1}
                borderRadius="6px"
                alignItems="center"
                color={"black"}
                justifyContent="space-between"
              >
                {editingIndex === index ? (
                  <Grid container>
                    <TextField fullWidth value={editedName} onChange={(e) => dispatch(updateEditedName(e.target.value))} />
                    <IconButton onClick={handleSaveEdit}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit}>
                      <CancelIcon />
                    </IconButton>
                  </Grid>
                ) : (
                  <>
                    <Typography variant="playerName">{player}</Typography>
                    <Grid>
                      <IconButton onClick={() => handleEditPlayer(index)} sx={{ padding: "0", mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeletePlayer(index)} sx={{ padding: "0" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </List>
      </Grid>

      {/* Add Players Section */}
      <Grid
        container
        direction="column"
        p={2}
        sx={{
          backgroundColor: "#3d405f",
          flexShrink: 0, // Prevents this section from shrinking
        }}
        gap={2}
      >
        <TextField
          label="Spillernavn"
          variant="filled"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          ref={inputRef}
          onKeyPress={handleKeyPress}
          placeholder="Enter player name" // Ensure placeholder is set
          sx={{
            "& .MuiInputBase-input": {
              color: "#e1e1e1", // Text color
              "&::placeholder": {
                color: "#e1e1e1", // Placeholder color
                opacity: 1, // Ensure the color is visible
              },
            },
            "& .MuiFormLabel-root": {
              color: "#e1e1e1", // Label color
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "#e1e1e1", // Label color when focused
            },
          }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#3BBA9C", color: "black", fontFamily: "'New Amsterdam', sans-serif", fontSize: "18px" }}
          onClick={handleAddPlayer}
        >
          Legg til spiller
        </Button>
        <Button
          disabled={players.length > 1 ? false : true}
          component={RouterLink}
          to="/game"
          variant="contained"
          size="large"
          fullWidth
          sx={{ backgroundColor: "#3bba70", color: "black", fontFamily: "'New Amsterdam', sans-serif", fontSize: "18px" }}
        >
          Start spill
        </Button>
      </Grid>
    </Grid>
  );
}

export default HomePage;
