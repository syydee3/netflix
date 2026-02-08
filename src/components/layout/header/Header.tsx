import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function Header() {
    const { theme, toggleTheme } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();

    const searchTerm = searchParams.get('q') || '';

    const handleSearchChange = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (value) {
            newSearchParams.set('q', value);
        } else {
            newSearchParams.delete('q');
        }
        setSearchParams(newSearchParams);
    };

    const isMoviePage = useMemo(() => pathname.startsWith('/movie/'), [pathname]);

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className='flex items-center justify-between px-6 py-4.5'>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
            <Link to={'/'}>
                <img src='./netflix.png' alt='Netflix' className='h-8 w-auto'/>
            </Link>
            <div className="flex items-center gap-25"> 
                
                <div className="flex items-center gap-25">
                    <Link to={'/'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        Home
                        {isActive('/') && (
                            <span className="absolute -bottom-3.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></span>
                        )}
                    </Link>
                    <Link to={'/movies'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        Movies
                        {isActive('/movies') && (
                            <span className="absolute -bottom-3.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></span>
                        )}
                    </Link>
                    <Link to={'/series'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        Series
                        {isActive('/series') && (
                            <span className="absolute -bottom-3.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></span>
                        )}
                    </Link>
                    <Link to={'/my-list'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        My List
                        {isActive('/my-list') && (
                            <span className="absolute -bottom-3.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></span>
                        )}
                    </Link>
                </div>

                <div className="flex items-center gap-25">
                    {!isMoviePage && (
                        <input 
                            placeholder="Search..." 
                            type='search' 
                            value={searchTerm} 
                            onChange={(e) => handleSearchChange(e.target.value)} 
                            className='border border-white/30 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded outline-0 w-48 text-white placeholder:text-gray-300'
                        />
                    )}

                    <button>
                        <img src="./icons/notifications.svg" className="w-6 h-6"/>
                    </button>

                    <button 
                        onClick={toggleTheme} 
                        className='text-sm px-3 py-1.5 rounded hover:bg-white/20 transition flex items-center justify-center w-10 h-10 text-white'
                    > 
                        {theme === 'dark' ? '☀️' : '🌑'}
                    </button>
                </div>
            </div>
        </header>
    );
}