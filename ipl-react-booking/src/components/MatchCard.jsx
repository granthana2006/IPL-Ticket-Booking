
import { supabase } from "../supabase";

function MatchCard(props) {

    async function bookTicket() {
        const customerName = prompt("Enter your name:");

        if (!customerName || !customerName.trim()) {
            return;
        }

        if (props.availableSeats < 1) {
            alert("Sorry, no seats available!");
            return;
        }

        const { error: bookingError } = await supabase
            .from("bookings")
            .insert([
                {
                    match_id: props.id,
                    customer_name: customerName.trim(),
                    tickets: 1,
                    total_price: props.price
                }
            ]);

        if (bookingError) {
            alert("Booking failed: " + bookingError.message);
            return;
        }

        const { error: updateError } = await supabase
            .from("matches")
            .update({
                available_seats: props.availableSeats - 1
            })
            .eq("id", props.id);

        if (updateError) {
            alert("Seat update failed: " + updateError.message);
            return;
        }

        alert("Ticket booked successfully!");
    }

    return (
        <div className="match-card">
            <h2>{props.team1} vs {props.team2}</h2>

            <p><strong>Date:</strong> {props.date}</p>

            <p><strong>Venue:</strong> {props.venue}</p>

            <h3>Ticket Price: ₹{props.price}</h3>

            <p>Available Seats: {props.availableSeats}</p>

            <button onClick={bookTicket}>
                Book Ticket
            </button>
        </div>
    );
}

export default MatchCard;
