import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './style.scss';

import {
  fetchCurrentDict,
  fetchCurrentDictDescription,
} from '../../store/reducers/actionCreators';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const DictDescriptionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    currentDict,
    currentDictDescription,
    loading } = useAppSelector((state) => state.dictsReducer);
  const currentLocation = location.pathname.slice(1);

  useEffect(() => {
    dispatch(fetchCurrentDict(currentLocation));
    dispatch(fetchCurrentDictDescription(currentLocation));
  }, []);

  return (
    <div className="dictDescriptionPage">
      <p className="pageTitle">
        { currentDictDescription && currentDictDescription.dictionaryName }
      </p>

      <div className="table">
        <div className="table__header">
          <div className="leavePage">
            <button onClick={() => navigate('/')}><i className="fas fa-arrow-left" /></button>
          </div>
        </div>
        <div className="table__contentSection">
          <div className="table__contentSection_line table__contentSection_names">
            {
              currentDict && Object.keys(currentDict[0]).map((value, key) => {
                return <p key={key}>{value !== '' ? value : 'Неизвестно'}</p>;
              })
            }
          </div>
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
        <div className="table__footer">
          {/* <div className="table__footer_version"> */}
          {/*   /!* Сервер не возвращает версию при получении отдельного словаря */}
          {/*   и ошибки cors при получении запросов от nsi росминздрава *!/ */}
          {/*   <p className="version">Version: <span>?</span></p> */}
          {/*   <p */}
          {/*     className="relevant" */}
          {/*     style={{ color: '#007f00', background: '#cdffcd', border: '1px solid #007f00' }} */}
          {/*   > */}
          {/*     <i className="fas fa-circle"></i> */}
          {/*     <span>Relevant</span> */}
          {/*   </p> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default DictDescriptionPage;
