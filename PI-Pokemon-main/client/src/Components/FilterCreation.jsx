import React from 'react'
import { filteryByCreation } from '../Actions'
import { useDispatch } from 'react-redux'
import styles from './Modulecss/FilterCreation.module.css'

const FilterCreation = () => {
  const dispatch = useDispatch();

  function handleFilterByCreation(e) {
    dispatch(filteryByCreation(e.target.value))
  }

  return (
    <div className={styles.container}>Filter by Creation
      <select onChange={e => handleFilterByCreation(e)}>
        <option value="All">All</option>
        <option value="Api">Already Exist</option>
        <option value="Created">Created by you</option>
      </select>
    </div>
  )
}

export default FilterCreation