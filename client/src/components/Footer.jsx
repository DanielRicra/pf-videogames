import { Link } from 'react-router-dom'
import {
  IconBrandInstagram,
  IconBrandFacebookFilled,
  IconBrandTwitter,
} from '@tabler/icons-react'

const Footer = () => {
  return (
    <>
      <div className='flex justify-between w-full border-[0.2rem] px-12 py-3 border-purple-900 bg-violet-900'>
        <div className='flex gap-[5rem] items-center'>
          <Link
            className='font-serif font-light text-sm hover:underline'
            to='/contacts'
          >
            Contacts
          </Link>
          <Link
            className='flex-1 font-serif font-light text-sm hover:underline'
            to='/about'
          >
            About us
          </Link>
          <Link
            className='font-serif font-light text-sm hover:underline'
            to='/faqs'
          >
            FAQs
          </Link>
          <Link
            className='font-serif font-light text-sm hover:underline'
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

      <div className='text-sm my-3 ml-12'>
        © 2023 PF-Gaming Corporation. All rights reserved. Privacy Policy
      </div>
    </>
  )
}

export default Footer
