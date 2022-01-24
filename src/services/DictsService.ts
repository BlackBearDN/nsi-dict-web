import { AxiosResponse } from 'axios';

import { $nsiApi } from '../http';
import { IDict } from '../models/IDict';
import { IDictDescription } from '../models/IDictDescription';

export default class DictsService {
  static async getAllDicts(): Promise<AxiosResponse<IDict[]>> {
    return $nsiApi.get<IDict[]>('/dictionary');
  }

  static async getCurrentDict(oid: string): Promise<AxiosResponse<Array<object>>> {
    return $nsiApi.get<Array<object>>(`/dictionary/${oid}`);
  }

  static async getCurrentDictDescription(oid: string): Promise<AxiosResponse<IDictDescription>> {
    return $nsiApi.get<IDictDescription>(`/dictionary/description/${oid}`);
  }
}
