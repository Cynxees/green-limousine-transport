import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import teslaImageS from '../assets/images/teslaModelS.png'
import teslaImage3 from '../assets/images/teslaModel3.png'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    carType: '',
    baggage: '',
    passengers: '',
    price: 0
  });

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  const [currentSlideNumber, setCurrentSlideNumber] = useState(0);

  const cars = [
    { name: 'Tesla Model S', image: teslaImageS, price: 100 },
    { name: 'Tesla Model 3', image: teslaImage3, price: 80 },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    console.log(formData)
  };




  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(formData);
    setStep(4);

  };

  const handleChange = (e) => {
    
    const { name, value } = e.target; 
    
    console.log("handlechange", name, value, e)
    
    setFormData(prev => ({
      ...prev,
      [name]: value 
    }));
  };

  const handleChooseCar = (e) => {
    
    var chosenCar = cars[currentSlideNumber]

    setFormData(prev => ({
        ...prev,
        ["carType"]: chosenCar.name,
        ["price"]: chosenCar.price
    }));
    setStep(3);

    
  };

  const handleSubmitStep1 = (e) => {

    e.preventDefault()
    setStep(2);

  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-950 font-sans flex-col">
        
        
        
        {step === 1 && (
          <div className="w-full h-full flex items-center justify-center font-[sans-serif]">


          <div className="w-10/12 md:w-5/12 rounded-lg bg-white shadow-xl py-10 px-5 flex flex-col items-start">

          <h2 className='font-vag text-3xl text-center justify-center w-full mb-5'>Booking Details</h2>

          <label className="block text-sm font-bold mb py-1 text-start" htmlFor="pickup">Pickup Address</label>
          <input className="bg-white shadow appearance-none justify-start self-center border rounded mb-5 px-3 py-2 w-full text-gray-700" id="pickup" name="pickup" type="text" placeholder="Enter Full Address" value={formData.pickup} onChange={handleChange} />
          
          <label className="block text-sm font-bold mb py-1 text-start" htmlFor="destination">Destination Address</label>
          <input className="bg-white shadow appearance-none justify-start self-center border rounded mb-5 px-3 py-2 w-full text-gray-700" id="destination" name="destination" type="text" placeholder="Enter Full Address" value={formData.destination} onChange={handleChange} />
          
          <div className="w-full flex">

              <div className="w-7/12">
                  
                  <label className="block text-sm font-bold mb py-1 text-start" htmlFor="destination">Date</label>
                  <input className="bg-white shadow appearance-none justify-start self-center border rounded px-3 py-2 w-full text-gray-700" id="date" type="date" name="date" value={formData.date} onChange={handleChange} />
      
              </div>
              
              <div className="w-5/12">
                  
                  <label className="block text-sm font-bold mb py-1 text-start" htmlFor="destination">Time</label>
                  <input 
                  className="shadow appearance-none justify-start self-center border rounded ps-3 py-2 w-full bg-green-700 text-white" id="time" name="time" 
                  type="time" value={formData.time} onChange={handleChange}/>
      
              </div>

          </div>

            <button onClick={handleSubmitStep1} type="submit" className="w-full transform transition duration-500 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 self-center text-1xl rounded-xl  px-5 my-10 py-2.5 text-center me-2 mb-2">Get Quote </button>

          </div>
          
        </div>
        )}
        {step === 2 && (
            
        <div className="w-full h-full  font-[sans-serif] items-center flex flex-col">

        {step === 2 && (
            <div className="w-full flex flex-col align-middle items-center my-auto font-vag ">
            <Slider {...carouselSettings}  className="w-full" beforeChange={(currentSlide: number, nextSlide: number) => setCurrentSlideNumber(nextSlide)}>
                
                
                {cars.map(car => {

                    return(
                        <div className='items-center flex flex-col justify-center content-center text-gray-200'>
                    
                            <h1>{car.name}</h1>
                            <img src={car.image} alt="" className='mx-auto my-10'/>
                            <h2>From: ${car.price}</h2>

                        </div>
                    )}

                )}

            </Slider>
            <button className="bg-green-600 hover:bg-green-800 text-white px-4 mt-10 rounded" onClick={handleChooseCar}>Choose Car</button>
            </div>
        )}
            
        </div>
            
        )}
        {step === 3 && (
          <div className="w-full h-full flex items-center justify-center font-[sans-serif]">


          <div className="w-10/12 md:w-5/12 rounded-lg bg-white shadow-xl py-10 px-5 flex flex-col items-start">
            
          <h2 className='font-vag text-3xl text-center justify-center w-full mb-5'>Passenger Details</h2>
            <label className="block text-sm font-bold mb py-1 text-start" htmlFor="baggage">Name</label>
            <input className="bg-white shadow appearance-none border rounded mb-5 px-3 py-2 w-full text-gray-700" id="baggage" type="text" placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} />

            
            <label className="block text-sm font-bold mb py-1 text-start" htmlFor="baggage">Baggage Count</label>
            <input className="bg-white shadow appearance-none border rounded mb-5 px-3 py-2 w-full text-gray-700" id="baggage" type="number" placeholder="Number of Bags" name="baggage" value={formData.baggage} onChange={handleChange} />

            <label className="block text-sm font-bold mb py-1 text-start" htmlFor="passengers">Number of Passengers</label>
            <input className="bg-white shadow appearance-none border rounded px-3 py-2 w-full text-gray-700" id="passengers" type="number" placeholder="Number of Passengers" name="passengers" value={formData.passengers} onChange={handleChange} />
            
            <button onClick={handleSubmit} type="submit" className="w-full transform transition duration-500 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 self-center text-1xl rounded-xl  px-5 my-10 py-2.5 text-center me-2 mb-2">Review Booking Details</button>

          
          </div>
          </div>
        )}

        {step === 4 && (
          <div className="w-full h-full flex items-center justify-center font-[sans-serif]">


          <div className="w-10/12 md:w-5/12 rounded-lg bg-white shadow-xl py-10 px-5 flex flex-col items-start">
            
            
          <h2 className='font-vag text-3xl text-center justify-center w-full mb-5'>Review Booking Details</h2>
            
            <h2 className='text-lg'>Name</h2>
            <h2 className='text-xl font-vag'>{formData.name}</h2>

            
            <div className='text-left my-5'>

            <h2 className='text-lg'>Pickup at</h2>
            <h2 className='text-xl font-vag'>{formData.pickup}</h2>
            <h2 className='text-lg'>to</h2>
            <h2 className='text-xl font-vag'>{formData.destination}</h2>
            <h2 className='text-lg'>on</h2>
            <h2 className='text-xl font-vag'>{formData.date}, {formData.time}</h2>
            <h2 className='text-lg'>with</h2>
            <h2 className='text-xl font-vag'>{formData.passengers} Passengers</h2>
            <h2 className='text-lg'>carrying</h2>
            <h2 className='text-xl font-vag'>{formData.baggage} Baggages</h2>
            </div>

            <div className='text-left'>

            <h2 className='text-lg'>Car</h2>
            <h2 className='text-xl font-vag'>{formData.carType}</h2>
            <h2 className='text-lg'>Price</h2>
            <h2 className='text-xl font-vag'>${formData.price}</h2>

            </div>
            
            <button onClick={handleSubmit} type="submit" className="w-full transform transition duration-500 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 self-center text-1xl rounded-xl  px-5 my-10 py-2.5 text-center me-2 mb-2 font-vag">Book Now!!</button>

          
        
            
          
          </div>
          </div>
        )}
        {/* <div className="flex space-x-4 mt-4">
          {step > 1 && <button className="btn bg-gray-500 text-white px-4 py-2 rounded" onClick={handleBack}>Back</button>}
          {step < 4 && <button className="btn bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>}
          {step === 4 && <button className="btn bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>}
        </div> */}
    </div>
  );
};

export default StepForm;
