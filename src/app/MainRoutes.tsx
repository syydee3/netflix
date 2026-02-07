import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/home/HomePage'
import { MovieDetails } from '../pages/movie/MovieDetails'
import { MoviesPage } from '../pages/movies/MoviesPage'
import { SeriesPage } from '../pages/series/SeriesPage'
import { MyListPage } from '../pages/myList/MyListPage'


export function MainRoutes() {
    return (
        <Router>
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
