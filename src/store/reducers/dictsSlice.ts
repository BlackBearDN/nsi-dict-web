import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';

import { IDict } from '../../models/IDict';
import { fetchAllDicts, fetchDictDescription } from './actionCreators';

export interface DictsState {
  allDicts: IDict[];
  showedInGeneralPageDicts: IDict[];
  currentDict: Array<object>;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: DictsState = {
  allDicts: [],
  showedInGeneralPageDicts: [],
  currentDict: [{}],
  loading: false,
  error: null,
};

const dictsAdapter = createEntityAdapter();

export const dictsSlice = createSlice({
  name: 'dicts',
  initialState: dictsAdapter.getInitialState(initialState),
  reducers: {
    searchDicts: (state, action: PayloadAction<string>) => {
      const inputValue: string = action.payload;
      const indexList: number[] = [];
      let currentObj: (string | number)[];

      function match(str: string, sub: string) {
        str = '' + str;
        sub = '' + sub;
        if (sub.length > str.length) {
          return false;
        }

        const interval = str.length - sub.length + 1;
        for (let i = 0; i < interval; i++) {
          let res = 0;
          for (let u = 0; u < sub.length; u++) {
            if ( str[i+u] !== sub[u] ) {
              break;
            } else {
              res++;
            }
          }
          if ( res === sub.length ) {
            return true;
          }
        }
        return false;
      }

      // search needed elements indexes
      for (let i = 0; i < state.allDicts.length; i++) {
        currentObj = Object.values(state.allDicts[i]);
        for (let j = 0; j < currentObj.length; j++) {
          if ( match(currentObj[j].toString().toLowerCase(), inputValue.toLowerCase()) ) {
            indexList[indexList.length] = i;
          }
        }
      }

      // remove repeat indexes
      const uniqueIndexes: number[] = indexList.filter(function(item, pos) {
        return indexList.indexOf(item) == pos;
      });

      // set to showedInGeneralPageDicts searched results
      state.showedInGeneralPageDicts = [];
      for (let i = 0; i < uniqueIndexes.length; i++) {
        state.showedInGeneralPageDicts[i] = state.allDicts[uniqueIndexes[i]];
      }
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
        .addCase(fetchDictDescription.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDictDescription.fulfilled, (state, action) => {
          state.currentDict = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchDictDescription.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        });
  },
});

export const { searchDicts } = dictsSlice.actions;
export default dictsSlice.reducer;
