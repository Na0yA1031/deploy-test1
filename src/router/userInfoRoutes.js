import OtherUserInfo from "../components/UserInfo/OtherUserInfo";
import UserInfo from "../components/UserInfo/UserInfo";


export const userInfoRoutes = [
    {
        path: '/',
        exact: true,
        children: <UserInfo />
    },
    {
        path: '/:id',
        exact: false,
        children: <OtherUserInfo />
    }
]