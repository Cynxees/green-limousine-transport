import React, { useState } from 'react';
import { Link, useLinkClickHandler } from 'react-router-dom';
import teslaImageS from '../assets/images/teslaModelS.png'
import teslaImage3 from '../assets/images/teslaModel3.png'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { FaCheck } from "react-icons/fa6";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import AddressInput from '../components/AddressInput';

const StepForm = () => {
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState("");
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

    const NextArrow = ({ onClick }) => (
    
        <SlArrowRight className="absolute block top-1/2 text-white z-20 right-5  md:right-40 cursor-pointer" size={20} onClick={onClick} />
  
    );
  
    const PrevArrow = ({ onClick }) => (
        <SlArrowLeft className="absolute block top-1/2 text-white z-20 left-5 md:left-40 cursor-pointer" size={20} onClick={onClick} />
    );


    const carouselSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <NextArrow onClick={undefined}  />,
        prevArrow: <PrevArrow onClick={undefined}  />
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

    const handleClickNavigate = (e) => {
    
        if(e.target.id == "nav-1"){
            setStep(1);
        }else if(e.target.id == "nav-2"){
            setStep(2);
        }else if(e.target.id == "nav-3"){
            setStep(3);
        }else if(e.target.id == "nav-4"){
            setStep(4);
        }
    
    }


    const handlePickupSelect = async (value: string) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        console.log(latLng);
    };

    const handlePickupChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            ['pickup']: value 
        }));
    };

    const handleDestinationSelect = async (value: string) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        console.log(latLng);
    };

    const handleDestinationChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            ['destination']: value 
        }));
    };

    const searchOptions = {
        location: new window.google.maps.LatLng(-33.8688, 151.2093), // Coordinates of Sydney
        radius: 20000, // 20 kilometers around the city 
        types: ['address']
      };
  
    const selectedTextClass = "text-green-100"
    const selectedIconClass = "border-green-200 border"
    
    const finishedTextClass = "text-green-300"
    const finishedIconClass = "bg-green-700 "

    const defaultTextClass = "text-gray-400"
    const defaultIconClass = "border-gray-400 border"

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-950 font-sans flex-col">
        
        <ol className="items-center w-full flex justify-center mb-10 text-start space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse font-[sans-serif]">
            <li className={`${(step > 1)? finishedTextClass : (step == 1)?  selectedTextClass : defaultTextClass } flex items-center space-x-2.5 rtl:space-x-reverse`}>
                <span className={`${(step > 1)? finishedIconClass : (step == 1)?  selectedIconClass : defaultIconClass } flex items-center justify-center w-8 h-8 rounded-full shrink-0 `}>
                    {(step > 1) ? <FaCheck id='nav-1' onClick={handleClickNavigate} className='text-white'></FaCheck> : 1}
                </span>
                <span>
                    <h3 className="font-medium leading-tight">User info</h3>
                    <p className="text-sm">Step details here</p>
                </span>
            </li>
            <li className={`${(step > 2)? finishedTextClass : (step == 2)?  selectedTextClass : defaultTextClass } flex items-center  space-x-2.5 rtl:space-x-reverse `}>
                <span className={`${(step > 2)? finishedIconClass : (step == 2)?  selectedIconClass : defaultIconClass } flex items-center justify-center w-8 h-8  rounded-full shrink-0 `}>
                {(step > 2) ? <FaCheck id='nav-2' onClick={handleClickNavigate} className='text-white'></FaCheck> : 2}
                </span>
                <span>
                    <h3 className="font-medium leading-tight">Company info</h3>
                    <p className="text-sm">Step details here</p>
                </span>
            </li>
            <li className={`${(step > 3)? finishedTextClass : (step == 3)?  selectedTextClass : defaultTextClass } flex items-center space-x-2.5 rtl:space-x-reverse `}>
                <span className={`${(step > 3)? finishedIconClass : (step == 3)?  selectedIconClass : defaultIconClass } flex items-center justify-center w-8 h-8  rounded-full shrink-0 `}>
                {(step > 3) ? <FaCheck id='nav-3' onClick={handleClickNavigate} className='text-white'></FaCheck> : 3}
                </span>
                <span>
                    <h3 className="font-medium leading-tight">Payment info</h3>
                    <p className="text-sm">Step details here</p>
                </span>
            </li>
            <li className={`${(step > 4)? finishedTextClass : (step == 4)?  selectedTextClass : defaultTextClass } flex items-center space-x-2.5 rtl:space-x-reverse `}>
                <span className={`${(step > 4)? finishedIconClass : (step == 4)?  selectedIconClass : defaultIconClass } flex items-center justify-center w-8 h-8 rounded-full shrink-0 `}>
                {(step > 4) ? <FaCheck id='nav-4' onClick={handleClickNavigate} className='text-white'></FaCheck> : 4}
                </span>
                <span>
                    <h3 className="font-medium leading-tight">Payment info</h3>
                    <p className="text-sm">Step details here</p>
                </span>
            </li>
        </ol>

        
        
        {step === 1 && (
          <div className="w-full flex items-center justify-center font-[sans-serif]">


          <div className="w-10/12 lg:w-5/12 rounded-lg bg-white shadow-xl py-10 px-5 flex flex-col items-start">

          <h2 className='font-vag text-3xl text-center justify-center w-full mb-5'>Booking Details</h2>

          <label className="block text-sm font-bold mb py-1 text-start" htmlFor="pickup">Pickup Address</label>
         <PlacesAutocomplete
            value={formData.pickup}
            onChange={handlePickupChange}
            onSelect={handlePickupSelect}
            searchOptions={searchOptions}

            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className='w-full text-start'>
                <input
                    {...getInputProps({
                    placeholder: 'Enter Full Address',
                    className: 'location-search-input bg-white shadow appearance-none justify-start self-center border rounded mb-5 px-3 py-2 w-full text-gray-700',
                    })}
                />
                <div className="autocomplete-dropdown-container absolute lg:w-[39vw] w-[80vw]">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {


                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                        <div
                        {...getSuggestionItemProps(suggestion, {
                            className: suggestion.active ? 'suggestion-item--active w-full border' : 'suggestion-item w-full',
                            style,
                        })}
                        className=''
                        >
                        <span>{suggestion.description}</span>
                        <div className='w-full bg-gray-200 h-0.5'>
                            
                        </div>
                        
                        </div>
                    );
                    })}
                </div>
                </div>
            )}
        </PlacesAutocomplete>
          <label className="block text-sm font-bold mb py-1 text-start" htmlFor="destination">Destination Address</label>
          <PlacesAutocomplete
            value={formData.destination}
            onChange={handleDestinationChange}
            onSelect={handleDestinationSelect}
            searchOptions={searchOptions}

            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className='w-full text-start'>
                <input
                    {...getInputProps({
                    placeholder: 'Enter Full Address',
                    className: 'location-search-input bg-white shadow appearance-none justify-start self-center border rounded mb-5 px-3 py-2 w-full text-gray-700',
                    })}
                />
                <div className="autocomplete-dropdown-container absolute lg:w-[39vw] w-[80vw]">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {


                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                        <div
                        {...getSuggestionItemProps(suggestion, {
                            className: suggestion.active ? 'suggestion-item--active w-full border' : 'suggestion-item w-full',
                            style,
                        })}
                        className=''
                        >
                        <span>{suggestion.description}</span>
                        <div className='w-full bg-gray-200 h-0.5'>
                            
                        </div>
                        
                        </div>
                    );
                    })}
                </div>
                </div>
            )}
        </PlacesAutocomplete>
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
            
        <div className="w-full font-[sans-serif] items-center flex flex-col">

        {step === 2 && (
            <div className="w-full flex flex-col align-middle items-center my-auto font-vag ">
            <Slider {...carouselSettings}  className="w-full" beforeChange={(currentSlide: number, nextSlide: number) => setCurrentSlideNumber(nextSlide)}>
                
                
                {cars.map(car => {

                    return(
                        <div className='items-center flex flex-col justify-center content-center text-gray-200' key={car.name}>
                    
                            <h1>{car.name}</h1>
                            <h2>From: ${car.price}</h2>
                            <img src={car.image} alt="" className='mx-auto my-10'/>

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
          <div className="w-full flex items-center justify-center font-[sans-serif]">


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
          <div className="w-full flex items-center justify-center font-[sans-serif]">


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
