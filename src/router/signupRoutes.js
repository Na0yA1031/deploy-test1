import SignUp from "../components/SignUp";
import SignUpResult from "../components/SignUpResult"


export const signupRoutes = [
    {
        path: '/',
        exact: true,
        children: <SignUp />
    },
    {
        path: '/result',
        exact: false,
        children: <SignUpResult />
    }
]