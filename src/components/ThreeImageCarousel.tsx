'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'

interface CarouselImage {
  src: string
  alt: string
}

interface ThreeImageCarouselProps {
  images: CarouselImage[]
  className?: string
}

export default function ThreeImageCarousel({ images, className = '' }: ThreeImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const getImageIndex = (offset: number) => {
    return (currentIndex + offset + images.length) % images.length
  }

  return (
    <div className={`relative ${className}`}>
      {/* Dark background container */}
      <div className="bg-gray-900 rounded-2xl p-8 overflow-hidden">
        <div className="relative flex items-center justify-center gap-4">
          {/* Previous button */}
          <button
            onClick={prevSlide}
            className="absolute left-2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>

          {/* Three images layout */}
          <div className="flex items-center justify-center gap-4 w-full px-16">
            {/* Left image - smaller */}
            <div className="hidden md:block opacity-60 transform scale-90 transition-all duration-300">
              <div className="overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={images[getImageIndex(-1)].src}
                  alt={images[getImageIndex(-1)].alt}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Center image - larger */}
            <div className="transform scale-100 z-10 transition-all duration-300">
              <div className="overflow-hidden rounded-lg shadow-2xl ring-2 ring-white/20">
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right image - smaller */}
            <div className="hidden md:block opacity-60 transform scale-90 transition-all duration-300">
              <div className="overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={images[getImageIndex(1)].src}
                  alt={images[getImageIndex(1)].alt}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextSlide}
            className="absolute right-2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Caption for current image */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm max-w-2xl mx-auto">
            {images[currentIndex].alt}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}