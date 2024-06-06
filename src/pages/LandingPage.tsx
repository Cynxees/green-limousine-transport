
import { Link } from 'react-router-dom';
import video from '../assets/videos/teslaCinematic.mp4'

export default function LandingPage() {
    return (

        <div>
        <header className="relative flex justify-center h-screen w-full ">
            <div className="relative z-30 flex flex-col my-auto">
                
                <div className='relative'>

                <h1 className="inline bg-gradient-to-br from-red-400 to-red-500 text-transparent bg-clip-text text-5xl">BEVERLY HILLS </h1>
                <h1 className="text-3xl text-white md:text-4xl mb-10">LIMOUSINE TRANSPORT</h1>

                <div className="font-extrabold text-3xl  overflow-hidden text-red-100 motion-safe:animate-pulse ">
                <span className=" inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] overflow-hidden">
                <ul className="block  text-center  [&_li]:block text-2xl md:text-3xl animate-text-slide">
                    <li className=''>30 Years of Experience</li>
                    <li>Competitive Service</li>
                    <li>Eco friendly vehicles</li>
                    <li>Clean and Hygienic</li>
                    <li>Accepts credit cards payments</li>
                    <li aria-hidden="true">30 Years of Experience</li>
                </ul>
                </span>
                </div>


                </div>

    
    
                <Link to='/booking'>
                <button type="button" className="hover:scale-125 transform transition duration-500 text-white bg-gradient-to-br shadow-lg shadow-black from-red-600 to-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 w-2/3 self-center text-1xl rounded-md  px-5 my-10 py-2.5 text-center me-2 mb-2">BOOK NOW</button>
                </Link>
                


            </div>
            
            <div className='absolute -z-10 w-screen h-screen'>


            <video
                autoPlay
                loop
                muted
                className="absolute -z-10 object-cover min-h-full min-w-full bg-black brightness-50 "
                src= {video}
                
            />

            </div>
            

        </header>

        </div>


    )
}