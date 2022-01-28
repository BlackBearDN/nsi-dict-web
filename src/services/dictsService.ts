import { AxiosResponse } from 'axios';

import { $nsiApi } from '../http';
import { Dict } from '../models/Dict';
import { DictDescription } from '../models/DictDescription';
import { getAllDictsPath, getCurrentDictPath, getCurrentDictDescriptionPath } from '../servicesConfig';

export const getAllDicts = async (): Promise<AxiosResponse<Dict[]>> =>
  $nsiApi.get<Dict[]>(getAllDictsPath());

export const getCurrentDict = async (oid: string): Promise<AxiosResponse<Array<object>>> =>
  $nsiApi.get<Array<object>>(getCurrentDictPath(oid));

export const getCurrentDictDescription = (oid: string): Promise<AxiosResponse<DictDescription>> =>
  $nsiApi.get<DictDescription>(getCurrentDictDescriptionPath(oid));
