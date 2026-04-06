import React from 'react'
import '../../Global.css'
import HeaderLP from '../components/Landing/HeaderLP.jsx'
import CardPartners from '../components/Landing/CardPartners.jsx'
import AboutApp from '../components/Landing/AboutApp.jsx'
import SocialMedia from '../components/Landing/SocialMedia.jsx'
import FeatureItem from '../components/Landing/FeatureItem.jsx'
import CardCustomer from '../components/Landing/CardCustomer.jsx'

function LandingPage() {
    return (
        <>
            <HeaderLP />
            <div>
                <section className='min-h-screen max-w-screen font-monserrat  sm:flex sm:min-h-screen'>
                    <div className='bg-white w-full sm:flex sm:justify-center sm:items-center sm:order-2'>
                        <img src="/icons/right-lp.svg" alt="Landing Image" className=' flex justify-center items-center flex-1 w-full object-contain' />
                    </div>
                    <div className='bg-white w-full px-10 py-10 flex flex-col justify-center items-start gap-5 sm:order-1 '>
                        <h1 className='text-4xl font-medium align-left md:text-5xl xl:text-7xl'>Smart Way to Your Financial Business</h1>
                        <p className='text-xl'>We bring you a mobile app for banking problems that
                            oftenly wasting much of your times.</p>
                        <button className='bg-primary rounded-lg text-white px-5 py-2 cursor-pointer'>Get Started</button>
                        <p>Available on</p>
                        <div className='flex justify-start items-center gap-5'>
                            <img src="/icons/gplay.svg" alt="Google Play" className='w-full h-10' />
                            <img src="/icons/appstore.svg" alt="App Store" className='w-full h-10' />
                        </div>
                    </div>
                </section>
                <section className='bg-secondary flex flex-col justify-between items-center gap-10 py-10 sm:flex-row'>
                    <CardPartners partner="/icons/logopartner/Group 21.svg" />
                    <CardPartners partner="/icons/logopartner/Group 22.svg" />
                    <CardPartners partner="/icons/logopartner/Group 23.svg" />
                    <CardPartners partner="/icons/logopartner/Group 16.svg" />
                    <CardPartners partner="/icons/logopartner/Group 17.svg" />
                    <CardPartners partner="/icons/logopartner/Group 18.svg" />
                </section>
                <section className='bg-white py-30 px-10 min-w-screen md:flex md:flex-row'>
                    <div className='flex flex-col justify-center items-center gap-5 flex-1 mb-10'>
                        <h2 className='text-3xl w-full text-center font-semibold md:text-left md:text-4xl'>About The Application</h2>
                        <p className='w-full text-center md:text-left md:text-lg'>We have some great features from the application and it’s totally free to use by all users around the world..</p>
                    </div>
                    <div className='flex flex-1 grow-2 gap-5 flex-col md:flex-row'>
                        <AboutApp
                            image="/icons/Headphones.svg"
                            name="24/7 Support"
                            description="We have 24/7 contact support so you can contact us whenever you want and we will respond it."
                        />
                        <AboutApp
                            image="/icons/Shield Done.svg"
                            name="Data Privacy"
                            description="We make sure your data is safe in our database and we will encrypt any data you submitted to us."
                        />
                        <AboutApp
                            image="/icons/Download.svg"
                            name="Easy Download"
                            description="Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store."
                        />
                    </div>
                </section>
                <section className='relative min-h-screen py-20 mb-20'>
                    <div className='absolute min-h-screen inset-0 z-0'>
                        <img src='/icons/bg-wave/Vector-up.svg' alt='wave top' className=' top-0 left-0 w-full h-[50%] object-cover' />
                        <img src='/icons/bg-wave/Vector-bottom.svg' alt='wave bottom' className=' bottom-0 left-0 w-full h-[50%] object-cover' />
                    </div>

                    <div className='relative z-10 max-w-7xl my-20 px-10 mx-auto flex flex-col lg:flex-row items-center gap-5'>
                        <div className='flex-1 flex justify-center bottom-0 lg:bottom-20 relative'>
                            <img src='/icons/LP.svg' alt="App Preview" className='max-w-sm max-h-sm' />
                        </div>
                        <div className="flex-1 flex flex-col text-white items-center justify-center py-2">
                            <h3 className="text-5xl md:text-5xl font-bold mb-2 w-full text-center">
                                All The Great Zwallet Features.
                            </h3>
                            <p className="text-lg font-light text-white mb-5 w-full">
                                We have some great features from the application and it’s totally free to use by all users around the world.
                            </p>

                            <div className="flex flex-col mb-10">
                                <FeatureItem
                                    icon="/icons/featureicons/Money Bill.svg"
                                    title="Small Fee"
                                    description="We only charge 5% of every success transaction done in Zwallet app."
                                />
                                <FeatureItem
                                    icon="/icons/featureicons/Data Secured.svg"
                                    title="Data Secured"
                                    description="All your data is secured properly in our system and it’s encrypted."
                                />
                                <FeatureItem
                                    icon="/icons/featureicons/User Friendly.svg"
                                    title="User Friendly"
                                    description="Zwallet come up with modern and sleek design and not complicated."
                                />
                            </div>
                            <button className="bg-white text-primary w-full px-12 py-4 rounded-xl font-bold text-lg hover:shadow-xl  cursor-pointer transition-all">
                                Get Started
                            </button>
                        </div>
                    </div>
                </section>
                <section className='px-10 bg-white'>
                    <div className='py-20 flex flex-col gap-10'>
                        <h2 className='text-4xl font-bold text-center md:text-5xl'>Here From Our Customer</h2>
                        <p className='text-center text-lg md:text-xl'>We always do our best for our customers to stay comfortable using the applications we provide</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            <CardCustomer
                                path="/images/Customer-1.svg"
                                name="Sherina Claw"
                                rating="/icons/rating.svg"
                                review="“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”"
                            />
                            <CardCustomer
                                path="/images/Customer-2.svg"
                                name="James Bond"
                                rating="/icons/rating.svg"
                                review="“I use Zwallet to manage all financial needs. It’s super easy to use and it’s 100% free app”"
                            />
                            <CardCustomer
                                path="/images/Customer-3.svg"
                                name="Ujang Kayu"
                                rating="/icons/rating.svg"
                                review="“Since I’m using this app, I’m not going to move to another similar app. Thank you Zwallet!”"
                            />
                        </div>
                    </div>
                </section>
                <footer className='bg-primary w-full h-full text-white flex flex-col'>
                    <div className='px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                        <div className='flex flex-col gap-3 md:flex-1'>
                            <div className='flex items-center gap-2'>
                                <img src='/icons/logo.svg' className='w-10 h-10' />
                                <span className='text-lg font-semibold'>E-Wallet</span>
                            </div>
                            <p className='font-light'>Clarity gives you the blocks and components you need to create a truly professional website.</p>
                        </div>
                        <div className='flex flex-col gap-3 md:flex-1'>
                            <h3 className='font-semibold'>GET IN TOUCH</h3>
                            <div className=' flex gap-3'>
                                <img src='/icons/phone.svg' className='h-7 w-7' />
                                <span>+62 5637 8882 9901</span>
                            </div>
                            <div className=' flex gap-3'>
                                <img src='/icons/mail.svg' className='h-7 w-7' />
                                <span>contact@zwallet.com</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 md:flex-1'>
                            <h3 className='font-semibold'>SOCIAL MEDIA</h3>
                            <div className='flex gap-4'>
                                <SocialMedia
                                    sosmed="/icons/sosmed/twitter.svg"
                                    alt="twitter"
                                />
                                <SocialMedia
                                    sosmed="/icons/sosmed/facebook.svg"
                                    alt="facebook"
                                />
                                <SocialMedia
                                    sosmed="/icons/sosmed/instagram.svg"
                                    alt="instagram"
                                />
                                <SocialMedia
                                    sosmed="/icons/sosmed/github.svg"
                                    alt="github"
                                />
                            </div>
                        </div>
                        <div className='max-w-sm flex flex-col gap-3 md:flex-1'>
                            <h3 className='font-semibold'>NEWSLETTER</h3>
                            <div className='relative flex items-center'>
                                <img src='/icons/mail.svg' className='absolute left-4 w-5 h-5 opacity-50' />
                                <input
                                    type='email'
                                    placeholder="Enter Your Email"
                                    className='border border-gray-300 rounded-sm  px-2 py-2 w-full focus:outline-none focus-within:border-white pl-10 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-fill-black'
                                />
                            </div>
                            <button className='bg-white text-primary w-full font-medium py-2 text-lg rounded-md hover:ring-2 hover:bg-primary hover:text-white cursor-pointer'>Subscribe</button>
                        </div>
                    </div>
                    <div className='px-10 mt-10'>
                        <div className='h-0.5 w-full bg-secondary px-10'></div>
                        <p className='text-center py-5'>© Copyright 2022, All Rights Reserved by ClarityUI</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default LandingPage