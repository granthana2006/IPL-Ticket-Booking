
function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Experience The Stadium Energy Live!</h1>

                <p>
                    Feel every boundary, every six and every
                    unforgettable moment.
                </p>

                <button onClick={() => {
    document.getElementById("matches")?.scrollIntoView({
        behavior: "smooth"
    });
}}>
    Explore Matches
</button>
            </div>
        </section>
    );
}

export default Hero;
