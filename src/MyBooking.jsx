import { useState } from "react";

function MyBooking() {

    const [bookings, setBookings] = useState(
        JSON.parse(localStorage.getItem("bookings")) || []
    );

    const [selected, setSelected] = useState([]);

    function cancelBooking(id) {

    const updatedBookings = bookings.map((item) => {

        if (item.bookingId === id) {
            return {
                ...item,
                status: "Cancelled"
            };
        }

        return item;
    });

    setBookings(updatedBookings);

    localStorage.setItem(
        "bookings",
        JSON.stringify(updatedBookings)
    );
}

    function selectBooking(id) {

        if (selected.includes(id)) {

            setSelected(
                selected.filter((item) => item !== id)
            );

        } else {

            setSelected([
                ...selected,
                id
            ]);
        }
    }

    function deleteSelected() {

        const updatedBookings = bookings.filter(
            (item) => !selected.includes(item.bookingId)
        );

        setBookings(updatedBookings);

        localStorage.setItem(
            "bookings",
            JSON.stringify(updatedBookings)
        );

        setSelected([]);
    }

    return (
        <>
        <a href="/">
    <h1>Royal Stay Hotel</h1>
</a>
            <h1>My Booking</h1>

            <h2>Total Bookings: {bookings.length}</h2>

            {bookings.map((item) => (

                <div key={item.bookingId}>

                    <input
                        type="checkbox"
                        checked={selected.includes(item.bookingId)}
                        onChange={() =>
                            selectBooking(item.bookingId)
                        }
                    />

                    <h2>{item.hotelName}</h2>

                    <p>
                        Customer Name: {item.customerName}
                    </p>

                    <p>
                        Room Type: {item.roomType}
                    </p>

                    <p>
                        Rooms: {item.rooms}
                    </p>

                    <p>
                        Price: ₹{item.price}
                    </p>

                   {item.status !== "Cancelled" && (
    <button
        onClick={() =>
            cancelBooking(item.bookingId)
        }
    >
        Cancel Booking
    </button>
)}

{item.status === "Cancelled" && (
    <p style={{ color: "red" }}>
        Booking Cancelled
    </p>
)}

                    <hr />

                </div>

            ))}

            {selected.length > 0 && (
                <button onClick={deleteSelected}>
                    Delete Selected
                </button>
            )}
        </>
    );
}

export default MyBooking;