import { AxiosResponse } from 'axios';

import { $nsiApi } from '../http';
import { IDict } from '../models/IDict';

export default class DictsService {
  static async getAllDicts(): Promise<AxiosResponse<IDict[]>> {
    return $nsiApi.get<IDict[]>('/dictionary');
  }

  static async getCurrentDict(oid: string): Promise<AxiosResponse<Array<object>>> {
    return $nsiApi.get<Array<object>>(`/dictionary/${oid}`);
  }
}
