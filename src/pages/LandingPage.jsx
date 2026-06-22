import React, { useState, useEffect } from "react";
import "../Global.css";
import HeaderLP from "../components/Landing/HeaderLP.jsx";
import CardPartners from "../components/Landing/CardPartners.jsx";
import AboutApp from "../components/Landing/AboutApp.jsx";
import SocialMedia from "../components/Landing/SocialMedia.jsx";
import FeatureItem from "../components/Landing/FeatureItem.jsx";
import CardCustomer from "../components/Landing/CardCustomer.jsx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const customers = [
  { id: 1, name: "Sherina Claw", review: "Best app ever used in my life!", path: "/images/Customer-1.svg" },
  { id: 2, name: "James Bond", review: "Manage financial needs easily. 100% free!", path: "/images/Customer-2.svg" },
  { id: 3, name: "Ujang Kayu", review: "Not going to move to another app. Thanks!", path: "/images/Customer-3.svg" },
  { id: 4, name: "Rina Nose", review: "Sangat membantu buat bayar tagihan bulanan.", path: "/images/1.svg" },
  { id: 5, name: "Budi Doremi", review: "User interfacenya keren dan sangat enteng.", path: "/images/1-2.svg" },
  { id: 6, name: "Siti Badriah", review: "Top up saldo instan tanpa hambatan sama sekali.", path: "/images/1-3.svg" },
  { id: 7, name: "Asep Knalpot", review: "Transfer ke sesama pengguna gratis ongkir eh admin!", path: "/images/Customer-2.svg" },
  { id: 8, name: "Lesti Kejora", review: "Keamanannya luar biasa, saya merasa tenang.", path: "/images/3.svg" },
];
function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (customers.length - 2));
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const handleGetStarted = () => {
    console.log("Tombol diklik! Auth status:", isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth/register");
    }
  };
  return (
    <>
      <HeaderLP />
      <div className="overflow">
        <section className="font-monserrat min-h-screen max-w-screen sm:flex sm:min-h-screen">
          <div className="w-full bg-white sm:order-2 sm:flex sm:items-center sm:justify-center" data-aos="fade-left">
            <img
              src="/icons/right-lp.svg"
              alt="Landing Image"
              className="flex w-full flex-1 items-center justify-center object-contain"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-5 bg-white px-10 py-10 sm:order-1" data-aos="fade-right">
            <h1 className="align-left text-4xl font-medium md:text-5xl xl:text-7xl leading-tight">
              Smart Way to Your Financial Business
            </h1>
            <p className="text-xl">
              We bring you a mobile app for banking problems that oftenly
              wasting much of your times.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-primary hover:scale-105 transition-transform cursor-pointer rounded-lg px-8 py-3 text-white font-bold shadow-lg"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started"}
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
              <button
                onClick={handleGetStarted}
                className="bg-white hover:scale-105 transition-transform cursor-pointer rounded-lg px-5 py-2 font-bold text-primary"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </button>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 px-10 py-20">
          <div className="flex flex-col gap-10">
            <div className="text-center" data-aos="zoom-in">
              <h2 className="text-4xl font-bold md:text-5xl mb-4">Here From Our Customer</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                We always do our best for our customers to stay comfortable using our applications.
              </p>
            </div>
            <div className="relative overflow-hidden py-5">
              <div 
                className="flex transition-transform duration-700 ease-in-out gap-6"
                style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
              >
                {customers.map((cust) => (
                  <div key={cust.id} className="min-w-[100%] md:min-w-[48%] lg:min-w-[31%] flex-shrink-0">
                    <CardCustomer
                      path={cust.path}
                      name={cust.name}
                      rating="/icons/rating.svg"
                      review={cust.review}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-2 w-2 rounded-full ${currentIndex === i ? 'bg-primary' : 'bg-gray-300'}`}></div>
                ))}
            </div>
          </div>
        </section>
        <footer className="bg-primary flex h-full w-full flex-col text-white" data-aos="fade-up">
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
