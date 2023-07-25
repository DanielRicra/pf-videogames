import { useForm } from 'react-hook-form'
import { BoxInput, TextField } from '../components'
import { CloudUpload } from '../components/icons'
import { convertImageFileToBase64 } from '../utils/helpers'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserById } from '../hooks/useUser'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, updateUser } from '../redux/user/userSlice'
import { INITIAL_STATE, actionTypes, fetchData } from '../reducers/fetchReducer'
import * as userService from '../services/userService'
import { toast } from 'sonner'

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: 'all' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [picture, setPicture] = useState(null)
  const userProfile = useSelector(selectUser)
  const { user, userError } = useUserById(userProfile.id)
  const [updateState, updateDispatch] = useReducer(fetchData, INITIAL_STATE)

  const onSubmit = async (data) => {
    data.banned = user?.banned ?? false
    data.email = user?.email

    try {
      if (data.picture[0] instanceof File) {
        const imgBase64 = await convertImageFileToBase64(data.picture[0])
        data.picture = imgBase64
      }
      updateDispatch({ type: actionTypes.FETCH_START })
      const updatedUser = await userService.updateUser({
        id: user?.id,
        user: data,
      })
      dispatch(updateUser(updatedUser))
      updateDispatch({ type: actionTypes.FETCH_SUCCESS, payload: {} })
      reset()
      toast.success('Profile updated successfully')
      navigate('/profile')
    } catch (error) {
      updateDispatch({
        type: actionTypes.FETCH_ERROR,
        payload: error?.response?.data ?? 'Something went wrong',
      })
    }
  }

  useEffect(() => {
    reset({
      name: user?.name,
      nickname: user?.nickname,
      picture: user?.picture,
    })
    setPicture(user?.picture)
  }, [user, reset])

  if (userError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          {userError?.message ?? 'Something went wrong'}
        </h1>
      </div>
    )
  }

  return (
    <div className='min-h-[calc(100vh-180px)] py-14 flex flex-col items-center'>
      <h2 className='text-2xl font-bold mb-6'>Edit Profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col bg-gray-100 p-8 rounded-lg text-black w-[90%] md:max-w-[24rem] lg:max-w-[44rem] 2xl:max-w-[40rem] gap-4'
      >
        <BoxInput>
          <TextField
            label='Name'
            name='name'
            error={errors.name?.message ?? ''}
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
            label='Nickname'
            name='nickname'
            error={errors.nickname?.message ?? ''}
          >
            <input
              type='text'
              placeholder='Enter a nickname'
              {...register('nickname', { required: 'Nickname is required' })}
              id='nickname'
              className='p-3 rounded-lg bg-transparent border-2 border-purple-600'
              style={
                errors.name?.message
                  ? { borderColor: 'red', outlineColor: 'red' }
                  : null
              }
            />
          </TextField>
        </BoxInput>

        <div className='flex items-center flex-col'>
          <label
            htmlFor='picture'
            className='border-2 w-[200px] border-purple-600 p-3 rounded-lg aspect-square flex items-center justify-center flex-col'
          >
            {picture ? (
              <>
                <img
                  src={
                    picture instanceof File
                      ? URL.createObjectURL(picture)
                      : picture
                  }
                  alt='preview'
                  className='w-full h-full object-cover'
                />
                <button
                  className='mt-2 p-2 px-4 bg-red-500 text-white rounded-lg hover:opacity-80'
                  onClick={() => setPicture('')}
                >
                  Reset Avatar
                </button>
              </>
            ) : (
              <>
                <CloudUpload className='text-purple-600 h-16 w-16 stroke-1' />
                <span>Upload your Avatar</span>
                <input
                  type='file'
                  className='hidden'
                  name='picture'
                  {...register('picture', {
                    required: 'Avatar is required',
                    onChange: async (e) => {
                      setPicture(e.target.files[0])
                    },
                  })}
                  id='picture'
                  accept='image/*'
                />
              </>
            )}
          </label>
          <p className='text-red-600 text-sm ml-2'>{errors.picture?.message}</p>
        </div>

        <div className='flex items-center justify-between'>
          <input
            type='button'
            disabled={updateState.loading}
            className='underline text-black hover:opacity-80 cursor-pointer'
            value='Cancel'
            onClick={() => navigate('/profile')}
          />
          <input
            type='submit'
            disabled={updateState.loading}
            className='p-3 rounded-lg px-6 cursor-pointer bg-purple-600 text-white hover:opacity-80 disabled:bg-purple-500 disabled:cursor-not-allowed'
            value={updateState.loading ? 'Updating...' : 'Update'}
          />
        </div>

        {updateState.error && (
          <p className='text-red-600'>{updateState.error}</p>
        )}
      </form>
    </div>
  )
}
export default EditProfile
