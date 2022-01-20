import { createAsyncThunk } from '@reduxjs/toolkit';

import DictsService from '../../services/DictsService';

export const fetchAllDicts = createAsyncThunk(
  'dictionary',
  async () => {
    const response = await DictsService.getAllDicts();
    return response.data;
  },
);

export const fetchDictDescription = createAsyncThunk(
  'dictionary/description',
  async (oid: string) => {
    const response = await DictsService.getCurrentDict(oid);
    return response.data;
  },
);
