import { useQuery } from "@apollo/client"
import { GET_ACTION_ANIME } from "../../../../lib/queries/GetAllAnime"
import { Link } from "react-router-dom"
import "../../AnimeGrids/AnimeGrids.css"
import Card, { CardDetail, CardImage } from "../../../../components/Card"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/scrollbar"
import { EffectFade, Navigation, Scrollbar } from "swiper";

export default function Action(){

    const {loading, data, error} = useQuery(GET_ACTION_ANIME, {
        variables:{
            page: 1,
            perPage: 20,
        }
    })

    if(error) return <h1>{error.message}</h1>
    if(loading) return <div/>

    return (
        <div className="whole-container">
        <h1 className="title">Action</h1>
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
        className="slider-container"
        >
        <div className="grids">
            {data.Page.media.map((anime) => {
                return (
                <SwiperSlide className="swiper-slide-container">
                <Card>
                    <Link to={`/${anime.id}`} className="white-font">
                    <div className="image-container">
                        <CardImage className="anime-image" src={anime.coverImage.large}/>
                        <div className="gradient"></div>
                        <div className="info-box">{anime.title.english ? (
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
                </SwiperSlide>
                )
            })}
        </div>
        <div className="swiper-scrollbar"></div>
        </Swiper>
        </div>
    )

}