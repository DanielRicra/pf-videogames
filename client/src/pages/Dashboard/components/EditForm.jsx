import { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { BoxInput, TextField } from '../../../components'
import { CloudUpload } from '../../../components/icons'
import * as videoGameService from '../../../services/videoGameService'
import {
  actionTypes,
  fetchData,
  INITIAL_STATE,
} from '../../Create/fetchReducer'
import { useGenres } from '../../../hooks/useGenres'
import { useTags } from '../../../hooks/useTags'
import { selectStyles } from '../../Create/styles'
import { convertImageFileToBase64 } from '../../../utils/helpers'
import { useVideogame } from '../../../hooks/useVideogame'

const EditVideogameForm = () => {
  const { id } = useParams()
  const { game, gameError, isGameLoading, mutate } = useVideogame(id)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: 'all' })
  const navigate = useNavigate()
  const [image, setImage] = useState(game?.image)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [state, dispatch] = useReducer(fetchData, INITIAL_STATE)

  const { genres, isGenresLoading } = useGenres()
  const { tags, isTagsLoading } = useTags()

  const onSubmit = async (data) => {
    data.genres = selectedGenres.map((genre) => +genre.value)
    data.tags = selectedTags.map((tag) => +tag.value)

    if (!data.genres.length || !data.tags.length) {
      return
    }

    try {
      if (data.image[0] instanceof File) {
        const imgBase64 = await convertImageFileToBase64(data.image[0])
        data.image = imgBase64
      }

      dispatch({ type: actionTypes.FETCH_START })
      await videoGameService.updateVideogame(game?.id, data)
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: {} })
      mutate()
      navigate('/dashboard/admin/videogames')
    } catch (error) {
      console.log(error)
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: error?.response?.data ?? 'Something went wrong',
      })
    }
  }

  useEffect(() => {
    reset({
      name: game?.name,
      description: game?.description,
      price: game?.price,
      image: game?.image,
      releaseDate: game?.releaseDate,
      stock: game?.stock,
    })
    setSelectedGenres(
      game?.genres.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) ?? []
    )
    setSelectedTags(
      game?.tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) ?? []
    )
    setImage(game?.image)
  }, [game, reset])

  if (isGameLoading && !game) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>Loading...</h1>
      </div>
    )
  }

  if (gameError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          {gameError?.message ?? 'Something went wrong'}
        </h1>
      </div>
    )
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
            <textarea
              type='text'
              placeholder='Enter a description'
              {...register('description', {
                required: 'Description is required',
              })}
              id='description'
              className='p-3 rounded-lg bg-transparent border-2 border-purple-600 max-h-56'
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
              step='0.01'
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

        <div className='flex items-center'>
          <label htmlFor='stock' className='text-base flex gap-2 font-light'>
            Available
            <input
              type='checkbox'
              id='stock'
              name='Available'
              className='text-2xl border-2 p-0.5 cursor-pointer border-purple-600 w-6 h-6 rounded-lg appearance-none before:content-[""] before:w-full before:h-full before:rounded-md before:block before:transition-all before:duration-300 before:bg-purple-500 before:scale-0 checked:before:scale-100 before:ease-in-out before:opacity-0 checked:before:opacity-100'
              {...register('stock')}
            />
          </label>
        </div>

        <div className='flex items-center flex-col'>
          <label
            htmlFor='image'
            className='border-2 w-[200px] border-purple-600 p-3 rounded-lg aspect-square flex items-center justify-center flex-col'
          >
            {image ? (
              <>
                <img
                  src={
                    image instanceof File ? URL.createObjectURL(image) : image
                  }
                  alt='preview'
                  className='w-full h-full object-cover'
                />
                <button
                  className='mt-2 p-2 px-4 bg-red-500 text-white rounded-lg hover:opacity-80'
                  onClick={() => setImage('')}
                >
                  Reset image
                </button>
              </>
            ) : (
              <>
                <CloudUpload className='text-purple-600 h-16 w-16 stroke-1' />
                <span>Upload your image</span>
                <input
                  type='file'
                  className='hidden'
                  name='image'
                  {...register('image', {
                    required: 'Image is required',
                    onChange: async (e) => {
                      setImage(e.target.files[0])
                    },
                  })}
                  id='image'
                  accept='image/*'
                />
              </>
            )}
          </label>
          <p className='text-red-600 text-sm ml-2'>{errors.image?.message}</p>
        </div>

        <BoxInput>
          {isGenresLoading ? (
            <p className='animate-pulse'>Loading genres...</p>
          ) : (
            <Select
              className='basic-single'
              classNamePrefix='select'
              isClearable={true}
              isSearchable={true}
              name='genres'
              isMulti
              options={
                genres?.results?.map((genre) => ({
                  value: genre.id,
                  label: genre.name,
                })) ?? []
              }
              defaultValue={
                game?.genres?.map((genre) => ({
                  value: genre.id,
                  label: genre.name,
                })) ?? []
              }
              placeholder='Select genres'
              isLoading={isGenresLoading}
              styles={selectStyles}
              onChange={(genres) => setSelectedGenres(genres)}
            />
          )}
          <p className='text-red-600 text-sm ml-2'>
            {selectedGenres.length === 0
              ? 'At least one genre is required'
              : ''}
          </p>
        </BoxInput>

        <BoxInput>
          {isTagsLoading ? (
            <p className='animate-pulse'>Loading tags...</p>
          ) : (
            <Select
              className='basic-single'
              isClearable={true}
              isSearchable={true}
              name='tags'
              isMulti
              styles={selectStyles}
              options={
                tags?.results?.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                })) ?? []
              }
              defaultValue={
                game?.tags?.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                })) ?? []
              }
              placeholder='Select tags'
              isLoading={isTagsLoading}
              onChange={(tags) => setSelectedTags(tags)}
            />
          )}
          <p className='text-red-600 text-sm ml-2'>
            {selectedTags.length === 0 ? 'At least one tag is required' : ''}
          </p>
        </BoxInput>

        <input
          type='submit'
          disabled={state.loading}
          className='p-3 rounded-lg bg-purple-600 text-white hover:opacity-80 disabled:bg-purple-500 disabled:cursor-not-allowed'
          value={state.loading ? 'Updating...' : 'Update'}
        />
        {state.error && <p className='text-red-600'>{state.error}</p>}
      </form>
    </div>
  )
}
export default EditVideogameForm
