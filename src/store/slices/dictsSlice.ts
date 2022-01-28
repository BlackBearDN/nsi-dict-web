import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';

import { Dict } from '../../models/Dict';
import { DictDescription } from '../../models/DictDescription';
import {
  fetchAllDicts,
  fetchCurrentDict,
  fetchCurrentDictDescription,
} from '../thunks/dictsThunk';

export interface DictsState {
  allDicts: Dict[] | null;
  showedInGeneralPageDicts: Dict[] | null;
  currentDict: any[] | null;
  currentDictDescription: DictDescription | null;
  error: SerializedError | null;
}

const initialState: DictsState = {
  allDicts: null,
  showedInGeneralPageDicts: null,
  currentDict: null,
  currentDictDescription: null,
  error: null,
};

const dictsAdapter = createEntityAdapter();

export const dictsSlice = createSlice({
  name: 'dicts',
  initialState: dictsAdapter.getInitialState(initialState),
  reducers: {
    searchDicts: (state, action: PayloadAction<string>) => {
      const subString: string = action.payload;
      state.showedInGeneralPageDicts = [];

      state.allDicts?.forEach((obj: Dict) => {
        const objValues = Object.values(obj);
        for (const value of objValues) {
          if (value.toString().toLowerCase().includes(subString.toLowerCase())) {
            state.showedInGeneralPageDicts?.push(obj);
            break;
          }
        }
      });
    },

    setNullAllDicts(state) {
      state.allDicts = null;
    },
    setNullShowedInGeneralPageDicts(state) {
      state.showedInGeneralPageDicts = null;
    },
    setNullCurrentDictArray(state) {
      state.currentDict = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDicts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllDicts.fulfilled, (state, action) => {
        state.allDicts = action.payload;
        state.showedInGeneralPageDicts = state.allDicts;
        state.error = null;
      })
      .addCase(fetchAllDicts.rejected, (state, action) => {
        state.error = action.error;
      });
    builder
      .addCase(fetchCurrentDict.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCurrentDict.fulfilled, (state, action) => {
        state.currentDict = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentDict.rejected, (state, action) => {
        state.error = action.error;
      });
    builder
      .addCase(fetchCurrentDictDescription.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCurrentDictDescription.fulfilled, (state, action) => {
        state.currentDictDescription = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentDictDescription.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { searchDicts, setNullCurrentDictArray, setNullAllDicts, setNullShowedInGeneralPageDicts } = dictsSlice.actions;
export default dictsSlice.reducer;
