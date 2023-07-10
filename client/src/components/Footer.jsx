import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandFacebookFilled } from '@tabler/icons-react';
import { IconBrandTwitter } from '@tabler/icons-react';

const Footer = () => {
    const navigate = useNavigate()

    return (
        <>

            <div className='container p-[1rem] flex h-[2rem] mt-[8rem] justify-between -mb-[0.3rem] border-[0.2rem] border-purple-900 bg-violet-900'>

                <div className="flex gap-[5rem] items-center">
                    <button className='font-serif font-light text-[0.8rem] underline' onClick={() => { navigate('/contacts') }}>
                        Contacts
                    </button>
                    <button className='flex-1 font-serif font-light text-[0.8rem] underline' onClick={() => { navigate('/aboutus') }}>
                        About us
                    </button>
                    <button className='font-serif font-light text-[0.8rem] underline' onClick={() => { navigate('/faqs') }}>
                        FAQs
                    </button>
                    <button className='font-serif font-light text-[0.8rem] underline' onClick={() => { navigate('/support') }}>
                        Support
                    </button>
                </div>
                
                <div className="flex my-[-0.7rem] mr-[0.1rem] gap-[0.3rem]">
                    <a href="https://www.instagram.com/" target="_blank">
                    <IconBrandInstagram />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                    <IconBrandFacebookFilled />
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                    <IconBrandTwitter />
                    </a>
                </div>

            </div>


            <div className='mt-[0.8rem] mx-[1rem] text-[0.8rem] -mb-[3rem]'>© 2023 PF-Gaming Corporation. All rights reserved. Privacy Policy</div>
        </>
    )
}

export default Footer;