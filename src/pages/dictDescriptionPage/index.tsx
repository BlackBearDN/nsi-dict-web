import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './style.scss';

import { fetchDictDescription } from '../../store/reducers/actionCreators';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const DictDescriptionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentDict, loading } = useAppSelector((state) => state.dictsReducer);

  useEffect(() => {
    dispatch(fetchDictDescription(location.pathname.slice(1)));
  }, []);

  return (
    <div className="dictDescriptionPage">
      <p className="pageTitle">OID: {location.pathname.slice(1)}</p>

      <div className="table">
        <div className="table__header">
          <div className="leavePage">
            <button onClick={() => navigate('/')}><i className="fas fa-arrow-left" /></button>
          </div>
        </div>
        <div className="table__columnNamesSection">
          {
            currentDict && Object.keys(currentDict[0]).map((value, key) => {
              return <p key={key}>{value !== '' ? value : 'Неизвестно'}</p>;
            })
          }
        </div>
        <div className="table__contentSection">
          {
            currentDict && currentDict.map((obj, key) => {
              return (
                <div className="table__contentSection_line" key={key}>
                  {
                    Object.values(obj)
                      .map((value, key) => {
                        return (
                          <p key={key}>
                            {typeof value == 'boolean' && (value ? 'Да' : 'Нет')}
                            {typeof value == 'string' && value}
                            {typeof value == 'number' && value.toString()}
                          </p>
                        );
                      })
                  }
                </div>
              );
            })
          }
          {
            loading && <Loader />
          }
        </div>
        <div className="table__footer"></div>
      </div>
    </div>
  );
};

export default DictDescriptionPage;
