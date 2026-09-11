import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Location from './Location';
function App() {

    const navigate = useNavigate();

    const [hotel, setHotel] = useState([]);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const[location, setLocation] = useState("");

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
            console.log(hotels);
        });
    }, []);

    

    return (
        <>
            <h1>Royal Stay Hotel</h1>
            <a href="/mybooking">My Booking</a>
            <br />
            <Location 
            location={location}
            setlocation={setLocation}
            required/>

            <label>Check-in</label>
<input
    type="date"
    value={checkin}
    onChange={(e) => setCheckin(e.target.value)}
required />

<label>Check-out</label>
<input
    type="date"
    value={checkout}
    onChange={(e) => setCheckout(e.target.value)}
required />

<button onClick={() =>{
        if(!location ||  !checkin || !checkout){
            alert("Please fill all the fields");
            return;
        }
        navigate("/search", 
            {state: {location: location}}
        );
    
}}>Search</button>

        </>
    );
}

export default App;