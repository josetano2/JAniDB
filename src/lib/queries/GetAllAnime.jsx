import {gql} from "@apollo/client"
 
export const GET_ALL_ANIME = gql`
query getAllAnime($page: Int, $perPage: Int){
    Page(page: $page, perPage: $perPage){
      media(type: ANIME, sort: SCORE_DESC, isAdult: false){
        id
        title {
          english
          native
        }
        averageScore
        episodes
        coverImage {
          large
        }
        description
      }
    }
  }
`

export const GET_DETAILS = gql`
query getDetails($idNum: Int){
    Media(id: $idNum){
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      averageScore
      episodes
      bannerImage
      description
      coverImage {
        large
      }
    }
}
`

export const GET_AIRING_ANIME = gql`
query getAiringAnime($page: Int, $perPage: Int){
  Page(page: $page, perPage: $perPage){
    media(type: ANIME, status: RELEASING, season: SPRING, seasonYear: 2023, sort:POPULARITY_DESC){
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      averageScore
      episodes
      coverImage {
        extraLarge
      }
      bannerImage
    }
  }
}
`

export const GET_SEARCH_ANIME = gql`
query getAllAnimeSearch($titleSearch: String){
  Page(page: 1, perPage: 20){
    media(type: ANIME, search: $titleSearch, sort:POPULARITY_DESC, isAdult: false){
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      coverImage{
        large
      }
    }
  }
}
`