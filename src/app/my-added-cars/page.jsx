import { getMyCars } from "@/lib/api/car";
import MyCarsTable from "./MyCarsTable";
import { getUserSession } from "@/lib/core/session";

const MyAddedCarsPage = async () => {
    const user = await getUserSession();

    const ownerEmail = user?.email;

    const myCars = ownerEmail
        ? await getMyCars(ownerEmail)
        : [];

    console.log("myCars", myCars);

    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            <div className="mx-auto w-full max-w-7xl">

                {/* ================= Header ================= */}
                <div className="mb-8 sm:mb-10">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-8 w-1 rounded-full bg-gold sm:h-9" />

                        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                            My Fleet
                        </p>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                        My Added Cars
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                        Manage your listed cars, update their information,
                        or remove a car from your listings.
                    </p>
                </div>

                {/* ================= Stats ================= */}
                <div className="mb-6 grid grid-cols-3 gap-3 sm:mb-8 sm:gap-4 lg:max-w-2xl mx-auto text-center">
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <p className="text-xs font-medium text-text-secondary sm:text-sm">
                            Total Cars
                        </p>

                        <p className="mt-1 text-2xl font-bold text-info/50 sm:text-3xl">
                            {myCars.length}
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <p className="text-xs font-medium text-text-secondary sm:text-sm">
                            Available Cars
                        </p>

                        <p className="mt-1 text-2xl font-bold text-success/50 sm:text-3xl">
                            {
                                myCars.filter(
                                    (car) =>
                                        car.availabilityStatus?.toLowerCase() ===
                                        "available"
                                ).length
                            }
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <p className="text-xs font-medium text-text-secondary sm:text-sm">
                            Maintenance Cars
                        </p>

                        <p className="mt-1 text-2xl font-bold text-warning/50 sm:text-3xl">
                            {
                                myCars.filter(
                                    (car) =>
                                        car.availabilityStatus?.toLowerCase() ===
                                        "maintenance"
                                ).length
                            }
                        </p>
                    </div>
                </div>

                {/* ================= Table ================= */}
                <section className="w-full">
                    <MyCarsTable cars={myCars} />
                </section>
            </div>
        </main>
    );
};

export default MyAddedCarsPage;