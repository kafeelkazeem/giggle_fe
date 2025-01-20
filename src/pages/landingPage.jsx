import React from 'react'
import { ReactComponent as LandingImg } from '../assets/svg/landingImg.svg'
import { darkBrown } from '../util/colors'
import ApBar from '../components/appBar/appBar'

const LandingPage = () => {
  return (
    <div>
      <ApBar />
      <div className='w-full h-fit flex flex-col lg:flex-row mt-20'>
        <div className='basis-1/2 w-50 h-50 p-10'>
            <LandingImg />
        </div>
        <div className='basis-1/2 flex flex-col items-center justify-center gap-4 p-4'>
            <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">
                Connect Customers and Technicians <br /> Seamlessly
            </h1>
            <p className="mt-6 text-base text-black sm:text-xl">
                 Whether you're looking for skilled professionals or want to grow your technician business, our platform connects you to the right people, right when you need them.
            </p>
            <a
                href="#"
                className={`inline-flex items-center px-6 py-5 text-base font-semibold text-black transition-all duration-200 bg-[#f1c74f] mt-9 hover:bg-green-400 focus:bg-green-400`}
                role="button"
            >
                Get started for free
            </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
