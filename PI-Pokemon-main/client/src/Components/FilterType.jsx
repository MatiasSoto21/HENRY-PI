import React, { useEffect } from 'react'
import { filterByType, getTypes } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Modulecss/FilterType.module.css'

const FilterType = () => {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleFilterByType(e) {
    dispatch(filterByType(e.target.value));
  }
  return (
    <div className={styles.container}> Filter by Type
      <select onChange={e => handleFilterByType(e)}>
        <option value='All'>All</option>
        {types.map(e =>
          <option key={e.id} value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>)}
      </select>
    </div>
  )
}

export default FilterType