import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { GET_DETAILS } from "../../lib/queries/GetAllAnime";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import NavBar from "../../components/Navbar/NavBar"
import "./Details.css"
import { useEffect, useState } from "react";

export default function Details(){

    let {id} = useParams();

    const {loading, data, error} = useQuery(GET_DETAILS, {
        variables: {idNum: id}
    });
    
    const [favorites, setFavorites] = useState([])
    const [isFavorited, setIsFavorited] = useState(false)

    const saveToLocalStorage = (item) => {
        localStorage.setItem('react-anime-favorites', JSON.stringify(item))
    }

    const addFav = (data) => {
        const newFavoriteList = [...favorites, data]
        setFavorites(newFavoriteList)
        setIsFavorited(true)
        saveToLocalStorage(newFavoriteList)
    }

    const removeFav = (data) => {
        const newFavoriteList =  favorites.filter((item) => item.Media.id !== data.Media.id)
        setFavorites(newFavoriteList)
        setIsFavorited(false)  
        saveToLocalStorage(newFavoriteList)
    }

    useEffect(() => {
        const localFav = JSON.parse(localStorage.getItem('react-anime-favorites'))
        setFavorites(localFav)
        setIsFavorited(localFav && data && data.Media ? localFav.some(item => item.Media.id === data.Media.id) : false)
    }, [data])

    if(error) return <h1>{error.message}</h1>
    if(loading) return (
        <div>
            <NavBar/>
            <LoadingScreen/>
        </div>
    )

   return(
        <div className="main">
        <NavBar/>
        <div className="banner-image-container">
            <img className="banner-image" src={data.Media.bannerImage} alt="" />
        </div>
        <div className="info">
            <div className="image-and-fav">
                <img className="cover-image" src={data.Media.coverImage.large} alt="" />
                <button className="fav-button" 
                onClick={isFavorited ? () => removeFav(data) : () => addFav(data)}
                >{isFavorited ? '❤️ Favorite' : '🤍 Favorite'}</button>
            </div>
            <div className="anime-details">
                <h1>{data.Media.title.english ? data.Media.title.english : data.Media.title.native}</h1>
                <br />
                <div dangerouslySetInnerHTML={{ __html: data.Media.description }} className="description    "></div>
            </div>
        </div>
        </div>
   )

}