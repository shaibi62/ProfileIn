import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

import logo from '../../assets/logo-bg.png';
// import Footer from './Footer'; // Optional

const MainLayout = () => {
  return (
    <div className="main-layout pt-10">
      
      <main className="">
        
        
            <section className="text-gray-600 body-font ">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Create Your Professional Portfolio
                    <br class="hidden lg:inline-block"/> <h3 className='text-blue-600'>in Minutes</h3>
                    </h1>
                    <p className="mb-8 leading-relaxed">Empower your professional journey with a stunning portfolio website. No technical skills required - just your achievements and our templates.</p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                    </div>
                    </div>
                </div>
            </section>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Create Your Professional Portfolio
                    <br class="hidden lg:inline-block"/> <h3 className='text-blue-600'>in Minutes</h3>
                    </h1>
                    <p className="mb-8 leading-relaxed">Empower your professional journey with a stunning portfolio website. No technical skills required - just your achievements and our templates.</p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                    </div>
                    </div>
                </div>
            </section>


      </main>
      {/* <Footer /> */} {/* Optional Footer */}
    </div>
  );
};

export default MainLayout;