import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import "../../Home/AnimeGrids/AnimeGrids.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/scrollbar"
import { EffectFade, Navigation, Scrollbar } from "swiper";
import { useEffect, useState } from "react"
import { GET_SIMILAR_ANIME } from "../../../lib/queries/GetAllAnime"
import Card, { CardDetail, CardImage } from "../../../components/Card"

export default function ExploreMore(){

    const [totalSlides, setTotalSlides] = useState(7)
    
    useEffect(() => {
        const maxWidth = 440;
        const temp = window.innerWidth <= maxWidth ? 3 : 7;
        setTotalSlides(temp)
    }, [])

    let {id} = useParams();

    const {loading, data, error} = useQuery(GET_SIMILAR_ANIME, {
        variables: {idNum: id}
    })

    if(error) return <h1>{error.message}</h1>
    if(loading) return <div/>

    return (
        <div className="whole-container">
        <h1 className="title">Explore More!</h1>
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
            {data.Media.recommendations.nodes.map((anime) => {
                return (
                <SwiperSlide className="swiper-slide-container">
                <Card>
                    <Link to={`/${anime.mediaRecommendation.id}`} className="white-font">
                    <div className="image-container">
                        <CardImage className="anime-image" src={anime.mediaRecommendation.coverImage.large}/>
                        <div className="gradient"></div>
                        <div className="info-box">{anime.mediaRecommendation.title.english ? (
                            <CardDetail>
                            <div>{anime.mediaRecommendation.title.english}</div>
                        </CardDetail>
                        ) : (
                            <CardDetail>
                            <div>{anime.mediaRecommendation.title.native}</div>
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