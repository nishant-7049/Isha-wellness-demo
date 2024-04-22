import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllQuestions = createAsyncThunk(
  "getAllQuestions",
  async (query) => {
    const config = { withCredentials: true };
    const { data } = await axios.get(
      `https://ishacare.onrender.com/api/forum/questions?keyword=${query.keyword}&page=${query.page}`,
      config
    );
    return data;
  }
);

export const createQuestion = createAsyncThunk(
  "createQuestion",
  async (options) => {
    const config = { withCredentials: true };
    const { data } = await axios.post(
      "https://ishacare.onrender.com/api/forum/createQuestion",
      options,
      config
    );
    return data;
  }
);

export const deleteQuestion = createAsyncThunk("deleteQuestion", async (id) => {
  const config = { withCredentials: true };
  const { data } = await axios.delete(`https://ishacare.onrender.com/api/forum/${id}`, config);
  return data;
});

export const editQuestion = createAsyncThunk(
  "editQuestion",
  async (options) => {
    const config = { withCredentials: true };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/forum/${options.id}`,
      { question: options.question },
      config
    );
    return data;
  }
);

export const getAnswers = createAsyncThunk("getAnswers", async (options) => {
  const config = { withCredentials: true };
  const { data } = await axios.get(
    `https://ishacare.onrender.com/api/forum/answer/${options.id}?page=${options.page}`,
    config
  );
  return data;
});

export const createAnswer = createAsyncThunk(
  "createAnswer",
  async (options) => {
    const config = { withCredentials: true };
    const { data } = await axios.post(
      "https://ishacare.onrender.com/api/forum/createAnswer",
      options,
      config
    );
    return data;
  }
);

const forumSlice = createSlice({
  name: "forum",
  initialState: {
    loadingQuestions: false,
    loadingAnswers: false,
    error: null,
    questions: null,
    questionsCount: 0,
    question: null,
    keyword: "",
    isKeywordUpdated: false,
    page: 1,
    isPageUpdated: false,
    isAnswerCreated: false,
    answers: null,
    answersCount: 0,
    isQuestionCreated: false,
    isQuestionDeleted: false,
    isQuestionEdited: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsQuestionCreated: (state) => {
      state.isQuestionCreated = false;
    },
    resetIsQuestionDeleted: (state) => {
      state.isQuestionDeleted = false;
    },
    resetIsQuestionEdited: (state) => {
      state.isQuestionEdited = false;
    },
    resetIsAnswerCreated: (state) => {
      state.isAnswerCreated = false;
    },
    resetAnswers: (state) => {
      state.answers = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
      state.isPageUpdated = true;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
      state.isKeywordUpdated = true;
    },
    resetIsPageUpdated: (state) => {
      state.isPageUpdated = false;
    },
    resetIsKeywordUpdated: (state) => {
      state.isKeywordUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.pending, (state) => {
      state.loadingQuestions = true;
    });
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.loadingQuestions = false;
      state.questions = action.payload.questions;
      state.questionsCount = action.payload.questionsCount;
    });
    builder.addCase(getAllQuestions.rejected, (state, action) => {
      state.loadingQuestions = false;
      state.error = action.error.message;
    });
    builder.addCase(createQuestion.pending, (state) => {
      state.loadingQuestions = true;
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.loadingQuestions = false;
      state.question = action.payload.question;
      state.isQuestionCreated = true;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.loadingQuestions = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteQuestion.pending, (state) => {
      state.loadingQuestions = true;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.loadingQuestions = false;
      state.isQuestionDeleted = action.payload.success;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.loadingQuestions = false;
      state.error = action.error.message;
    });
    builder.addCase(editQuestion.pending, (state) => {
      state.loadingQuestions = true;
    });
    builder.addCase(editQuestion.fulfilled, (state, action) => {
      state.loadingQuestions = false;
      state.isQuestionEdited = action.payload.success;
    });
    builder.addCase(editQuestion.rejected, (state, action) => {
      state.loadingQuestions = false;
      state.error = action.error.message;
    });
    builder.addCase(getAnswers.pending, (state) => {
      state.loadingAnswers = true;
    });
    builder.addCase(getAnswers.fulfilled, (state, action) => {
      state.loadingAnswers = false;
      state.answers = action.payload.answers;
      state.answersCount = action.payload.answersCount;
    });
    builder.addCase(getAnswers.rejected, (state, action) => {
      state.loadingAnswers = false;
      state.error = action.error.message;
    });
    builder.addCase(createAnswer.pending, (state) => {
      state.loadingAnswers = true;
    });
    builder.addCase(createAnswer.fulfilled, (state, action) => {
      state.loadingAnswers = false;
      state.isAnswerCreated = action.payload.success;
    });
    builder.addCase(createAnswer.rejected, (state, action) => {
      state.loadingAnswers = false;
      state.error = action.error.message;
    });
  },
});

export default forumSlice.reducer;
export const {
  clearError,
  resetIsQuestionCreated,
  resetIsQuestionDeleted,
  resetIsQuestionEdited,
  resetIsAnswerCreated,
  resetIsPageUpdated,
  resetIsKeywordUpdated,
  resetAnswers,
  setPage,
  setKeyword,
} = forumSlice.actions;
