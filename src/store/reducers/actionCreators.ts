import { createAsyncThunk } from '@reduxjs/toolkit';

import DictsService from '../../services/DictsService';

export const fetchAllDicts = createAsyncThunk(
  'dictionary',
  async () => {
    const response = await DictsService.getAllDicts();
    return response.data;
  },
);

export const fetchCurrentDict = createAsyncThunk(
  'dictionary/current',
  async (oid: string) => {
    const response = await DictsService.getCurrentDict(oid);
    return response.data;
  },
);

export const fetchCurrentDictDescription = createAsyncThunk(
  'dictionary/description',
  async (oid: string) => {
    const response = await DictsService.getCurrentDictDescription(oid);
    return response.data;
  },
);
