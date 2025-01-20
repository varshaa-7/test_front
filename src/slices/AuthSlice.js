import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: (() => {
    try {
      return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    } catch (error) {
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    markQuizAsAttempted(state, action) {
      if (state.user) {
        const quizId = action.payload;

        // Update the attemptedQuizzes array
        state.user.attemptedQuizzes = state.user.attemptedQuizzes
          ? [...state.user.attemptedQuizzes, quizId]
          : [quizId];

        // Save the updated user object to localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { setToken, setUser, markQuizAsAttempted } = authSlice.actions;

export default authSlice.reducer;
