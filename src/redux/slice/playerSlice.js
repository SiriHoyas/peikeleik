import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  editingIndex: null,
  editedName: "",
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer(state, action) {
      state.players.push(action.payload);
    },
    editPlayer(state, action) {
      state.editingIndex = action.payload.index;
      state.editedName = state.players[action.payload.index];
    },
    savePlayer(state, action) {
      state.players[state.editingIndex] = action.payload;
      state.editingIndex = null;
      state.editedName = "";
    },
    cancelEdit(state) {
      state.editingIndex = null;
      state.editedName = "";
    },
    deletePlayer(state, action) {
      state.players = state.players.filter((_, i) => i !== action.payload);
    },
    updateEditedName(state, action) {
      state.editedName = action.payload;
    },
  },
});

export const { addPlayer, editPlayer, savePlayer, cancelEdit, deletePlayer, updateEditedName } = playerSlice.actions;

export default playerSlice.reducer;
