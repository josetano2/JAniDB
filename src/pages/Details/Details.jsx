import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { GET_DETAILS } from "../../lib/queries/GetAllAnime";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import NavBar from "../../components/Navbar/NavBar"
import "./Details.css"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/scrollbar"
import { EffectFade, Navigation, Scrollbar } from "swiper";

export default function Details(){

    let {id} = useParams();

    const {loading, data, error} = useQuery(GET_DETAILS, {
        variables: {idNum: id}
    });
    
    const [favorites, setFavorites] = useState([])
    const [isFavorited, setIsFavorited] = useState(false)

    useEffect(() => {
        const localFav = JSON.parse(localStorage.getItem('react-anime-favorites'))
        if(localFav){
            setFavorites(localFav)
            setIsFavorited(localFav && data && data.Media ? localFav.some(item => item.Media.id === data.Media.id) : false)
        }
    }, [data])

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
            <div className="upper-half">
                <div className="image-and-fav">
                    <img className="cover-image" src={data.Media.coverImage.large} alt="" />
                    <button className="fav-button" 
                    onClick={() => isFavorited ? removeFav(data) : addFav(data)}
                    >{isFavorited ? 'Favorite' : 'Unfavorite'}</button>
                </div>
                <div className="anime-details">
                    <h1>{data.Media.title.english ? data.Media.title.english : data.Media.title.native}</h1>
                    <br />
                    {data.Media.genres.slice(0, 4).map((animeGenre) => {
                        return(
                            <div className="genre">{animeGenre}</div>
                            )
                        })}
                    <div className="anime-info">
                        <div className="left-info">
                            <div><h1>Score</h1> {data.Media.averageScore}%</div>
                            <div><h1>Episodes</h1> {data.Media.episodes ? data.Media.episodes : "?"}</div>
                            <div><h1>Start Date</h1> {data.Media.startDate.day}/{data.Media.startDate.month}/{data.Media.startDate.year}</div>
                            <div><h1>End Date</h1> {data.Media.endDate.day}/{data.Media.endDate.month}/{data.Media.endDate.year}</div>
                        </div>
                        <div className="right-info">
                            <div><h1>Season</h1> {data.Media.season}</div>
                            <div><h1>Status</h1> {data.Media.status}</div>
                            <div><h1>Favorites</h1> {data.Media.favourites}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="description-container">
                <h1>Description</h1>
                <div dangerouslySetInnerHTML={{ __html: data.Media.description }} className="description    "></div>                 
            </div>
            <div className="bottom-half">
                <h1>Characters</h1>
                <Swiper
                modules={[Navigation, EffectFade, Scrollbar]}
                navigation={{
                    nextEl: '.swiper-button-next-custom', 
                    prevEl: '.swiper-button-prev-custom'
                }}
                effect
                speed={800}
                slidesPerView={7}
                scrollbar={{
                    el: '.swiper-scrollbar',
                    draggable: true,
                }}
                >
                <div className="character-container">
                    {data.Media.characters.edges.map((character) => {
                        return (
                            <SwiperSlide>
                            <div className="character-card">
                                <img src={character.node.image.large} alt="NULL" className="character-image"/>
                                <div className="gradient-character"></div>
                                <div className="name-box">{character.node.name.full}</div>
                            </div>
                            </SwiperSlide>
                        )
                    })}
                </div>
                <div className="swiper-scrollbar character-scrollbar"></div>
                </Swiper>
            </div>
        </div>
        </div>
   )

}