import Top50 from "../AnimeScrollbar/Top50/Top50"
import Romance from "../AnimeScrollbar/Romance/Romance"
import FavoritesHome from "../AnimeScrollbar/FavoritesHome/FavoritesHome"
import RomCom from "../AnimeScrollbar/RomCom/RomCom"
import Action from "../AnimeScrollbar/Action/Action"

export default function AnimeGrids(){

    return (
        <div>
            <FavoritesHome/>
            <Top50/>
            <RomCom/>
            <Romance/>
            <Action/>
        </div>
    )

}