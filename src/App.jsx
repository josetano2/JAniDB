import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './pages/Home/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Search from './pages/Search/Search';
import Details from './pages/Details/Details';
import Favorites from './pages/Favorites/Favorites';
import Genre from './pages/Genre/Genre'
import { Helmet } from 'react-helmet';

export default function App(){
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
  }); 

  const title = 'JAniDB'

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/:id",
      element: <Details/>
    },
    {
      path: "/search",
      element: <Search/>,
    },
    {
      path: "/favorites",
      element: <Favorites/>,
    },
    {
      path: "/genre",
      element: <Genre/>
    },
  ]);


  return (
    <ApolloProvider client={client}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
        <RouterProvider router={router} />
    </ApolloProvider>
    
  )
}