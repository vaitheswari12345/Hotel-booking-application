import { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom"; 
import HotelCard from "./HotelCard"; 
import { useNavigate } from "react-router-dom"; 
 
function SearchResult() { 
 
    const { state } = useLocation(); 
    const navigate = useNavigate(); 
 
    const [hotel, setHotel] = useState([]); 
    const [selectedHotels, setSelectedHotels] = useState([]); 
     
 
    useEffect(() => { 
 
        fetch("/tamilnadu_hotels.csv") 
            .then((response) => response.text()) 
            .then((data) => { 
 
                const rows = data.trim().split("\n"); 
 
                const hotels = rows.slice(1).map((row) => { 
 
                    const values = row.split(","); 
 
                    return { 
                        hotel_id: values[0], 
                        hotel_name: values[1], 
                        city: values[2], 
                        state: values[3], 
                        hotel_type: values[4], 
                        rating: values[5], 
                        price_per_night: values[6], 
                        amenities: values[7], 
                        available_rooms: values[8] 
                    }; 
                }); 
 
                setHotel(hotels); 
            }); 
 
    }, []); 
 
    const filteredHotels = hotel.filter( 
        (item) => item.city === state.location 
    ); 

    function selectHotel(id) { 
        if (selectedHotels.includes(id)) {
            setSelectedHotels(
                selectedHotels.filter((item) => item !== id)
            );
        } else {
            setSelectedHotels([...selectedHotels, id]);
        }
    } 
 
    return ( 
        <> 
            <a href="/"> 
                <h1>Royal Stay Hotel</h1> 
            </a> 
            <a href="/mybooking">My Booking</a> 
            <h1>Search Result</h1> 
             
            <h2>Location: {state.location}</h2> 
 
            {filteredHotels.map((item) => ( 
                <div key={item.hotel_id}> 
                    <input 
                        type="checkbox" 
                        checked={selectedHotels.includes(item.hotel_id)}
                        onChange={() => selectHotel(item.hotel_id)} 
                    /> 
                    <HotelCard 
                        key={item.hotel_id} 
                        Name={item.hotel_name} 
                        Location={item.city} 
                        Price={item.price_per_night} 
                        Rating={item.rating} 
                    /> 
 
                </div> 
            ))} 

            <button 
                onClick={() => { 
                    if (selectedHotels.length === 0) { 
                        alert("Please select at least one hotel"); 
                        return; 
                    } 
 
                    navigate("/booking", { 
                        state: { 
                            selectedHotels: selectedHotels 
                        } 
                    }); 
                }} 
            > 
                Continue 
            </button> 
 
        </> 
    ); 
} 
 
export default SearchResult;