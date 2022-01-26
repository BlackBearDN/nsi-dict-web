import { AxiosResponse } from 'axios';

import { $nsiApi } from '../http';
import { IDict } from '../models/IDict';
import { IDictDescription } from '../models/IDictDescription';

export const getAllDicts = async (): Promise<AxiosResponse<IDict[]>> =>
  $nsiApi.get<IDict[]>('/dictionary');

export const getCurrentDict = async (oid: string): Promise<AxiosResponse<Array<object>>> =>
  $nsiApi.get<Array<object>>(`/dictionary/${oid}`);

export const getCurrentDictDescription = (oid: string): Promise<AxiosResponse<IDictDescription>> =>
  $nsiApi.get<IDictDescription>(`/dictionary/description/${oid}`);
