import { useLocation } from "react-router-dom";

function Success() {

    const { state } = useLocation();

    const bookingDetails = state?.bookingDetails;

    if (!bookingDetails) {
        return <h1>No Booking Details</h1>;
    }

    return (
        <>
        <a href="/">
    <h1>Royal Stay Hotel</h1>
</a>
            <a href="/mybooking">My Booking</a>
            <h1>🎉 Your Booking Successfully!</h1>
            
            <p>Thank you for booking with us.</p>

            <h2>Booking Confirmed ✅</h2>

            {Object.entries(bookingDetails).map(([hotelId, details]) => (

                <div key={hotelId}>

                    <h3>Hotel ID: {hotelId}</h3>

                    <p>Customer Name: {details.name}</p>

                    <p>Room Type: {details.roomType}</p>

                    <p>Number of Rooms: {details.rooms}</p>

                    <hr />

                </div>

            ))}

        </>
    );
}

export default Success;