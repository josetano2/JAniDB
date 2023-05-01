import { Link } from "react-router-dom"
import "../../AnimeGrids/AnimeGrids.css"
import Card, { CardDetail, CardImage } from "../../../../components/Card"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/scrollbar"
import { EffectFade, Navigation, Scrollbar } from "swiper";
import { useEffect, useState } from "react"

export default function FavoritesHome(){

    const [favorites, setFavorites] = useState([])
    
    useEffect(() => {
        const animeFavorites = JSON.parse(localStorage.getItem('react-anime-favorites'))
        setFavorites(animeFavorites)
    }, [])
    
    const [totalSlides, setTotalSlides] = useState(8)

    useEffect(() => {
        const maxWidth = 440;
        const temp = window.innerWidth <= maxWidth ? 3 : 8;
        setTotalSlides(temp)
    }, [])

    if(favorites && favorites.length !== 0){
        return (
            <div className="whole-container">
            <h1 className="title">Favorites</h1>
            <Swiper
            modules={[Navigation, EffectFade, Scrollbar]}
            navigation={{
                nextEl: '.swiper-button-next-custom', 
                prevEl: '.swiper-button-prev-custom'
            }}
            effect
            speed={800}
            slidesPerView={totalSlides}
            scrollbar={{
                el: '.swiper-scrollbar',
                draggable: true,
            }}
            className="slider-container"
            >
            <div className="grids">
                {favorites?.map((anime) => {
                    return (
                    <SwiperSlide className="swiper-slide-container">
                    <Card>
                        <Link to={`/${anime.Media.id}`} className="white-font">
                        <div className="image-container">
                            <CardImage className="anime-image" src={anime.Media.coverImage.large}/>
                            <div className="gradient"></div>
                            <div className="info-box">{anime.Media.title.english ? (
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
                    </SwiperSlide>
                    )
                })}
            </div>
            <div className="swiper-scrollbar"></div>
            </Swiper>
            </div>
        )
    }

    else{
        return (
            <div className="whole-container">
                <h1 className="title">Favorites</h1>  
                <h3 className="title-h3">Favorites is empty!</h3>  
            </div>
        )
    }

    

}