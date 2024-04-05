import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/dashboard/Form/ActivityForm";
import ActivityDetails from "../../features/activities/dashboard/ActivityDetail";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: < App/>,
        children: [
            {path:'activities',element: <ActivityDashboard />},
            {path:'activities/:id',element: <ActivityDetails />},
            {path:'manage/:id',element: <ActivityForm key='manage' />},
            {path:'createActivity',element: <ActivityForm key='create' />}
        ]
    },
]

export const router = createBrowserRouter(routes);