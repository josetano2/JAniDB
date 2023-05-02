import { useEffect, useState } from "react"
import NavBar from "../../components/Navbar/NavBar"
import "./Favorites.css"
import { Link } from "react-router-dom"
import Card, { CardDetail, CardImage } from "../../components/Card"

export default function Favorites(){

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const animeFavorites = JSON.parse(localStorage.getItem('react-anime-favorites'))
        setFavorites(animeFavorites)
        window.scrollTo(0, 0)
    }, [])

    if(favorites && favorites.length !== 0){

        return(
            <div className="bg">
                <NavBar/>
                <h1 className="h1-fav">Favorites</h1>
                <div className="grids-fav">
                {favorites?.map((anime) => {
                    return <Card className="card-container">
                        <Link to={`/${anime.Media.id}`} className="white-font">
                        <div className="image-container-fav">
                            <CardImage className="anime-image-fav" src={anime.Media.coverImage.large}/>
                            <div className="gradient-fav"></div>
                            <div className="info-box-fav">{anime.Media.title.english ? (
                            <CardDetail>
                                <div>{anime.Media.title.english}</div>
                            </CardDetail>
                            ) : (
                            <CardDetail>
                                <div>{anime.Media.title.native}</div>
                            </CardDetail>
                            )}</div>
                        </div>
                        </Link>
                    </Card>
                })}
            </div>
            </div>
        )
    }

    else{
        return (
            <div className="bg">
            <NavBar/>
            <h1 className="h1-fav">No Favorites</h1>
        </div>
        )
    }
}