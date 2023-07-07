import { useState } from 'react';
import CustomCheckBox from './CustomCheckBox';

const MultiSelectAccordion = ({
  addToSelectedFilters,
  title,
  options,
  styles,
}) => {
  const [collapsep, setCollapsep] = useState(true);
  return (
    <div className='flex flex-col gap-2 overflow-hidden' style={styles}>
      <label
        className='flex w-ful justify-between items-center cursor-pointer'
        htmlFor={`accordion-title-${title}`}
      >
        <input
          className='opacity-0 -z-10 absolute'
          type='checkbox'
          name='accordion-title'
          id={`accordion-title-${title}`}
          onClick={() => setCollapsep(!collapsep)}
        />
        <h3 className='font-medium m-0 text-xs text-black'>{title}</h3>
        <p className='text-black'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            className={`${collapsep ? 'rotate-0' : 'rotate-180'}`}
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 9l6 6l6 -6' />
          </svg>
        </p>
      </label>

      <div
        className={`${
          collapsep
            ? 'flex flex-col gap-0 h-0 p-0 opacity-0'
            : 'h-auto gap-2 opacity-100'
        }`}
      >
        {options.map((option) => (
          <CustomCheckBox
            key={`${option.id}`}
            labelText={option.name}
            id={option.id}
            onChange={addToSelectedFilters}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiSelectAccordion;
