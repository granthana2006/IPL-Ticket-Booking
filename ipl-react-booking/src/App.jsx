
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";


// Match Data
const matches = [
    {
        id: 1,
        team1: "RCB",
        team2: "CSK",
        date: "10 Nov 2026, 7:30 PM",
        venue: "Bengaluru",
        price: 800
    },
    {
        id: 2,
        team1: "MI",
        team2: "KKR",
        date: "12 Nov 2026, 7:30 PM",
        venue: "Mumbai",
        price: 700
    },
    {
        id: 3,
        team1: "SRH",
        team2: "DC",
        date: "14 Nov 2026, 3:30 PM",
        venue: "Hyderabad",
        price: 600
    },
    {
        id: 4,
        team1: "RR",
        team2: "PBKS",
        date: "16 Nov 2026, 7:30 PM",
        venue: "Jaipur",
        price: 750
    },
    {
        id: 5,
        team1: "GT",
        team2: "LSG",
        date: "18 Nov 2026, 7:30 PM",
        venue: "Ahmedabad",
        price: 650
    },
    {
        id: 6,
        team1: "CSK",
        team2: "MI",
        date: "20 Nov 2026, 7:30 PM",
        venue: "Chennai",
        price: 850
    }
];

function App() {
    return (
        <>
            <Navbar />
            <Hero />

            <section className="matches-section">
                <h1>Upcoming Matches</h1>

                <div className="matches-grid">

                    {matches.map((match) => (
                        <MatchCard
                            key={match.id}
                            team1={match.team1}
                            team2={match.team2}
                            date={match.date}
                            venue={match.venue}
                            price={match.price}
                        />
                    ))}

                </div>
            </section>
           
        </>
    );
}

export default App;
