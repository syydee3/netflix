import { useEffect, useState, useRef, memo } from "react"
import { IMovie } from "../../../types/movie.interface"

interface Props { 
    movies: IMovie[]
}

function TrendMovies({ movies }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const currentIndexRef = useRef(0)
    const prevIndexRef = useRef(0)
    const intervalRef = useRef(0)
    const transitionTimeoutRef = useRef(0)

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

        intervalRef.current = setInterval(() => {
            nextSlide()
        }, 5000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current)
            }
        }
    }, [movies.length]) 

    const currentMovie = movies[currentIndex]
    const prevIndex = prevIndexRef.current
    const previousMovie = movies[prevIndex]

    return (
        <div className="relative group overflow-hidden h-125 md:h-212.5">

            <div className="relative w-full h-full">
                {previousMovie && isTransitioning && (
                    <div className="absolute top-0 left-0 w-full h-full z-0">
                        <img 
                            src={previousMovie.imageForTrends} 
                            className="w-full h-full object-cover"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/20 z-5"></div>
                        <div className='absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black via-black/70 to-transparent z-5'></div>
                    </div>
                )}
                
                <div className={`relative w-full h-full z-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <img 
                        src={currentMovie.imageForTrends} 
                        className="w-full h-full object-cover"
                        alt={currentMovie.title}
                    />
                    
                    <div className="absolute inset-0 bg-black/20 z-5"></div>
                    <div className='absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black via-black/70 to-transparent z-5'></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-start ml-70 z-10">
                    <div className={`text-white text-start flex flex-col gap-10 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                        <p className="font-semibold transition-all duration-700 delay-100">Duration: {currentMovie.duration}</p>
                        <div className="flex gap-2 items-end transition-all duration-700 delay-150">
                            <div className="flex items-center gap-1">
                                <img src="icons/star.svg" className="h-5 w-5" alt="Rating"/>
                                <p className="text-2xl font-bold">{currentMovie.rating}</p>
                            </div>
                            
                            <p className="text-gray-200">{currentMovie.tags.join(` | `)}</p>
                        </div>
                        <h2 className={`text-6xl font-bold transition-all duration-700 delay-200 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                            {currentMovie.title}
                        </h2>
                        <p className={`max-w-lg transition-all duration-700 delay-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                            {currentMovie.shortDescription}
                        </p>
                        <div className={`flex gap-5 transition-all duration-700 delay-400 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                            <button 
                                className="bg-red-600 px-9 py-3 flex items-center justify-center gap-4 rounded-full w-45
                                        shadow-[0_10px_30px_#ff0000]
                                        transition-all duration-300 hover:scale-105"
                                onClick={() => console.log('Watch:', currentMovie.title)}
                            >
                                <img src="icons/play.svg" className="w-4 h-4" alt="Play" />
                                <span className="font-bold">WATCH</span>
                            </button>
                            <button 
                                className="bg-black px-9 py-3 gap-4 rounded-full font-bold flex items-center justify-center w-45 transition-all duration-300 hover:scale-105"
                                onClick={() => console.log('Add to list:', currentMovie.title)}
                            >
                                <img src="icons/plus.svg" className="w-4 h-4" alt="Add to list" />
                                <span>ADD LIST</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
                    {movies.map((_, slideIndex) => (
                        <button 
                            key={slideIndex} 
                            onClick={() => goToSlide(slideIndex)} 
                            className={`h-1 transition-all duration-300 w-14 rounded-full ${
                                slideIndex === currentIndex ? 'bg-white/90' : 'bg-white/30 hover:bg-white/80'
                            }`} 
                            aria-label={`Go to the slide ${slideIndex + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(TrendMovies)