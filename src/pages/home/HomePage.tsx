import { useMemo } from 'react';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import { MOVIES } from '../../constants/movies.data';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import TrendMovies from '../../components/movie/trendMovies/TrendMovies';
import { Tabs } from '../../components/tabs/Tabs';

export function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    const activeTag = searchParams.get('tag') || 'all';
    const debouncedSearch = useDebounce(searchTerm, 400);

    const getRandomThreeMovies = useMemo(() => {
        return [...MOVIES]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
    }, [])

    const filterByTitle = (movies: typeof MOVIES, query: string) => {
        if(!query) return movies;

        return movies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase())
        )
    }

    const filterByTag = (movies: typeof MOVIES, tag: string) => {
        if(tag === 'all') return movies;

        return movies.filter(movie =>
            movie.tags?.some(movieTag => 
                movieTag.toLowerCase() === tag.toLowerCase()
            )
        )
    }

    const movies = useMemo(() => {
        
        const titleFiltered = filterByTitle(MOVIES, debouncedSearch)
        const tagFiltered = filterByTag(titleFiltered, activeTag)

        return tagFiltered

    }, [debouncedSearch, activeTag]);

    const titlePage = (tabId: string) => {

        switch(tabId) {
            case 'trend':
                return 'Trends Now';
            case 'popular':
                return 'Popular';
            case 'premiere':
                return 'Premieres';
            case 'recent':
                return 'Recently Added';    
            default:
                return 'All Movies'
        }

    }

    const handleTagChange = (tag: string) => {

        setSearchParams(prev => {
            if (tag === prev.get('tag')) {
                prev.delete('tag')
            } else {
                prev.set('tag', tag)
            }
            return prev
        })

    }

    return (
        <div>
            <main>
                <div className="-mt-20"> 
                    <TrendMovies movies={getRandomThreeMovies} />
                </div>

                <div className='mt-8 px-6 py-5'>
                    <Tabs activeTag={activeTag} onTagChange={handleTagChange} />
                </div>
                
                <div className='mt-8 px-6 py-5'>
                    <h2 className="text-2xl font-bold mb-6">{titlePage(activeTag)}</h2>
                    <div className='flex flex-wrap gap-6'>
                        {movies.length ? (
                            movies.map(movie => <MovieCard key={movie.title} movie={movie} />)
                        ) : (
                            <div className='flex justify-center items-center w-full mx-5 my-5'> 
                                <p className='text-gray-400'>Movies not found</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}