import { useEffect, useState, useRef, memo } from "react"
import { IMovie } from "../../../types/movie.interface"

interface Props { 
    movies: IMovie[]
}

function TrendMovies({ movies }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const currentIndexRef = useRef(0)
    const prevIndexRef = useRef(0)
    const intervalRef = useRef(0)
    const transitionTimeoutRef = useRef(0)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        currentIndexRef.current = currentIndex
    }, [currentIndex])

    const nextSlide = () => {
        if (isTransitioning) return
        
        setIsTransitioning(true)
        prevIndexRef.current = currentIndexRef.current
        
        const nextIndex = currentIndexRef.current === movies.length - 1 ? 0 : currentIndexRef.current + 1
        
        setTimeout(() => {
            setCurrentIndex(nextIndex)
            setTimeout(() => {
                setIsTransitioning(false)
            }, 50)
        }, 500)
    }

    const goToSlide = (slideIndex: number) => {
        if (isTransitioning || slideIndex === currentIndexRef.current) return
        
        setIsTransitioning(true)
        prevIndexRef.current = currentIndexRef.current
        
        setTimeout(() => {
            setCurrentIndex(slideIndex)
            setTimeout(() => {
                setIsTransitioning(false)
            }, 50)
        }, 500) 
    }

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        const intervalTime = isMobile ? 7000 : 5000
        
        intervalRef.current = setInterval(() => {
            nextSlide()
        }, intervalTime)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current)
            }
        }
    }, [movies.length, isMobile]) 

    const currentMovie = movies[currentIndex]
    const prevIndex = prevIndexRef.current
    const previousMovie = movies[prevIndex]

    return (
        <div className="relative group overflow-hidden h-75 sm:h-100 md:h-125 lg:h-150 xl:h-175 2xl:h-212.5">

            <div className="relative w-full h-full">
                {previousMovie && isTransitioning && (
                    <div className="absolute top-0 left-0 w-full h-full z-0">
                        <img 
                            src={`./${previousMovie.imageForTrends}`} 
                            className="w-full h-full object-cover"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/20 z-5"></div>
                        <div className='absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black via-black/70 to-transparent z-5'></div>
                    </div>
                )}
                
                <div className={`relative w-full h-full z-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <img 
                        src={`./${currentMovie.imageForTrends}`} 
                        className="w-full h-full object-cover"
                        alt={currentMovie.title}
                        loading="lazy"
                        decoding="async"
                    />
                    
                    <div className="absolute inset-0 bg-black/20 z-5"></div>
                    <div className='absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black via-black/70 to-transparent z-5'></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:ml-16 2xl:ml-70 z-10">
                    <div className={`text-white text-start flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-x-4 sm:translate-x-6 md:translate-x-8 lg:translate-x-10' : 'opacity-100 translate-x-0'}`}>
                        <p className="font-semibold text-xs sm:text-sm md:text-base transition-all duration-700 delay-100">
                            Duration: {currentMovie.duration}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-start sm:items-end transition-all duration-700 delay-150">
                            <div className="flex items-center gap-1">
                                <img 
                                    src="./icons/star.svg" 
                                    className="h-4 w-4 sm:h-5 sm:w-5" 
                                    alt="Rating"
                                />
                                <p className="text-lg sm:text-xl md:text-2xl font-bold">{currentMovie.rating}</p>
                            </div>
                            
                            <p className="text-gray-200 text-xs sm:text-sm md:text-base">
                                {currentMovie.genre.join(` | `)}
                            </p>
                        </div>
                        <h2 className={`font-bold transition-all duration-700 delay-200 ${isTransitioning ? 'opacity-0 translate-y-2 sm:translate-y-3 md:translate-y-4' : 'opacity-100 translate-y-0'}
                            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>
                            {currentMovie.title}
                        </h2>
                        <p className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transition-all duration-700 delay-300 ${isTransitioning ? 'opacity-0 translate-y-2 sm:translate-y-3 md:translate-y-4' : 'opacity-100 translate-y-0'}
                            text-xs sm:text-sm md:text-base`}>
                            {currentMovie.shortDescription}
                        </p>
                        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 transition-all duration-700 delay-400 ${isTransitioning ? 'opacity-0 translate-y-2 sm:translate-y-3 md:translate-y-4' : 'opacity-100 translate-y-0'}`}>
                            <button 
                                className="bg-red-600 px-4 py-2 sm:px-6 sm:py-2.5 md:px-9 md:py-3 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full w-full sm:w-auto min-w-35 sm:min-w-40 md:min-w-45
                                        shadow-[0_10px_30px_#ff0000]
                                        transition-all duration-300 hover:scale-105 active:scale-95"
                                onClick={() => console.log('Watch:', currentMovie.title)}
                            >
                                <img 
                                    src="./icons/play.svg" 
                                    className="w-3 h-3 sm:w-4 sm:h-4" 
                                    alt="Play" 
                                />
                                <span className="font-bold text-sm sm:text-base">WATCH</span>
                            </button>
                            <button 
                                className="bg-black px-4 py-2 sm:px-6 sm:py-2.5 md:px-9 md:py-3 gap-2 sm:gap-3 md:gap-4 rounded-full font-bold flex items-center justify-center w-full sm:w-auto min-w-35 sm:min-w-40 md:min-w-45 
                                        transition-all duration-300 hover:scale-105 active:scale-95"
                                onClick={() => console.log('Add to list:', currentMovie.title)}
                            >
                                <img 
                                    src="./icons/plus.svg" 
                                    className="w-3 h-3 sm:w-4 sm:h-4" 
                                    alt="Add to list" 
                                />
                                <span className="text-sm sm:text-base">ADD LIST</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
                    {movies.map((_, slideIndex) => (
                        <button 
                            key={slideIndex} 
                            onClick={() => goToSlide(slideIndex)} 
                            className={`transition-all duration-300 rounded-full ${
                                slideIndex === currentIndex 
                                    ? 'bg-white/90' 
                                    : 'bg-white/30 hover:bg-white/80 active:bg-white/90'
                            } ${isMobile ? 'h-1 w-8' : 'h-1 w-10 sm:w-12 md:w-14'}`} 
                            aria-label={`Go to the slide ${slideIndex + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(TrendMovies)