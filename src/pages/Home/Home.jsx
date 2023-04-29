import "./Home.css"
import NavBar from "../../components/Navbar/NavBar"
import AnimeGrids from "../../pages/Home/AnimeGrids/AnimeGrids"
import AnimeSlider from "../../pages/Home/AnimeSlider/AnimeSlider"
import { GET_ALL_ANIME } from "../../lib/queries/GetAllAnime"
import { useQuery } from "@apollo/client"
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen"

export default function Home(){
    
    const {loading, data, error} = useQuery(GET_ALL_ANIME, {
        variables:{
            page: 1,
            perPage: 50,
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
            <AnimeSlider/>
            <AnimeGrids/>
        </div>
    )
}