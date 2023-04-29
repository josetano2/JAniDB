import "./AnimeSlider.css"
import { useQuery } from "@apollo/client"
import { GET_AIRING_ANIME } from "../../../lib/queries/GetAllAnime"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Navigation, EffectFade } from "swiper"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import Card, { CardBanner } from "../../../components/Card"
import { Link } from "react-router-dom"

export default function AnimeSlider(){

    const {loading, data, error} = useQuery(GET_AIRING_ANIME, {
        variables:{
            page: 1,
            perPage: 11,
        }
    })

    if(error) return <h1>{error.message}</h1>
    if(loading) return <div/>

    return (
        <div className="container">
          <Swiper
            modules={[Navigation, EffectFade]}
            navigation
            effect
            speed={800}
            slidesPerView={1}
            loop
            className="slider"
          >
            <div className="banner">
              {data.Page.media.map((anime) => {
                if (anime.bannerImage) {
                  return (
                    <Card>
                      <SwiperSlide className="swiper-slider">
                        <Link to={`/${anime.id}`} className="white-font">
                          <div className="slider-title">
                            <h4>{anime.title.english}</h4>
                          </div>
                          <CardBanner src={anime.bannerImage} className="slider-image" />
                        </Link>
                      </SwiperSlide>
                    </Card>
                  );
                }
                return null;
              })}
            </div>
          </Swiper>
        </div>
      );
      

}