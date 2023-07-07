import './index.css'

const CustomCheckBox = ({ labelText, onChange, id }) => {
  return (
    <div className='checkbox-wrapper'>
      <div className='checkbox-wrapper-28 flex items-center'>
        <input
          id={id + labelText}
          type='checkbox'
          name={labelText}
          data-id={id}
          onChange={onChange}
          className='promoted-input-checkbox'
        />

        <svg>
          <use xlinkHref='#checkmark-28' />
        </svg>
        <label htmlFor={id + labelText}>{labelText}</label>
        <svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
          <symbol id='checkmark-28' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeMiterlimit='10'
              fill='none'
              d='M22.9 3.7l-15.2 16.6-6.6-7.1'
            ></path>
          </symbol>
        </svg>
      </div>
    </div>
  )
}

export default CustomCheckBox
