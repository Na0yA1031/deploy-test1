import Search from "../components/Search";
import SearchResult from "../components/SearchResult";


export const searchRoutes = [
    {
        path: '/',
        exact: true,
        children: <Search />
    },
    {
        path: '/result',
        exact: false,
        children: <SearchResult />
    }
]