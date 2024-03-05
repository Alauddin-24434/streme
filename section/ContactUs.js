"use client"
import React, { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';


const ContactUs = () => {
    
    const inputStyle = {
        outline: 'none'
    }
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_4jsdyxi', 'template_rgc7gnr', form.current, {
            publicKey: 'wBlXZTkg4sginBjZe',
          })
          .then(
            () => {
              console.log('SUCCESS!');
              toast('mail send successfull.')
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };

    return (
        <div className='bg-[#101010]'>
            <div className='max-w-[1440px] px-3 md:px-10 mx-auto py-[50px] md:py-[150px]'>
                <div className="md:flex gap-2 lg:gap-8">
                    <div data-aos="fade-up" data-aos-duration="1000">
                        <p className="text-[#00B84B] text-[20px]">Your info</p>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl text-white pt-5 pb-11 md:max-w-[300px] lg:max-w-[450px] leading-snug">Get connected to your advertisement</h1>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" className="flex-auto">
                        <form ref={form} onSubmit={sendEmail} className="space-y-6 md:space-y-8" action="">
                            <div className="flex gap-3 md:gap-8">
                                <input style={inputStyle} type="text" placeholder="First name..." name='firstName' className="input rounded-full w-full  h-[55px] bg-[#1D1D1D] pl-5" />
                                <input style={inputStyle} type="text" placeholder="Last name..." name='lastName' className="input rounded-full w-full  h-[55px] bg-[#1D1D1D] pl-5" />
                            </div>
                            <div>
                                <input style={inputStyle} type="email" placeholder="email address..." name='email' className="input rounded-full w-full  h-[55px] bg-[#1D1D1D] pl-5" />
                            </div>
                            <div className="flex gap-3 md:gap-8">
                                <input style={inputStyle} type="number" placeholder="Phone number..." name='phoneNumber' className="input rounded-full w-full h-[55px] bg-[#1D1D1D] pl-5" />
                                <input style={inputStyle} type="text" placeholder="Movie name..." name='movieName' className="input rounded-full w-full h-[55px] bg-[#1D1D1D] pl-5" />
                            </div>
                            <div>
                                <input style={inputStyle} type="text" placeholder="Thambnail URL..." name='thambnail' className="input rounded-full w-full  h-[55px] bg-[#1D1D1D] pl-5" />
                            </div>
                            <input type='submit' value="send" className="bg-[#00B84B] w-full py-[18px] text-white rounded-full font-bold text-[16px]"></input>
                            <Toaster />
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-[#1D1D1D] h-3"></div>
        </div>
    );
};

export default ContactUs;