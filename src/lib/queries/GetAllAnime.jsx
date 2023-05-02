import {gql} from "@apollo/client"
 
export const GET_ALL_ANIME = gql`
query getAllAnime($page: Int, $perPage: Int){
    Page(page: $page, perPage: $perPage){
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false){
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

export const GET_ROMANCE_ANIME = gql `
query getRomanceAnime($page: Int, $perPage: Int){
  Page(page: $page, perPage: $perPage){
    media(type: ANIME, sort: POPULARITY_DESC, isAdult: false, genre_in: ["Romance", "Drama"], genre_not_in: ["Action", "Comedy"]){
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

export const GET_ROMCOM_ANIME = gql `
query getRomComAnime($page: Int, $perPage: Int){
  Page(page: $page, perPage: $perPage){
    media(type: ANIME, sort: SCORE_DESC, isAdult: false, genre_in: ["Romance", "Comedy"], genre_not_in: "Drama"){
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

export const GET_ACTION_ANIME = gql `
query getRomComAnime($page: Int, $perPage: Int){
  Page(page: $page, perPage: $perPage){
    media(type: ANIME, sort: POPULARITY_DESC, isAdult: false, genre_in: "Action"){
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
export const GET_MUSIC_ANIME = gql `
query getRomComAnime($page: Int, $perPage: Int){
  Page(page: $page, perPage: $perPage){
    media(type: ANIME, sort: POPULARITY_DESC, isAdult: false, genre_in: "Music"){
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

export const GET_SPECIFIC_GENRE = gql`
query getSpecificGenre($specificGenre: String){
  Page(page: 1, perPage: 50){
    media(type: ANIME, sort: POPULARITY_DESC, isAdult: false, genre: $specificGenre){
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
      episodes
      startDate {
        year
        month
        day
      }
    	endDate {
    	  year
    	  month
    	  day
    	}
      season
      status
      favourites
      genres
      characters(sort: FAVOURITES_DESC) {
        edges {
          id
          node {
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
    }
}
`

export const GET_SIMILAR_ANIME = gql `
query getSimilarAnime($idNum: Int){
  Media(id: $idNum){
    recommendations{
      nodes{
        mediaRecommendation{
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
        }
      }
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
    media(type: ANIME, search: $titleSearch, sort:SCORE_DESC, isAdult: false){
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
      averageScore
    }
  }
}
`