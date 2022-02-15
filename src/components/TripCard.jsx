import React, { useEffect, useRef } from 'react';
import { BsClock, BsFillCalendar3WeekFill } from 'react-icons/bs';
import { ImSpoonKnife } from 'react-icons/im';
import { MdLocalHotel } from 'react-icons/md';
import { AiFillCar } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';

function TripCard({ trip }) {
  const card = useRef();
  const cardBg = useRef();
  const cardBgImage = useRef();
  useEffect(() => {
    /////////////////////// Card Animation /////////////////////////////
    let data = {
      width: card.current.offsetWidth,
      height: card.current.offsetHeight,
      mouseX: 0,
      mouseY: 0,
      mouseLeaveDelay: null,
    };

    const mousePX = () => {
      return data.mouseX / data.width;
    };
    const mousePY = () => {
      return data.mouseY / data.height;
    };
    const cardStyle = () => {
      const rX = mousePX() * 20;
      const rY = mousePY() * -20;
      return `rotateY(${rX}deg) rotateX(${rY}deg)`;
    };
    const cardBgTransform = () => {
      const tX = mousePX() * -20;
      const tY = mousePY() * -20;
      return `translateX(${tX}px) translateY(${tY}px)`;
    };

    card.current.addEventListener('mouseenter', function () {
      cardBgImage.current.classList.add('scale-110');
    });

    card.current.addEventListener('mousemove', function (e) {
      data.mouseX = e.pageX - card.current.offsetLeft - data.width / 2;
      data.mouseY = e.pageY - card.current.offsetTop - data.height / 2;

      card.current.setAttribute('style', `transform: ${cardStyle()};`);
      cardBg.current.setAttribute('style', `transform: ${cardBgTransform()};`);
    });

    card.current.addEventListener('mouseleave', function () {
      cardBgImage.current.classList.remove('scale-110');
      cardBg.current.setAttribute('style', `transform: translate(0,0);`);
      card.current.setAttribute('style', `transform: rotate(0);`);
    });

    ///////////////////////////////////////////////////////////////////////
  }, []);

  ////////////// Render Card Dates /////////////////////
  const renderEventDates = trip.eventdates.map((event, index) => {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    let current_datetime = new Date(event.startdate);
    let formatted_date =
      current_datetime.getDate() + '-' + months[current_datetime.getMonth()];

    return (
      <>
        {trip.eventdates.length - 1 === index
          ? `${formatted_date}`
          : `${formatted_date}, `}
      </>
    );
  });
  //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      ref={card}
      className={`lg:max-w-[30%] bg-black/10 lg:basis-[30%] md:basis-[45%] md:max-w-[45%] basis-[100%] max-w-[100%] lg:h-[75vh] md:h-[50vh] h-[80vh] rounded-lg relative p-1 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300`}
    >
      <div className='w-full h-full border rounded-lg p-4'>
        <div className='flex w-full h-full flex-col justify-between relative'>
          <div className='flex flex-col items-start gap-2'>
            <span className='inline-flex items-center gap-1 bg-blue-600 px-2 rounded-sm text-white font-semibold'>
              <BsClock /> {trip.numofdays} days
            </span>
            <span className='bg-white rounded-sm px-2 backdrop-blur-sm text-blue-700 font-semibold'>
              &#x20b9;
              <span className='text-sm line-through text-blue-500 mx-1'>
                {trip.price}
              </span>
              {trip.offer_price}
            </span>
          </div>
          <div className=''>
            <h1 className='text-white text-2xl font-bold tracking-wider mr-4'>
              {trip.title}
            </h1>

            <div className='flex gap-1 items-center font-semibold text-sm text-white my-2'>
              <FaMapMarkerAlt /> {trip.pick_drop}
            </div>
            <div className='flex gap-1 items-center text-white font-semibold text-[12px]'>
              <BsFillCalendar3WeekFill />{' '}
              <span className='truncate w-3/4'>{renderEventDates}</span>
            </div>

            <div className='flex flex-col absolute right-0 bottom-0 items-center gap-2 justify-end text-sm'>
              {trip.included.food && (
                <div
                  className='border-[1.5px] text-white p-[2px]'
                  title='Meals Included'
                >
                  <ImSpoonKnife />
                </div>
              )}
              {trip.included.accomodation && (
                <div
                  className='border-[1.5px] text-white p-[2px]'
                  title='Stay Included'
                >
                  <MdLocalHotel />
                </div>
              )}
              {trip.included.transportation && (
                <div
                  className='border-[1.5px] text-white p-[2px]'
                  title='Travel Included'
                >
                  <AiFillCar />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div ref={cardBg} className='absolute w-full h-full top-0 left-0 z-[-2]'>
        <img
          ref={cardBgImage}
          src={trip.image}
          alt='bg'
          className='w-full h-full object-cover transition-all duration-300'
        />
      </div>
      <div className='w-full h-full absolute top-0 left-0 bg-black/40 z-[-1]'></div>
    </div>
  );
}

export default TripCard;
