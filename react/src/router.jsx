import {createBrowserRouter} from "react-router-dom"
import HomePage from "./views/homePage"
import NotFound from "./views/notFound"

const router = createBrowserRouter([
{
    path: '/',
    element:<HomePage/>,

    children: [{
        path: '/calc',
        element:<HomePage/>
    }]
 },
{
    path: '*',
    element:<NotFound/>
}
])

export default router