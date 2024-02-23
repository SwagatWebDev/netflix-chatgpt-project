import Login from "./Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Browse from "./Browse";
import ManageProfile from "./ManageProfile";
import PlayMovie from "./PlayMovie";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/browse",
        element: <Browse/>,
    },
    {
        path: "/manage-profile",
        element: <ManageProfile/>,
    },
    {
        path: "/play-movie/:movieId",
        element: <PlayMovie/>,
    },
    {
        path: "/browse/play-movie",
        element: <PlayMovie/>,
    },
]);
export const Body = () => {

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};

export default Body;
