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
        Sort By Time
        <span onClick={hideModalHandler} className='hide__icon'>
          X
        </span>
      </h3>
      <hr />
      <label className='filter__input'>
        <input
          onClick={(e) =>
            dispatch({
              type: 'TIMEFILTER',
              payload: e.target.value,
            })
          }
          name='filter'
          type='radio'
          value='newTime'
        />
        <span className='filter__desc'>Latest Note</span>
      </label>
      <label className='filter__input'>
        <input
          onClick={(e) =>
            dispatch({
              type: 'TIMEFILTER',
              payload: e.target.value,
            })
          }
          name='filter'
          type='radio'
          value='oldTime'
        />
        <span className='filter__desc'>Oldest Note</span>
      </label>
    </div>
  );
};
