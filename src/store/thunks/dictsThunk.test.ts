import reducer, { DictsState } from '../slices/dictsSlice';
import { fetchAllDicts, fetchCurrentDict, fetchCurrentDictDescription } from './dictsThunk';
import { createEntityAdapter } from '@reduxjs/toolkit';

describe('dictsFetch endpoints', () => {
  const dictsAdapter = createEntityAdapter();
  const initialState: DictsState = {
    allDicts: [],
    showedInGeneralPageDicts: [],
    currentDict: [{}],
    currentDictDescription: null,
    error: null,
  };

  it('fetchAllDicts is pending', () => {
    const action = { type: fetchAllDicts.pending.type };
    const state = reducer(dictsAdapter.getInitialState(initialState), action);
    expect(state).toEqual({
      allDicts: [],
      showedInGeneralPageDicts: [],
      currentDict: [{}],
      currentDictDescription: null,
      error: null,
      entities: {},
      ids: [],
    });
  });

  it('fetchAllDicts is fulfilled', () => {
    const action = {
      type: fetchAllDicts.fulfilled.type,
      payload: [
        {
          id: 1,
          oid: '1.2.643.5.1.13.13.11.1102',
          name: 'Должности медицинского персонала',
          version: '4.3',
          updateDate: '2021-04-29',
        },
      ],
    };
    const state = reducer(dictsAdapter.getInitialState(initialState), action);
    expect(state).toEqual({
      allDicts: [
        {
          id: 1,
          oid: '1.2.643.5.1.13.13.11.1102',
          name: 'Должности медицинского персонала',
          version: '4.3',
          updateDate: '2021-04-29',
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
      ],
      currentDict: [{}],
      currentDictDescription: null,
      error: null,
      entities: {},
      ids: [],
    });
  });

  it('fetchCurrentDict is fulfilled', () => {
    const action = {
      type: fetchCurrentDict.fulfilled.type,
      payload: [
        {
          id: 1,
          externalName: null,
          parentId: null,
          name: 'Должности работников медицинских организаций',
          endDate: null,
          f30Code: null,
          needCert: false,
          medicalPost: false,
          educationPost: false,
          expandable: true,
        },
      ],
    };
    const state = reducer(dictsAdapter.getInitialState(initialState), action);
    expect(state).toEqual({
      allDicts: [],
      showedInGeneralPageDicts: [],
      currentDict: [{
        id: 1,
        externalName: null,
        parentId: null,
        name: 'Должности работников медицинских организаций',
        endDate: null,
        f30Code: null,
        needCert: false,
        medicalPost: false,
        educationPost: false,
        expandable: true,
      }],
      currentDictDescription: null,
      error: null,
      entities: {},
      ids: [],
    });
  });

  it('fetchCurrentDictDescription is fulfilled', () => {
    const action = {
      type: fetchCurrentDictDescription.fulfilled.type,
      payload: [
        {
          dictionaryName: 'Должности медицинского персонала',
          fieldDescription: {
            endDate: '',
            f30Code: 'Код формы 30',
            name: 'Наименование',
            isEducationPost: '',
            isMedicalPost: '',
            needCert: '',
            parentId: '',
          },
          correctPermission: null,
          multiSelection: false,
          dataUrl: 'http://dev.digitaltechs.io/dictionary/1.2.643.5.1.13.13.11.1102?all=true',
          hierarchy: true,
          linear: false,
        },
      ],
    };
    const state = reducer(dictsAdapter.getInitialState(initialState), action);
    expect(state).toEqual({
      allDicts: [],
      showedInGeneralPageDicts: [],
      currentDict: [{}],
      currentDictDescription: [
        {
          dictionaryName: 'Должности медицинского персонала',
          fieldDescription: {
            endDate: '',
            f30Code: 'Код формы 30',
            name: 'Наименование',
            isEducationPost: '',
            isMedicalPost: '',
            needCert: '',
            parentId: '',
          },
          correctPermission: null,
          multiSelection: false,
          dataUrl: 'http://dev.digitaltechs.io/dictionary/1.2.643.5.1.13.13.11.1102?all=true',
          hierarchy: true,
          linear: false,
        },
      ],
      loading: false,
      error: null,
      entities: {},
      ids: [],
    });
  });

  it('fetchAllDicts is rejected', () => {
    const action = { type: fetchAllDicts.rejected.type, error: 'some error' };
    const state = reducer(dictsAdapter.getInitialState(initialState), action);
    expect(state).toEqual({
      allDicts: [],
      showedInGeneralPageDicts: [],
      currentDict: [{}],
      currentDictDescription: null,
      loading: false,
      error: action.error,
      entities: {},
      ids: [],
    });
  });
});
