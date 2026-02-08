import { useMemo } from 'react';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import { MOVIES } from '../../constants/movies.data';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import TrendMovies from '../../components/movie/trendMovies/TrendMovies';

export function HomePage() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    const debouncedSearch = useDebounce(searchTerm, 400);

    const getRandomThreeMovies = useMemo(() => {
        return [...MOVIES]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
    }, [])

    const movies = useMemo(() => {
        return MOVIES.filter(movie => 
            movie.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [debouncedSearch]);

    return (
        <div>
            <main>
                <div className="-mt-20"> 
                    <TrendMovies movies={getRandomThreeMovies} />
                </div>
                
                <div className='mt-8 px-6 py-5'>
                    <h2 className="text-2xl font-bold mb-6">All Movies</h2>
                    <div className='flex flex-wrap gap-6'>
                        {movies.length ? (
                            movies.map(movie => <MovieCard key={movie.title} movie={movie} />)
                        ) : (
                            <p>Movies not found</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}