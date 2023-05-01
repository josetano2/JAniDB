import { useQuery } from "@apollo/client"
import NavBar from "../../components/Navbar/NavBar"
import { GET_SEARCH_ANIME } from "../../lib/queries/GetAllAnime"
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen"
import Card, { CardDetail, CardImage } from "../../components/Card"
import { Link, useLocation } from "react-router-dom"

export default function Search(){

    const {search} =  useLocation()
    const query = new URLSearchParams(search).get("query")

    const {loading, data, error} = useQuery(GET_SEARCH_ANIME, {
        variables:{
            titleSearch: query
        }
    })

    if(error) return <h1>{error.message}</h1>
    if(loading) return (
        <div>
            <NavBar/>
            <LoadingScreen/>
        </div>
    )

    return (
        <div className="bg">
            <NavBar/>
            <h1 className="h1-fav">Search Results:</h1>
            <div className="grids-fav">
            {data.Page.media.map((anime) => {
                return <Card className="card-container">
                    <Link to={`/${anime.id}`} className="white-font">
                    <div className="image-container-fav">
                        <CardImage className="anime-image-fav" src={anime.coverImage.large}/>
                        <div className="gradient-fav"></div>
                        <div className="info-box-fav">{anime.title.english ? (
                        <CardDetail>
                            <div>{anime.title.english}</div>
                        </CardDetail>
                        ) : (
                        <CardDetail>
                            <div>{anime.title.native}</div>
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