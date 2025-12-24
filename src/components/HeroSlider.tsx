'use client';

import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

type SlideItemProps = {
  title: string;
  heading: string;
  paragraphColorClass: string;
  headingColorClass: string;
  imageUrl: string;
  link: string;
};

type HeroSliderProps = {
  slides: SlideItemProps[];
};

const SlideItem: React.FC<SlideItemProps> = ({
  title,
  heading,
  paragraphColorClass,
  headingColorClass,
  imageUrl,
  link,
}) => {
  return (
    <div className="item w-full xl:h-[733px] h-[500px] relative">
      <div
        className="w-full h-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="container-x mx-auto flex items-center h-full px-4">
          <div className="w-full h-full flex items-end xl:items-center pb-10 xl:pb-0">
            <div className="xl:w-[626px] w-full">
              <p className={`md:text-[34px] text-[20px] font-medium mb-[7px] ${paragraphColorClass}`}>
                {title}
              </p>
              <h1 className={`md:text-[66px] text-[40px] font-bold md:leading-[80px] leading-[40px] mb-[44px] ${headingColorClass}`}>
                {heading}
              </h1>
              <Link href={link} passHref>
                <div className="w-[160px] h-[52px] flex justify-center items-center group rounded bg-blue-500 text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer banner-wrapper mb-[60px]">
                  <div className="flex space-x-1 items-center relative z-10">
                    <span className="text-sm font-semibold tracking-wide leading-7 mr-2">Shop Now</span>
                    <span>
                      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                        <rect x="2.08984" y="0.636719" width="6.94219" height="1.54271" transform="rotate(45 2.08984 0.636719)" />
                        <rect x="7" y="5.54492" width="6.94219" height="1.54271" transform="rotate(135 7 5.54492)" />
                      </svg>
                    </span>
                  </div>
                  <div className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    lazyLoad: 'ondemand' as const,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          fade: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true,
          fade: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          fade: true,
        },
      },
    ],
  };

  return (
    <div className="hero-slider-section">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <SlideItem key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
