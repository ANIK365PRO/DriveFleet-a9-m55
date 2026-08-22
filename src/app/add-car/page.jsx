import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Car, ArrowLeft } from "lucide-react";

import AddCarForm from "./AddCarForm";
import { auth } from "@/lib/auth";

const AddCarPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/login");
  }

  const loggedInOwner = session?.user;

  console.log("Logged in owner:", loggedInOwner);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
        {/* Page Header */}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            {/* Icon */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-gold shadow-sm sm:size-12 sm:rounded-xl">
              <Car className="size-5 sm:size-6" strokeWidth={2} />
            </div>

            {/* Heading */}
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl lg:text-3xl">
                Add Car
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6">
                Create a new car listing and make it available for customers
                to rent.
              </p>
            </div>
          </div>

          {/* Header Divider */}
          <div className="mt-5 h-px w-full bg-border sm:mt-6" />
        </header>

        {/* Form Section */}
        <section className="w-full">
          <div
            className="
              rounded-xl
              border border-border
              bg-card
              shadow-sm
              sm:rounded-2xl
            "
          >
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <AddCarForm loggedInOwner={loggedInOwner} />
            </div>
          </div>
        </section>

        {/* Bottom Note */}
        <div className="mt-4 flex items-start gap-2 px-1 sm:mt-5">
          <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />

          <p className="text-xs leading-5 text-text-muted sm:text-sm">
            Make sure all car information and the image URL are accurate before
            submitting the listing.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AddCarPage;