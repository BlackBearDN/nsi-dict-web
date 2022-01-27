import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';

import { IDict } from '../../models/IDict';
import { IDictDescription } from '../../models/IDictDescription';
import {
  fetchAllDicts,
  fetchCurrentDict,
  fetchCurrentDictDescription,
} from '../actionCreators';

export interface DictsState {
  allDicts: IDict[];
  showedInGeneralPageDicts: IDict[];
  currentDict: any[] | null;
  currentDictDescription: IDictDescription | null;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: DictsState = {
  allDicts: [],
  showedInGeneralPageDicts: [],
  currentDict: null,
  currentDictDescription: null,
  loading: false,
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

      state.allDicts.forEach((obj) => {
        const curObj = Object.values(obj);
        curObj.forEach((value) => {
          value.toString().toLowerCase().includes(subString.toLowerCase()) &&
            state.showedInGeneralPageDicts.push(obj);
        });
      });
    },

    setNullCurrentDictArray(state) {
      state.currentDict = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDicts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDicts.fulfilled, (state, action) => {
        state.allDicts = action.payload;
        state.showedInGeneralPageDicts = state.allDicts;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllDicts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(fetchCurrentDict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentDict.fulfilled, (state, action) => {
        state.currentDict = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentDict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(fetchCurrentDictDescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentDictDescription.fulfilled, (state, action) => {
        state.currentDictDescription = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentDictDescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { searchDicts, setNullCurrentDictArray } = dictsSlice.actions;
export default dictsSlice.reducer;
