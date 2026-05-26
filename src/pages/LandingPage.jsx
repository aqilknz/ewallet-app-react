import React from "react";
import "../Global.css";
import HeaderLP from "../components/Landing/HeaderLP.jsx";
import CardPartners from "../components/Landing/CardPartners.jsx";
import AboutApp from "../components/Landing/AboutApp.jsx";
import SocialMedia from "../components/Landing/SocialMedia.jsx";
import FeatureItem from "../components/Landing/FeatureItem.jsx";
import CardCustomer from "../components/Landing/CardCustomer.jsx";

function LandingPage() {
  return (
    <>
      <HeaderLP />
      <div>
        <section className="font-monserrat min-h-screen max-w-screen sm:flex sm:min-h-screen">
          <div className="w-full bg-white sm:order-2 sm:flex sm:items-center sm:justify-center">
            <img
              src="/icons/right-lp.svg"
              alt="Landing Image"
              className="flex w-full flex-1 items-center justify-center object-contain"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-5 bg-white px-10 py-10 sm:order-1">
            <h1 className="align-left text-4xl font-medium md:text-5xl xl:text-7xl">
              Smart Way to Your Financial Business
            </h1>
            <p className="text-xl">
              We bring you a mobile app for banking problems that oftenly
              wasting much of your times.
            </p>
            <button className="bg-primary cursor-pointer rounded-lg px-5 py-2 text-white">
              Get Started
            </button>
            <p>Available on</p>
            <div className="flex items-center justify-start gap-5">
              <img
                src="/icons/gplay.svg"
                alt="Google Play"
                className="h-10 w-full"
              />
              <img
                src="/icons/appstore.svg"
                alt="App Store"
                className="h-10 w-full"
              />
            </div>
          </div>
        </section>
        <section className="bg-secondary flex flex-col items-center justify-between gap-10 py-10 sm:flex-row">
          <CardPartners partner="/icons/logopartner/Group 21.svg" />
          <CardPartners partner="/icons/logopartner/Group 22.svg" />
          <CardPartners partner="/icons/logopartner/Group 23.svg" />
          <CardPartners partner="/icons/logopartner/Group 16.svg" />
          <CardPartners partner="/icons/logopartner/Group 17.svg" />
          <CardPartners partner="/icons/logopartner/Group 18.svg" />
        </section>
        <section className="min-w-full bg-white px-10 py-30 md:flex md:flex-row">
          <div className="mb-10 flex flex-1 flex-col items-center justify-center gap-5">
            <h2 className="w-full text-center text-3xl font-semibold md:text-left md:text-4xl">
              About The Application
            </h2>
            <p className="w-full text-center md:text-left md:text-lg">
              We have some great features from the application and it’s totally
              free to use by all users around the world..
            </p>
          </div>
          <div className="flex flex-1 grow-2 flex-col gap-5 md:flex-row">
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
        <section className="relative mb-20 min-h-screen py-20">
          <div className="absolute inset-0 z-0 min-h-screen">
            <img
              src="/icons/bg-wave/Vector-up.svg"
              alt="wave top"
              className="top-0 left-0 h-[50%] w-full object-cover"
            />
            <img
              src="/icons/bg-wave/Vector-bottom.svg"
              alt="wave bottom"
              className="bottom-0 left-0 h-[50%] w-full object-cover"
            />
          </div>

          <div className="relative z-10 mx-auto my-20 flex max-w-7xl flex-col items-center gap-5 px-10 lg:flex-row">
            <div className="relative bottom-0 flex flex-1 justify-center lg:bottom-20">
              <img
                src="/icons/LP.svg"
                alt="App Preview"
                className="max-h-sm max-w-sm"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center py-2 text-white">
              <h3 className="mb-2 w-full text-center text-5xl font-bold md:text-5xl">
                All The Great Zwallet Features.
              </h3>
              <p className="mb-5 w-full text-lg font-light text-white">
                We have some great features from the application and it’s
                totally free to use by all users around the world.
              </p>

              <div className="mb-10 flex flex-col">
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
              <button className="text-primary w-full cursor-pointer rounded-xl bg-white px-12 py-4 text-lg font-bold transition-all hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>
        </section>
        <section className="bg-white px-10">
          <div className="flex flex-col gap-10 py-20">
            <h2 className="text-center text-4xl font-bold md:text-5xl">
              Here From Our Customer
            </h2>
            <p className="text-center text-lg md:text-xl">
              We always do our best for our customers to stay comfortable using
              the applications we provide
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        <footer className="bg-primary flex h-full w-full flex-col text-white">
          <div className="grid grid-cols-1 gap-10 px-10 py-16 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3 md:flex-1">
              <div className="flex items-center gap-2">
                <img src="/icons/logo.svg" className="h-10 w-10" />
                <span className="text-lg font-semibold">E-Wallet</span>
              </div>
              <p className="font-light">
                Clarity gives you the blocks and components you need to create a
                truly professional website.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-1">
              <h3 className="font-semibold">GET IN TOUCH</h3>
              <div className="flex gap-3">
                <img src="/icons/phone.svg" className="h-7 w-7" />
                <span>+62 5637 8882 9901</span>
              </div>
              <div className="flex gap-3">
                <img src="/icons/mail.svg" className="h-7 w-7" />
                <span>contact@zwallet.com</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:flex-1">
              <h3 className="font-semibold">SOCIAL MEDIA</h3>
              <div className="flex gap-4">
                <SocialMedia sosmed="/icons/sosmed/twitter.svg" alt="twitter" />
                <SocialMedia
                  sosmed="/icons/sosmed/facebook.svg"
                  alt="facebook"
                />
                <SocialMedia
                  sosmed="/icons/sosmed/instagram.svg"
                  alt="instagram"
                />
                <SocialMedia sosmed="/icons/sosmed/github.svg" alt="github" />
              </div>
            </div>
            <div className="flex max-w-sm flex-col gap-3 md:flex-1">
              <h3 className="font-semibold">NEWSLETTER</h3>
              <div className="relative flex items-center">
                <img
                  src="/icons/mail.svg"
                  className="absolute left-4 h-5 w-5 opacity-50"
                />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="autofill:text-fill-black w-full rounded-sm border border-gray-300 bg-transparent px-2 py-2 pl-10 autofill:shadow-[inset_0_0_0px_1000px_white] focus-within:border-white focus:outline-none"
                />
              </div>
              <button className="text-primary hover:bg-primary w-full cursor-pointer rounded-md bg-white py-2 text-lg font-medium hover:text-white hover:ring-2">
                Subscribe
              </button>
            </div>
          </div>
          <div className="mt-10 px-10">
            <div className="bg-secondary h-0.5 w-full px-10"></div>
            <p className="py-5 text-center">
              © Copyright 2022, All Rights Reserved by ClarityUI
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
