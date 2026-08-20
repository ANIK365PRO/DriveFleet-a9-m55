const BannerSection = () => {
    return (
        <section
            className="
                relative isolate
                overflow-hidden
                min-h-[560px]
                sm:min-h-[600px]
                lg:min-h-[680px]
            "
        >
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/hero-poster.webp"
                aria-hidden="true"
                className="
                    absolute inset-0
                    h-full w-full
                    object-cover
                    object-center
                    pointer-events-none
                "
            >
                <source
                    src="/videos/hero-car.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Light Mode Overlay */}
            <div
                className="
                    absolute inset-0
                    bg-black/35
                    dark:bg-[#080f1c]/65
                "
            />

            {/* Gradient Overlay */}
            <div
                className="
                     absolute inset-0
                    bg-gradient-to-r
                    from-black/55
                    via-black/25
                    to-transparent
                    dark:from-[#080f1c]/85
                    dark:via-[#080f1c]/50
                    dark:to-transparent
                "
            />

            {/* Hero Content */}
            <div
                className="
                
                    relative z-10
            
                    mx-auto
                    max-w-6xl
                    min-h-[560px]
                    items-center
                    px-4 py-20
                    sm:min-h-[600px]
                    sm:px-6
                    lg:min-h-[680px]
                    lg:px-8
                "
            >
                <div
                    className="
                        w-full
                        max-w-3xl
                        text-center
                        lg:text-left
                    "
                >
                    {/* Heading */}
                    <h1
                        className="
                            text-4xl
                            font-bold
                            leading-tight
                            tracking-tight
                            text-white
                            sm:text-5xl
                            lg:text-6xl
                            xl:text-7xl
                        "
                    >
                        Your Journey Begins

                        <span
                            className="
                                block
                                text-gold
                            "
                        >
                            With The Perfect Car
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-base
                            leading-7
                            text-white/85
                            sm:text-lg
                            lg:mx-0
                        "
                    >
                        Discover our premium selection of vehicles.
                        From luxury to economy, find your perfect
                        ride for any occasion.
                    </p>

                    {/* CTA */}
                    <div
                        className="
                            mt-8
                            flex
                            justify-center
                            lg:justify-start
                        "
                    >
                        <button
                            type="button"
                            className="
                                rounded-lg
                                bg-gold
                                px-7 py-3.5
                                font-bold
                                text-primary
                                shadow-lg
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                                hover:opacity-90
                            "
                        >
                            Browse Cars
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-10
                "
            >
                <div
                    className="
                        mx-auto
                        grid
                        max-w-5xl
                        grid-cols-3
                        border-t
                        border-white/15
                        bg-primary/25
                        backdrop-blur-md
                        dark:bg-primary/60
                    "
                >
                    {/* Stat 1 */}
                    <div
                        className="
                        
                            px-2
                            py-4
                            text-center
                            sm:py-5
                        "
                    >
                        <div
                            className="
                                text-xl
                                font-bold
                                text-white
                                sm:text-2xl
                            "
                        >
                            1000+
                        </div>

                        <div
                            className="
                                mt-1
                                text-xs
                                text-white/70
                                sm:text-sm
                            "
                        >
                            Vehicles
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div
                        className="
                            border-x
                            border-white/15
                            px-2
                            py-4
                            text-center
                            sm:py-5
                        "
                    >
                        <div
                            className="
                                text-xl
                                font-bold
                                text-white
                                sm:text-2xl
                            "
                        >
                            10,000+
                        </div>

                        <div
                            className="
                                mt-1
                                text-xs
                                text-white/70
                                sm:text-sm
                            "
                        >
                            Happy Customers
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div
                        className="
                            px-2
                            py-4
                            text-center
                            sm:py-5
                        "
                    >
                        <div
                            className="
                                text-xl
                                font-bold
                                text-gold
                                sm:text-2xl
                            "
                        >
                            4.8/5
                        </div>

                        <div
                            className="
                                mt-1
                                text-xs
                                text-white/70
                                sm:text-sm
                            "
                        >
                            Average Rating
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;