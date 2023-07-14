import { Link } from 'react-router-dom'
import {
  IconBrandInstagram,
  IconBrandFacebookFilled,
  IconBrandTwitter,
} from '@tabler/icons-react'

const Footer = () => {
  return (
    <>
      <div className='flex justify-between w-full px-6 py-2 bg-black bg-opacity-40'>
        <div className='flex gap-[5rem] items-center'>
          <Link
            className='font-serif font-light text-[0.8rem] hover:underline'
            to='/contacts'
          >
            Contacts
          </Link>
          <Link
            className='flex-1 font-serif font-light text-[0.8rem] hover:underline'
            to='/about'
          >
            About us
          </Link>
          <Link
            className='font-serif font-light text-[0.8rem] hover:underline'
            to='/faqs'
          >
            FAQs
          </Link>
          <Link
            className='font-serif font-light text-[0.8rem] hover:underline'
            to='/support'
          >
            Support
          </Link>
        </div>

        <div className='flex gap-2'>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer'
            title='Instagram'
          >
            <IconBrandInstagram className='w-6 h-6 hover:opacity-80' />
          </a>
          <a
            href='https://www.facebook.com/'
            target='_blank'
            rel='noreferrer'
            title='Facebook'
          >
            <IconBrandFacebookFilled className='w-6 h-6 hover:opacity-80' />
          </a>
          <a
            href='https://twitter.com/'
            target='_blank'
            rel='noreferrer'
            title='Twitter'
          >
            <IconBrandTwitter className='w-6 h-6 hover:opacity-80' />
          </a>
        </div>
      </div>

      <div className='text-[0.7rem] my-1 ml-[0.3rem]'>
        © 2023 PF-Gaming Corporation. All rights reserved. Privacy Policy
      </div>
    </>
  )
}

export default Footer
