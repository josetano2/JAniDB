import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { GET_DETAILS } from "../../lib/queries/GetAllAnime";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import NavBar from "../../components/Navbar/NavBar"
import "./Details.css"

export default function Details(){

    let {id} = useParams();

   console.log(id)

    const {loading, data, error} = useQuery(GET_DETAILS, {
        variables: {idNum: id}
    });

    if(error) return <h1>{error.message}</h1>
    if(loading) return <LoadingScreen/>

   return(
        <div className="main">
        <NavBar/>
        <div className="banner-image-container">
            <img className="banner-image" src={data.Media.bannerImage} alt="" />
        </div>
        <div className="info">
            <img className="cover-image" src={data.Media.coverImage.large} alt="" />
            <div className="anime-details">
                <h1>{data.Media.title.english}</h1>
                <br />
                <div dangerouslySetInnerHTML={{ __html: data.Media.description }} className="description    "></div>
            </div>
        </div>
        </div>
   )

}