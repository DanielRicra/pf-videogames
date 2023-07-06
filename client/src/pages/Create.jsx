import { useForm } from 'react-hook-form'
import { BoxInput, TextField } from '../components'
import { CloudUpload } from '../components/icons'

const Create = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: 'all' })

  const onSubmit = () => {}

  return (
    <div className='flex items-center w-full min-h-screen box-content justify-center py-20'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col bg-gray-200 p-8 rounded-lg text-black w-[90%] md:max-w-[24rem] lg:max-w-[44rem] 2xl:max-w-[40rem] gap-4'
      >
        <BoxInput>
          <TextField
            error={errors.name?.message ?? ''}
            label='Name'
            name='name'
            type='text'
            {...register('name', { required: 'Name is required' })}
          >
            <input
              type='text'
              placeholder='Enter a name'
              {...register('name', { required: 'Name is required' })}
              id='name'
              className='p-3 rounded-lg bg-transparent border-2 border-purple-600'
              style={
                errors.name?.message
                  ? { borderColor: 'red', outlineColor: 'red' }
                  : null
              }
            />
          </TextField>
        </BoxInput>

        <BoxInput>
          <TextField
            error={errors.price?.message ?? ''}
            label='Price'
            name='price'
          >
            <input
              type='number'
              placeholder='Enter a price'
              {...register('price', {
                required: 'Price is required',
              })}
              id='price'
              className='p-3 rounded-lg bg-transparent border-2 border-purple-600'
              style={
                errors.price?.message
                  ? { borderColor: 'red', outlineColor: 'red' }
                  : null
              }
            />
          </TextField>
        </BoxInput>

        <BoxInput>
          <TextField
            error={errors.description?.message ?? ''}
            label='Description'
            name='description'
          >
            <input
              type='text'
              placeholder='Enter a description'
              {...register('description', {
                required: 'Description is required',
              })}
              id='description'
              className='p-3 rounded-lg bg-transparent border-2 border-purple-600'
              style={
                errors.description?.message
                  ? { borderColor: 'red', outlineColor: 'red' }
                  : null
              }
            />
          </TextField>
        </BoxInput>

        <BoxInput>
          <TextField
            error={errors.releaseDate?.message ?? ''}
            label='Release Date'
            name='releaseDate'
          >
            <input
              type='date'
              placeholder='Enter a Release Date'
              {...register('releaseDate', {
                required: 'Release Date is required',
              })}
              id='releaseDate'
              className='p-3 rounded-lg bg-transparent border-2 border-purple-600'
              style={
                errors.releaseDate?.message
                  ? { borderColor: 'red', outlineColor: 'red' }
                  : null
              }
            />
          </TextField>
        </BoxInput>

        <BoxInput>
          <TextField
            error={errors.stock?.message ?? ''}
            label='Stock'
            name='stock'
          >
            <input
              type='number'
              placeholder='Enter a stock'
              {...register('stock', {
                required: 'Stock is required',
              })}
              id='stock'
              className='p-3 rounded-lg bg-transparent border-2 border-purple-600'
              style={
                errors.stock?.message
                  ? { borderColor: 'red', outlineColor: 'red' }
                  : null
              }
            />
          </TextField>
        </BoxInput>

        <div className='flex items-center flex-col'>
          <label
            htmlFor='image'
            className='border-2 w-[200px] border-purple-600 p-3 rounded-lg aspect-square flex items-center justify-center flex-col'
          >
            <CloudUpload className='text-purple-600 h-16 w-16 stroke-1' />
            <span>Upload your image</span>
            <input
              type='file'
              {...register('image', {
                required: 'Video game image is required',
              })}
              className='hidden'
              id='image'
            />
          </label>
          <p className='text-red-600 text-sm ml-2'>{errors.image?.message}</p>
        </div>

        <input
          type='submit'
          className='p-3 rounded-lg bg-purple-600 text-white'
        />
      </form>
    </div>
  )
}
export default Create
