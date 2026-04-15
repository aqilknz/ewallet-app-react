import React from 'react'
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar'
import InputForm from '../components/Auth/InputForm'
import ButtonSubmit from '../components/Auth/ButtonSubmit'

function ChangePassword() {
  return (
    <>
      <div className='flex flex-col min-h-full bg-white'>
        <Header />
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar />
          <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
            <div className='max-w-6xl mx-auto'>

              {/* Title */}
              <div className="flex items-center gap-3 mb-6">
                <img src="/icons/Profile/User-blue.svg" alt="Profile" className="w-5" />
                <h2 className="text-lg font-semibold">Profile</h2>
              </div>

              {/* Card */}
              <section className="border border-gray-300 rounded-lg p-6 w-full">
                <h3 className='font-semibold text-lg text-gray-900 mb-3 block'>
                  Change Password
                </h3>
                <form className='flex flex-col gap-4'
                // onSubmit={handleChangePassword}
                >
                  <div className='flex flex-col gap-4'>
                    <InputForm text="Existing Password" type="password" placeholder="Enter your existing password" name="password" path="/icons/Password.svg" />
                    <InputForm text="New Password" type="password" placeholder="Enter your new password" name="password" path="/icons/Password.svg" />
                    <InputForm text="Confirm New Password" type="password" placeholder="Re-Type your new password" name="confirmPassword" path="/icons/Password.svg" />
                  </div>
                  {/* <div className='w-full h-2'>
                  {error && (
                    <p className='w-full text-red-500 font-medium text-sm'>{error}</p>
                  )}
                </div> */}
                  <ButtonSubmit label="Submit" />
                </form>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default ChangePassword