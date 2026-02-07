import { IMovie } from "../../../types/movie.interface"

interface Props { 
    movie: IMovie
}

export function TrendMovies({ movie }: Props) {
    return (
        <div className="relative">

            <img src={movie.imageForTrends} className="w-full md:h-212.5 object-cover"/>

            <div className="absolute inset-0 flex items-center justify-start ml-70">
                <div className="text-white text-start z-10 flex flex-col gap-10">
                    <p className="font-semibold">Duration: {movie.duration}</p>
                    <div className="flex gap-2 items-end">
                        <div className="flex items-center gap-1">
                            <img src="icons/star.svg" className="h-5 w-5"/>
                            <p className="text-2xl font-bold">{movie.rating}</p>
                        </div>
                        
                        <p className="text-gray-200">{movie.tags.join(` | `)}</p>
                    </div>
                    <h2 className="text-6xl font-bold">{movie.title}</h2>
                    <p className="max-w-lg">{movie.shortDescription}</p>
                    <div className="flex gap-5">
                        <button className="bg-red-600 px-9 py-3 flex items-center justify-center gap-4 rounded-full w-45
                                           shadow-[0_10px_30px_#ff0000]
                                           transition-all duration-300 hover:scale-105">
                            <img src="icons/play.svg" className="w-4 h-4" />
                            <span className="font-bold">WATCH</span>
                        </button>
                        <button className="bg-black px-9 py-3 gap-4 rounded-full font-bold flex items-center justify-center w-45 transition-all duration-300 hover:scale-105">
                            <img src="icons/plus.svg" className="w-4 h-4" />
                            <span>ADD LIST</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className='absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black via-black/70 to-transparent'>
            </div>
        </div>
    )
}