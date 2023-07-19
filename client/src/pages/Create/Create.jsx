import { useReducer, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

import { BoxInput, TextField } from '../../components'
import { CloudUpload } from '../../components/icons'
import * as videoGameService from '../../services/videoGameService'
import { actionTypes, fetchData, INITIAL_STATE } from './fetchReducer'
import { useGenres } from '../../hooks/useGenres'
import { useTags } from '../../hooks/useTags'
import { selectStyles } from './styles'
import { convertImageFileToBase64 } from '../../utils/helpers'

const Create = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ criteriaMode: 'all' })
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [state, dispatch] = useReducer(fetchData, INITIAL_STATE)

  const { genres, isGenresLoading } = useGenres()
  const { tags, isTagsLoading } = useTags()

  const onSubmit = async (data) => {
    data.rating = 1

    try {
      const imgBase64 = await convertImageFileToBase64(data.image[0])
      data.image = imgBase64

      dispatch({ type: actionTypes.FETCH_START })
      await videoGameService.saveNewVideogame(data)
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: {} })
      reset()
      navigate('/dashboard/admin/videogames')
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: error?.response?.data ?? 'Something went wrong',
      })
    }
  }

  return (
    <div className='flex items-center w-full min-h-screen box-content justify-center py-20'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col bg-gray-100 p-8 rounded-lg text-black w-[90%] md:max-w-[24rem] lg:max-w-[44rem] 2xl:max-w-[40rem] gap-4'
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

        <div className='flex items-center flex-col'>
          <label
            htmlFor='image'
            className='border-2 w-[200px] border-purple-600 p-3 rounded-lg aspect-square flex items-center justify-center flex-col'
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt='preview'
                className='w-full h-full object-cover'
              />
            ) : (
              <>
                <CloudUpload className='text-purple-600 h-16 w-16 stroke-1' />
                <span>Upload your image</span>
              </>
            )}

            <input
              type='file'
              className='hidden'
              name='image'
              {...register('image', {
                required: 'Image is required',
                onChange: (e) => {
                  setImage(e.target.files[0])
                },
              })}
              id='image'
            />
          </label>
          <p className='text-red-600 text-sm ml-2'>{errors.image?.message}</p>
        </div>

        <BoxInput>
          {isGenresLoading ? (
            <p className='animate-pulse'>Loading genres...</p>
          ) : (
            <Controller
              control={control}
              name='genres'
              rules={{ required: 'At least one genre is required' }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  isClearable={true}
                  isSearchable={true}
                  name={name}
                  isMulti
                  options={
                    genres?.map((genre) => ({
                      value: genre.id,
                      label: genre.name,
                    })) ?? []
                  }
                  value={genres.find((g) => g.id === value)}
                  onChange={(e) =>
                    e.value
                      ? onChange(e.value)
                      : onChange(e.map((c) => c.value))
                  }
                  placeholder='Select genres'
                  isLoading={isGenresLoading}
                  styles={selectStyles}
                />
              )}
            />
          )}
          <p className='text-red-600 text-sm ml-2'>{errors.genres?.message}</p>
        </BoxInput>

        <BoxInput>
          {isTagsLoading ? (
            <p className='animate-pulse'>Loading tags...</p>
          ) : (
            <Controller
              control={control}
              name='tags'
              rules={{ required: 'At least one tag is required' }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  className='basic-single'
                  isClearable={true}
                  isSearchable={true}
                  name={name}
                  isMulti
                  styles={selectStyles}
                  options={
                    tags?.map((tag) => ({
                      value: tag.id,
                      label: tag.name,
                    })) ?? []
                  }
                  value={tags.find((g) => g.id === value)}
                  onChange={(e) =>
                    e.value
                      ? onChange(e.value)
                      : onChange(e.map((c) => c.value))
                  }
                  placeholder='Select tags'
                  isLoading={isTagsLoading}
                />
              )}
            />
          )}
          <p className='text-red-600 text-sm ml-2'>{errors.tags?.message}</p>
        </BoxInput>

        <input
          type='submit'
          disabled={state.loading}
          className='p-3 rounded-lg bg-purple-600 text-white hover:opacity-80 disabled:bg-purple-500 disabled:cursor-not-allowed'
          value={state.loading ? 'Creating...' : 'Create'}
        />
        {state.error && <p className='text-red-600'>{state.error}</p>}
      </form>
    </div>
  )
}
export default Create
