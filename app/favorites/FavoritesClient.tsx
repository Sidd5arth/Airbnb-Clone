import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";
import { SafeListings, SafeUser } from "../types";

interface FavoritesClientProps {
    listings: SafeListings[];
    currentUser: SafeUser | null
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return ( 
        <Container> 
            <Heading
            title="Favorites"
            subtitle="List of Places you have favorited"/>
            <div className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                    gap-8">
                        {listings.map((listing) => (
                            <ListingCard
                            currentUser={currentUser}
                            key={listing.id}
                            data={listing}/>
                        ))}
            </div>
        </Container>
    );
}
 
export default FavoritesClient;