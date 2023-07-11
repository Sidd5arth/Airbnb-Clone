import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title="Unathorized"
                subtitle="Please Login"/>
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                title="No trips found" 
                subtitle="Looks like you have no reservationd on ypur property" 
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationClient
            reservations={reservations}
            currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default ReservationPage;