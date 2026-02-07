import { lazy, Suspense, useMemo } from "react"
import { useParams } from "react-router-dom"
import { MOVIES } from "../../constants/movies.data"


const MovieComments = lazy(() => import("../../components/comments/Comments").then(c => ({default: c.Comments})))

export function MovieDetails() {

    const {id} = useParams()

    const movie = useMemo(() => {
        return MOVIES.find(movie => movie.trailerYouTubeId === id)
    }, [id])

    if (!movie) return (
        <div className="flex items-center justify-center">
            <p className="text-center mt-10 text-gray-400">Movie not found</p>
        </div>
    )

    return <div>
            <div className="flex flex-col md:flex-row gap-10 items-start">
                <img src={movie.image} alt={movie.title} className='w-2/3 md:w-1/5 rounded-xl shadow-lg object-cover'/>
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">IMDb: {movie.rating}</p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">Description: {movie.description}</p>

                    <Suspense fallback={<div>Loading...</div>}>
                        <MovieComments />
                    </Suspense>
                </div>
            </div>
        </div>
}
