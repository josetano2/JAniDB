import { useQuery } from "@apollo/client"
import { GET_ALL_ANIME } from "../../../lib/queries/GetAllAnime"
import { Link } from "react-router-dom"
import "./AnimeGrids.css"
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen"
import Card, { CardDetail, CardImage } from "../../../components/Card"

export default function AnimeGrids(){

    const {loading, data, error} = useQuery(GET_ALL_ANIME, {
        variables:{
            page: 3,
            perPage: 50,
        }
    })

    if(error) return <h1>{error.message}</h1>
    if(loading) return <div/>

    return (
        <div className="grids">
            {data.Page.media.map((anime) => {
                return <Card>
                    <Link to={`/${anime.id}`} className="white-font">
                    <CardImage className="anime-image" src={anime.coverImage.large}/>
                    {anime.title.english ? (
                        <CardDetail>
                            <div>{anime.title.english}</div>
                        </CardDetail>
                        ) : (
                        <CardDetail>
                            <div>{anime.title.native}</div>
                        </CardDetail>
                        )}
                    </Link>
                </Card>
            })}
        </div>
    )

}