import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './style.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCurrentDict } from '../../store/thunks/dictsThunk';
import { setNullCurrentDictArray } from '../../store/slices/dictsSlice';
import Loader from '../Loader';

const DescPageContentSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const { currentDict } = useAppSelector((state) => state.dictsReducer);
    const currentLocation = location.pathname.slice(1);

    useEffect(() => {
        dispatch(fetchCurrentDict(currentLocation));

        return () => {
          dispatch(setNullCurrentDictArray());
        };
    }, []);

    if (currentDict === null) {
        return (
          <div className="deskPageContentSection">
              <Loader />
          </div>
        );
    }
    return (
      <div className="deskPageContentSection">
          {
              currentDict.length ?
                <div>
                    <div className="deskPageContentSection__line deskPageContentSection__names">
                        {
                            currentDict && Object.keys(currentDict[0]).map((value, key) => {
                                return <p key={key}>{value}</p>;
                            })
                        }
                    </div>
                    {
                        currentDict && currentDict.map((obj, key) => {
                          return (
                            <div className="deskPageContentSection__line" key={key}>
                              {
                                Object.values(obj)
                                  .map((value, key) => {
                                    return (
                                      <p key={key}>
                                        {typeof value == 'boolean' && (value ? 'Да' : 'Нет')}
                                        {typeof value != 'boolean' && value}
                                      </p>
                                    );
                                  })
                              }
                            </div>
                          );
                        })
                    }
                </div>
                :
                ''
          }
          {
              !currentDict.length &&
                <div className="deskPageContentSection__null">
                    <p>Данная таблица не имеет ячеек</p>
                </div>
          }
      </div>
    );
};

export default DescPageContentSection;
