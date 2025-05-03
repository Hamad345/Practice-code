import { useEffect } from "react";

import useUserStore from "../stores/users/UserStore";



export const ChatsBooks = ({ children }) => {
    const { fetchUser } = useUserStore((state) => ({
        fetchUser: state.fetchUser,
    }));

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    useEffect(() => {
        fetchUser(loggedInUser.userId);
        console.log("user called...")
    }, []);

    
    return (
        <section className="relative min-h-[100svh] pt-[4.26rem]">
            {children}
        </section>
    );
};
