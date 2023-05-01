import Trending from "../AnimeScrollbar/Trending/Trending"
import Romance from "../AnimeScrollbar/Romance/Romance"
import FavoritesHome from "../AnimeScrollbar/FavoritesHome/FavoritesHome"
import RomCom from "../AnimeScrollbar/RomCom/RomCom"
import Action from "../AnimeScrollbar/Action/Action"
import Music from "../AnimeScrollbar/Music/Music"

export default function AnimeGrids(){

    return (
        <div>
            <FavoritesHome/>
            <Trending/>
            <RomCom/>
            <Romance/>
            <Action/>
            <Music/>
        </div>
    )

}