'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CarouselImage {
  src: string
  alt: string
}

interface SmoothCarouselProps {
  images: CarouselImage[]
  width?: number
  height?: number
  className?: string
}

export default function SmoothCarousel({
  images,
  width = 400,
  height = 600,
  className = ''
}: SmoothCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const isDragging = useRef(false)

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 400)
  }, [isTransitioning, images.length])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 400)
  }, [isTransitioning, images.length])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0)
    scrollLeft.current = currentIndex * width
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (startX.current - x) * 2
    const newScrollPosition = scrollLeft.current + walk

    // Calculate which image should be shown based on scroll position
    const newIndex = Math.round(newScrollPosition / width)
    if (newIndex >= 0 && newIndex < images.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX
    scrollLeft.current = currentIndex * width
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX
    const walk = (startX.current - x) * 2
    const newScrollPosition = scrollLeft.current + walk

    const newIndex = Math.round(newScrollPosition / width)
    if (newIndex >= 0 && newIndex < images.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrevious])

  return (
    <div className={`relative ${className}`}>
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg bg-gray-100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
      >
        {/* Images container with smooth transition */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            touchAction: 'pan-y pinch-zoom'
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-full flex items-center justify-center p-4"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={width}
                height={height}
                className="rounded-lg shadow-xl object-contain max-h-[600px] w-auto mx-auto"
                draggable={false}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Image counter and caption */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 font-medium">
          {currentIndex + 1} of {images.length}
        </p>
        <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
          {images[currentIndex].alt}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => setIsTransitioning(false), 400)
              }
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-cyan-600'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Instructions */}
      <p className="mt-4 text-center text-xs text-gray-400">
        Swipe or use arrow keys to navigate • Click dots to jump to image
      </p>
    </div>
  )
}