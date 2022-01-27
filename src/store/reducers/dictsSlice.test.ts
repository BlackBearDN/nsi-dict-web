import reducer, { DictsState, searchDicts } from '../../store/reducers/dictsSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

const dictsAdapter = createEntityAdapter();
const initialState: DictsState = {
  allDicts: [
    {
      id: 1,
      oid: '1.2.643.5.1.13.13.11.1102',
      name: 'Должности медицинского персонала',
      version: '4.3',
      updateDate: '2021-04-29',
    },
    {
      id: 2,
      oid: '1.2.643.5.1.13.13.11.1124',
      name: 'Перечень образовательных организаций Российской' +
        ' Федерации и РСФСР с хронологией переименования',
      version: '1.538',
      updateDate: '2021-05-08',
    },
    {
      id: 3,
      oid: '1.2.643.5.1.13.13.11.1103',
      name: 'Квалификация медицинского персонала',
      version: '1.5',
      updateDate: '2020-01-27',
    },
  ],
  showedInGeneralPageDicts: [
    {
      id: 1,
      oid: '1.2.643.5.1.13.13.11.1102',
      name: 'Должности медицинского персонала',
      version: '4.3',
      updateDate: '2021-04-29',
    },
    {
      id: 2,
      oid: '1.2.643.5.1.13.13.11.1124',
      name: 'Перечень образовательных организаций Российской' +
        ' Федерации и РСФСР с хронологией переименования',
      version: '1.538',
      updateDate: '2021-05-08',
    },
    {
      id: 3,
      oid: '1.2.643.5.1.13.13.11.1103',
      name: 'Квалификация медицинского персонала',
      version: '1.5',
      updateDate: '2020-01-27',
    },
  ],
  currentDict: [{}],
  currentDictDescription: null,
  loading: false,
  error: null,
};

describe('DictsSlice', () => {
  it('DictsSlice search is working', () => {
    expect(reducer(dictsAdapter.getInitialState(initialState), searchDicts('перс'))).toEqual({
      allDicts: [
        {
          id: 1,
          oid: '1.2.643.5.1.13.13.11.1102',
          name: 'Должности медицинского персонала',
          version: '4.3',
          updateDate: '2021-04-29',
        },
        {
          id: 2,
          oid: '1.2.643.5.1.13.13.11.1124',
          name: 'Перечень образовательных организаций Российской' +
            ' Федерации и РСФСР с хронологией переименования',
          version: '1.538',
          updateDate: '2021-05-08',
        },
        {
          id: 3,
          oid: '1.2.643.5.1.13.13.11.1103',
          name: 'Квалификация медицинского персонала',
          version: '1.5',
          updateDate: '2020-01-27',
        },
      ],
      showedInGeneralPageDicts: [
        {
          id: 1,
          oid: '1.2.643.5.1.13.13.11.1102',
          name: 'Должности медицинского персонала',
          version: '4.3',
          updateDate: '2021-04-29',
        },
        {
          id: 3,
          oid: '1.2.643.5.1.13.13.11.1103',
          name: 'Квалификация медицинского персонала',
          version: '1.5',
          updateDate: '2020-01-27',
        },
      ],
      currentDict: [{}],
      currentDictDescription: null,
      loading: false,
      error: null,
      entities: {},
      ids: [],
    });
  });
});
