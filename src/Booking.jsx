import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Booking() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({});

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
                        price_per_night: values[6],
                        available_rooms: values[8]
                    };
                });

                setHotel(hotels);
            });

    }, []);

    if (!state || !state.selectedHotels) {
        return <h1>No hotels selected</h1>;
    }

    const selectedHotels = hotel.filter((item) =>
        state.selectedHotels.includes(item.hotel_id)
    );

    function updateBooking(id, field, value) {

        setBookingDetails({
            ...bookingDetails,

            [id]: {
                ...bookingDetails[id],
                [field]: value
            }
        });
    }

    function continueBooking() {

        for (const item of selectedHotels) {

            const details = bookingDetails[item.hotel_id];

            if (
                !details ||
                !details.name ||
                !details.roomType ||
                !details.rooms
            ) {
                alert("Please fill all details");
                return;
            }
        }

        const newBookings = selectedHotels.map((item) => {

            const details = bookingDetails[item.hotel_id];

            const nonAcPrice = Number(item.price_per_night);

            const acPrice =
                nonAcPrice + (nonAcPrice * 10 / 100);

            const price =
                details.roomType === "AC"
                    ? acPrice
                    : nonAcPrice;

            return {
                bookingId: Date.now() + Math.random(),
                hotelId: item.hotel_id,
                hotelName: item.hotel_name,
                customerName: details.name,
                roomType: details.roomType,
                rooms: Number(details.rooms),
                price: price
            };
        });

        const oldBookings =
            JSON.parse(localStorage.getItem("bookings")) || [];

        const allBookings = [
            ...oldBookings,
            ...newBookings
        ];

        localStorage.setItem(
            "bookings",
            JSON.stringify(allBookings)
        );

        navigate("/success", {
            state: {
                bookingDetails: bookingDetails,
                bookings: newBookings
            }
        });
    }

    return (
        <>
        <a href="/">
    <h1>Royal Stay Hotel</h1>
</a>
            <a href="/mybooking">My Booking</a>
            <h1>Selected Hotels</h1>
            
            {selectedHotels.map((item) => {

                const nonAcPrice =
                    Number(item.price_per_night);

                const acPrice =
                    nonAcPrice + (nonAcPrice * 10 / 100);

                return (
                    <div key={item.hotel_id}>

                        <h2>{item.hotel_name}</h2>

                        <p>
                            Available Rooms: {item.available_rooms}
                        </p>

                        <label>Customer Name: </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={
                                bookingDetails[item.hotel_id]?.name || ""
                            }
                            onChange={(e) =>
                                updateBooking(
                                    item.hotel_id,
                                    "name",
                                    e.target.value
                                )
                            }
                        />

                        <br />
                        <br />

                        <button
                            onClick={() =>
                                updateBooking(
                                    item.hotel_id,
                                    "roomType",
                                    "Non-AC"
                                )
                            }
                        >
                            Non-AC ₹{nonAcPrice}
                        </button>

                        <button
                            onClick={() =>
                                updateBooking(
                                    item.hotel_id,
                                    "roomType",
                                    "AC"
                                )
                            }
                        >
                            AC ₹{acPrice}
                        </button>

                        <p>
                            Selected:
                            {" "}
                            {bookingDetails[item.hotel_id]?.roomType || "None"}
                        </p>

                        <select
                            value={
                                bookingDetails[item.hotel_id]?.rooms || ""
                            }
                            onChange={(e) =>
                                updateBooking(
                                    item.hotel_id,
                                    "rooms",
                                    e.target.value
                                )
                            }
                        >

                            <option value="">Select Room</option>

                            <option value="1">
                                1 Room
                            </option>

                            <option value="2">
                                2 Rooms
                            </option>

                            <option value="3">
                                3 Rooms
                            </option>

                            <option value="4">
                                4 Rooms
                            </option>

                            <option value="5">
                                5 Rooms
                            </option>

                            <option value="6">
                                6 Rooms
                            </option>

                            <option value="7">
                                7 Rooms
                            </option>

                            <option value="8">
                                8 Rooms
                            </option>

                            <option value="9">
                                9 Rooms
                            </option>

                            <option value="10">
                                10 Rooms
                            </option>

                        </select>

                        <hr />

                    </div>
                );
            })}

            <button onClick={continueBooking}>
                Continue
            </button>
        </>
    );
}

export default Booking;