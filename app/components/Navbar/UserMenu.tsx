"use client";

import { useState, useCallback } from "react";
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu:React.FC <UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=>{
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() =>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    const handleMenuItemClick = useCallback(() => {
        toggleOpen();
    }, [toggleOpen]);

    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                onClick={onRent}
                   className="
                   hidden
                   md:block
                   text-sm
                   font semibold
                   py-3
                   px-4
                   rounded-full
                   hover:bg-neutral-100
                   transition
                   cursor-pointer">
                    Airbnb your home
                </div>
                <div 
                onClick={toggleOpen}
                className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen &&(
                <div>
                <div
                className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                right-0
                top-12
                text-sm
                z-[50]
                ">
                  <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                        <MenuItems
                        onClick={() => {router.push('/trips'); handleMenuItemClick();}}
                        lable="My trips"
                        />
                        <MenuItems
                        onClick={() => {router.push('/favorites'); handleMenuItemClick();}}
                        lable="My Favorites"
                        />
                        <MenuItems
                        onClick={() => {router.push('/reservations'); handleMenuItemClick();}}
                        lable="My Reservations"
                        />
                        <MenuItems
                        onClick={() => {router.push('/properties'); handleMenuItemClick();}}
                        lable="My Properties"
                        />
                        <MenuItems
                        onClick={() => {rentModal.onOpen(); handleMenuItemClick();}}
                        lable="Airbnb My home"
                        />
                        <hr/>
                        <MenuItems
                        onClick={() =>{signOut(); handleMenuItemClick();}}
                        lable="Logout"
                        />
                       </>
                    ) : (
                        <>
                        <MenuItems
                        onClick={loginModal.onOpen}
                        lable="Login"
                        />
                        <MenuItems
                        onClick={registerModal.onOpen}
                        lable="Sign up"
                        />
                         </>
                    )}
                  </div>  
                </div>
                <div 
                onClick={handleMenuItemClick}
                className="
                fixed
                top-0
                left-0
                w-screen
                h-screen
                opacity-0
                z-[40]
                ">    
                </div>
                </div>
            )}
        </div>
     );
}
 
export default UserMenu;