
import PropTypes from "prop-types";

export default function HomePage()
{

    return(
        <>
        <div>
            <section className="relative overflow-hidden mt-24">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-gray-900 mb-6">
                   Create Your Professional Portfolio
                    <br />
                     <span className="text-indigo-600">in Minutes</span>
                   </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Empower your professional journey with a stunning portfolio
                    website. No technical skills required - just your achievements and
                    our templates.
                  </p>
                  <button className="bg-[var(--clr-secondary)] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
                    Get Started Free
                   </button>
                </div>
              </div>
            </section>



         </div>
        
        </>
    );
}

