/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import MultiSelectAccordion from './MultiSelectAccordion';

const FiltersSidebar = ({ paginate }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sourceFilters, setSourceFilters] = useState([]);

  const addToSelectedFilters = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setSelectedFilters((prev) => [...prev, name]);
    } else {
      setSelectedFilters(selectedFilters.filter((item) => item !== name));
    }
  };

  const addToSourceFilters = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setSourceFilters((prev) => [...prev, name]);
    } else {
      setSourceFilters(sourceFilters.filter((item) => item !== name));
    }
  };

  return (
    <div className='flex flex-col h- rounded-xl m-4 bg-[#bdbcbc] p-4'>
      <h2 className='text-black font-medium text-2xl mb-4'>Filter by</h2>
      <h2 className='text-black font-medium text-xl mb-4'>price</h2>
      <div className='flex mb-4 items-center gap-4'>
        <div className='flex flex-col'>
          <label htmlFor='' className='text-black'>
            From
          </label>
          <input className='text-black rounded w-10' />
        </div>
        <p className='text-black text-center'>-</p>
        <div className='flex flex-col'>
          <label htmlFor='' className='text-black'>
            To
          </label>
          <input type='text' className='text-black rounded w-10' name='to' />
        </div>
      </div>
      <MultiSelectAccordion
        title='Categoria'
        options={[
          { id: 1, name: 'Spoonacular API' },
          { id: 2, name: 'Recipe Explorer API' },
          { id: 2, name: 'Recipe Explorer API' },
          { id: 2, name: 'Recipe Explorer API' },
        ]}
        addToSelectedFilters={addToSelectedFilters}
      />
      {/*       <p>{loading && 'Fetching diets...'}</p>
      <p className='error-message'>{error && `Diets: ${error}`}</p> */}

      <MultiSelectAccordion
        title='Tags'
        options={[
          { id: 1, name: 'Spoonacular API' },
          { id: 2, name: 'Recipe Explorer API' },
        ]}
        addToSelectedFilters={addToSourceFilters}
      />
    </div>
  );
};

export default FiltersSidebar;
