import React from 'react';
import { useData } from '../../context';
import './Filter.css';

export const Filter = ({ setShowFilter }) => {
  const { dispatch } = useData();
  const hideModalHandler = () => {
    setShowFilter(false);
  };

  return (
    <div className='modal'>
      <h3>
        Sort By Date
        <span onClick={hideModalHandler} className='hide__icon'>
          X
        </span>
      </h3>
      <hr />
      <label className='filter__input'>
        <input
          onClick={(e) =>
            dispatch({
              type: 'DATEFILTER',
              payload: e.target.value,
            })
          }
          name='filter'
          type='radio'
          value='newDate'
        />
        <span className='filter__desc'>Latest Note</span>
      </label>
      <label className='filter__input'>
        <input
          onClick={(e) =>
            dispatch({
              type: 'DATEFILTER',
              payload: e.target.value,
            })
          }
          name='filter'
          type='radio'
          value='oldDate'
        />
        <span className='filter__desc'>Oldest Note</span>
      </label>
    </div>
  );
};
