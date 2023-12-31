import CustomCheckBox from './CustomCheckBox'

const MultiSelectAccordion = ({
  addToSelectedFilters,
  title,
  options,
  styles,
}) => {
  return (
    <div
      className='flex flex-col rounded-md px-[10px] py-[3px] border gap-2 overflow-hidden  justify-center '
      style={styles}
    >
      <label
        className='flex w-full justify-between items-center'
        htmlFor={`accordion-title-${title}`}
      >
        <input
          type='checkbox'
          name='accordion-title'
          id={`accordion-title-${title}`}
          className='opacity-0 absolute hidden -z-10 peer'
        />
        <h3 className='text-xl font-medium m-0'>{title}</h3>
      </label>

      <div
        className='flex flex-col max-h-[300px] overflow-y-auto gap-2'
        style={{ 'height': options.length * 30 + 'px' }}
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
  )
}

export default MultiSelectAccordion
