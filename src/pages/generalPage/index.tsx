import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import { fetchAllDicts } from '../../store/actionCreators';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { searchDicts } from '../../store/reducers/dictsSlice';

const GeneralPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showedInGeneralPageDicts, loading } = useAppSelector((state) => state.dictsReducer);

  useEffect(() => {
    dispatch(fetchAllDicts());
  }, []);

  return (
    <div className="generalPage">
      <p className="pageTitle">NSI DICT</p>

      <div className="table">
        <div className="table__header">
          <div className="search">
            <i className="fas fa-search"></i>
            <input
              onChange={(e) => dispatch(searchDicts(e.target.value))}
              type="search"
              placeholder="Search dict by Oid, Name, Version or Updated"
            />
          </div>
        </div>
        <div className="table__columnNamesSection">
          <p>Name | Oid</p>
          <p>Version</p>
          <p>Updated</p>
        </div>
        <div className="table__contentSection">
          {
            showedInGeneralPageDicts &&
              showedInGeneralPageDicts.map((dict) => {
                return (
                  <div key={dict.id} className="dictBlock">
                    <div className="dictBlock__name-oid">
                      <p>{dict.name}</p>
                      <span>{dict.oid}</span>
                    </div>
                    <div className="dictBlock__version">
                      <span className="version">{dict.version}</span>
                    </div>
                    <div className="dictBlock__updated">
                      <p>{dict.updateDate}</p>
                    </div>
                    <div className="dictBlock__link">
                      <Link to={'/' + dict.oid}>View More</Link>
                    </div>
                    <div className="dictBlock__controls">
                      <button><i className="fas fa-ellipsis-v"></i></button>
                    </div>
                  </div>
                );
              })
          }
          {loading && <Loader />}
        </div>
        <div className="table__footer"></div>
      </div>
    </div>
  );
};

export default GeneralPage;
