import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useScrollDirection } from "../../../hooks/useScrollDirection";
import Dot from "../../shared/Dot";

export function Header() {
    const { theme, toggleTheme } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();
    const { isVisible } = useScrollDirection()

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
        <header className={`flex items-center justify-between px-6 py-4.5 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
            <Link to={'/'}>
                <img src='./netflix.png' alt='Netflix' className='h-8 w-auto'/>
            </Link>
            <div className="flex items-center gap-25"> 
                
                <div className="flex items-center gap-25">
                    <Link to={'/'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        Home
                        {isActive('/') && (
                            <Dot />
                        )}
                    </Link>
                    <Link to={'/movies'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        Movies
                        {isActive('/movies') && (
                            <Dot />
                        )}
                    </Link>
                    <Link to={'/series'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        Series
                        {isActive('/series') && (
                            <Dot />
                        )}
                    </Link>
                    <Link to={'/my-list'} className="hover:text-gray-400 transition relative text-white block w-full text-center min-w-15">
                        My List
                        {isActive('/my-list') && (
                            <Dot />
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