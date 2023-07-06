const CustomCheckBox = ({ labelText, onChange, id }) => {
  return (
    <div className='checkbox-wrapper'>
      <input
        id={labelText}
        type='checkbox'
        name={labelText}
        data-id={id}
        className='input-checkbox'
        onChange={onChange}
      />

      {/*  <svg>
        <use xlinkHref='#checkmark' />
      </svg>

      <svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
        <symbol id='checkmark' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeMiterlimit='10'
            fill='none'
            d='M22.9 3.7l-15.2 16.6-6.6-7.1'
          />
        </symbol>
      </svg> */}

      <label className='text-black px-2' htmlFor={labelText}>
        {labelText}
      </label>
    </div>
  );
};

export default CustomCheckBox;
