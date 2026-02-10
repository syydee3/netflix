import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/home/HomePage'
import { MovieDetails } from '../pages/movie/MovieDetails'
import { MoviesPage } from '../pages/movies/MoviesPage'
import { SeriesPage } from '../pages/series/SeriesPage'
import { MyListPage } from '../pages/myList/MyListPage'
import config from './../../config/env'


export function MainRoutes() {
    return (
        <Router basename={ config.isDev ? '' : '/netflix/'}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />}/>
                    <Route path='/movie/:id' element={<MovieDetails />}/>
                    <Route path='/movies' element={<MoviesPage />} />
                    <Route path='/series' element={<SeriesPage />} />
                    <Route path='/my-list' element={<MyListPage />} />
                </Route>
            </Routes>
        </Router>
    )
}
