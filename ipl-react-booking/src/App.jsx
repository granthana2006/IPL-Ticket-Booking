
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchMatches() {
        const { data, error } = await supabase
            .from("matches")
            .select("*");

        if (error) {
            console.error("Error fetching matches:", error);
        } else {
            setMatches(data);
        }

        setLoading(false);
    }

    // Fetch matches when the component loads
    useEffect(() => {
        fetchMatches();
    }, []);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel("matches-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "matches"
                },
                () => {
                    fetchMatches();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <>
            <Navbar />
            <Hero />

            <section className="matches-section" id="matches">
                <h1>Upcoming Matches</h1>

                {loading ? (
                    <p>Loading matches...</p>
                ) : (
                    <div className="matches-grid">
                        {matches.map((match) => (
                            <MatchCard
                                key={match.id}
                                id={match.id}
                                team1={match.team1}
                                team2={match.team2}
                                date={match.match_date}
                                venue={match.venue}
                                price={match.ticket_price}
                                availableSeats={match.available_seats}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

export default App;
