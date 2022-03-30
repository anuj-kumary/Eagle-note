import React from 'react';
import { useData } from '../../context';
import './Filter.css';

export const Filter = ({ setShowFilter }) => {
  const { state } = useData();
  const hideModalHandler = () => {
    setShowFilter(false);
  };
  const changeHandler = (e) => {
    const text = e.target.value;
    if (text === 'asc') {
      state.noteList.sort((a, b) => a.timeCreated - b.timeCreated);
    } else return state.noteList.sort((a, b) => b.timeCreated - a.timeCreated);
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
          onChange={(e) => {
            changeHandler(e);
          }}
          name='filter'
          type='radio'
          value='asc'
        />
        <span className='filter__desc'>Date - Asc</span>
      </label>
      <label className='filter__input'>
        <input
          onChange={(e) => {
            changeHandler(e);
          }}
          name='filter'
          type='radio'
          value='dsc'
        />
        <span className='filter__desc'>Date - Dsc</span>
      </label>
    </div>
  );
};
