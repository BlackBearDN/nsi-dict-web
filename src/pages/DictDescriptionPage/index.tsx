import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './style.scss';

import '../../components/DescPageContentSection';

import { fetchCurrentDictDescription } from '../../store/thunks/dictsThunk';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import DescPageContentSection from '../../components/DescPageContentSection';
import DictDescriptionPageProps from '../../models/DictDescriptionPageProps';

const DictDescriptionPage: React.FC<DictDescriptionPageProps> = ({ title = 'Dict' }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentDictDescription } = useAppSelector((state) => state.dictsReducer);
  const currentLocation = location.pathname.slice(1);

  useEffect(() => {
    document.title = title;

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
        <DescPageContentSection />
        <div className='table__footer'/>
      </div>
    </div>
  );
};

export default DictDescriptionPage;
