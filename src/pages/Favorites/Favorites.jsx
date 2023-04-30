import { useEffect, useState } from "react"
import NavBar from "../../components/Navbar/NavBar"
import "../Home/AnimeGrids/AnimeGrids.css"
import { Link } from "react-router-dom"
import Card, { CardDetail, CardImage } from "../../components/Card"

export default function Favorites(){

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const animeFavorites = JSON.parse(localStorage.getItem('react-anime-favorites'))
        setFavorites(animeFavorites)
    }, [])

    
    return(
        <div className="bg">
            <NavBar/>
            <div className="grids">
            {favorites?.map((anime) => {
                return <Card>
                    <Link to={`/${anime.Media.id}`} className="white-font">
                    <div className="image-container">
                        <CardImage className="anime-image" src={anime.Media.coverImage.large}/>
                        <div className="info-box">Score: {anime.Media.averageScore}</div>
                    </div>
                    {anime.Media.title.english ? (
                        <CardDetail>
                            <div>{anime.Media.title.english}</div>
                        </CardDetail>
                        ) : (
                        <CardDetail>
                            <div>{anime.Media.title.native}</div>
                        </CardDetail>
                        )}
                    </Link>
                </Card>
            })}
        </div>
        </div>
    )
    
}