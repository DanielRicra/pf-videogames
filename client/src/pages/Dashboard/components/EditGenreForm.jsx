import { useReducer, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { BoxInput, TextField } from '../../../components'
import {
  actionTypes,
  fetchData,
  INITIAL_STATE,
} from '../../Create/fetchReducer'
import { useGenreById } from '../../../hooks/useGenres'
import * as genreService from '../../../services/genreService'

const EditGenreForm = () => {
  const { id } = useParams()
  const { genre, genreError, isGenreLoading, mutate } = useGenreById(id)
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: 'all' })
  const navigate = useNavigate()

  const [state, dispatch] = useReducer(fetchData, INITIAL_STATE)

  useEffect(() => {
    reset({
      name: genre?.name,
    })
  }, [genre, reset])

  const onSubmit = async (data) => {
    try {
      dispatch({ type: actionTypes.FETCH_START })
      await genreService.updateGenre(genre?.id, data)
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: {} })
      mutate()
      navigate('/dashboard/admin/genres')
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: error?.response?.data ?? 'Something went wrong',
      })
    }
  }

  if (isGenreLoading && !genre) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>Loading...</h1>
      </div>
    )
  }

  if (genreError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          {genreError?.message ?? 'Something went wrong'}
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
export default EditGenreForm
