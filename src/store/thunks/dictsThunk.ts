import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAllDicts, getCurrentDict, getCurrentDictDescription } from '../../services/dictsService';

export const fetchAllDicts = createAsyncThunk(
  'dictionary',
  async () => {
    const response = await getAllDicts();
    return response.data;
  },
);

export const fetchCurrentDict = createAsyncThunk(
  'dictionary/current',
  async (oid: string) => {
    const response = await getCurrentDict(oid);
    return response.data;
  },
);

export const fetchCurrentDictDescription = createAsyncThunk(
  'dictionary/description',
  async (oid: string) => {
    const response = await getCurrentDictDescription(oid);
    return response.data;
  },
);
