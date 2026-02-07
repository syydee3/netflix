import React, { memo, useCallback, useState } from 'react';
import FavouriteButton from '../../shared/FavouriteButton';
import { Modal } from '../../shared/Modal';
import { Link } from 'react-router-dom';
import { IMovie } from '../../../types/movie.interface';

interface Props { 
    movie: IMovie
}

const MovieCard = ({ movie }: Props) => {

    const [isOpenTrailer, setisOpenTrailer] = useState(false)

    const openTrailer = useCallback(() => {
        setisOpenTrailer(true)
    }, [])

    return (
        <div className='relative w-50 rounded-2xl overflow-hidden bg-neutral-900 shadow-lg cursor-pointer' onClick={openTrailer}>

            {isOpenTrailer && <Modal onClose={() => {setisOpenTrailer(false)}}>
                    <div className='flex flex-col items-center gap-5'>
                        <iframe 
                            width="373" 
                            height="210" 
                            src={`https://www.youtube.com/embed/${movie.trailerYouTubeId}?si=zOnRSUs38CuN5Nc2&amp;controls=0`}
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen />
                        <div>The trailer of <span className='text-red-600'>{movie.title}</span></div>
                    </div>
                </Modal>}

            <img src={movie.image} alt={movie.title} className='w-full h-auto object-cover'/>
            <div className='absolute top-2 right-2 z-10'>
                <FavouriteButton />
                <Link to={`/movie/${movie.trailerYouTubeId}`}>
                    🔗
                </Link>
            </div>
            <div className='absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 to-transparent p-2 text-sm text-white font-semibold'>
                IMDb: {movie.rating}
            </div>
        </div>
    );
};

export default memo(MovieCard);