
import { Link } from 'react-router-dom';
import video from '../assets/videos/teslaCinematic.mp4'

export default function LandingPage() {
    return (

        <header className="relative flex items-center justify-center h-full w-full overflow-hidden">
            <div className="relative z-30">
                
                <h1 className="inline bg-gradient-to-br from-green-300 to-green-500 text-transparent bg-clip-text text-5xl">GREEN </h1>
                <h1 className="text-3xl text-white md:text-4xl">LIMOUSINE TRANSPORT</h1>
    
    
                <Link to='/booking'>
                <button type="button" className="hover:scale-125  transform transition duration-500 text-white bg-gradient-to-br from-green-700 to-green-800 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 w-2/3 self-center text-1xl rounded-xl  px-5 my-10 py-2.5 text-center me-2 mb-2">BOOK NOW</button>
                </Link>
            </div>
            <video
                autoPlay
                loop
                muted
                className="absolute z-10 min-w-full min-h-full max-w-none max-h-none brightness-50 object-fit"
            >
                <source
                src={video}
                type="video/mp4"
                className=''
                />
                Your browser does not support the video tag.
            </video>

            

        </header>


    )
}