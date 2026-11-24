
function MatchCard(props) {
    return (
        <div className="match-card">

            <h2>{props.team1} vs {props.team2}</h2>

            <p><strong>Date:</strong> {props.date}</p>

            <p><strong>Venue:</strong> {props.venue}</p>

            <h3>Ticket Price: ₹{props.price}</h3>

            <button>Book Ticket</button>

        </div>
    );
}

export default MatchCard;
