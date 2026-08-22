"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { deleteCarPost } from "@/lib/actions/car";

const DeleteCarDialog = ({ car, ownerEmail }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const result = await deleteCarPost(
            car._id,
            ownerEmail
        );

        console.log("Delete result:", result);

        if (result.deletedCount > 0) {
            router.refresh();
        }
    };

    return (
        <AlertDialog>
            {/* Delete Button */}
            <Button
                size="sm"
                variant="flat"
                className="
                    h-9
                    rounded-lg
                    border
                    border-error/20
                    bg-error/10
                    px-3
                    text-sm
                    font-semibold
                    text-error
                    transition-all
                    hover:border-error/30
                    hover:bg-error/15
                    active:scale-95
                "
            >
                Delete
            </Button>

            <AlertDialog.Backdrop
                className="
                    bg-primary/60
                    backdrop-blur-sm
                "
            >
                <AlertDialog.Container>
                    <AlertDialog.Dialog
                        className="
                            w-[calc(100%-2rem)]
                            max-w-[420px]
                            overflow-hidden
                            rounded-2xl
                            border
                            border-border
                            bg-card
                            shadow-2xl
                        "
                    >
                        {/* Close Button */}
                        <AlertDialog.CloseTrigger />

                        {/* Header */}
                        <AlertDialog.Header
                            className="
                                border-b
                                border-border
                                px-5
                                pb-4
                                pt-5
                                sm:px-6
                                sm:pt-6
                            "
                        >
                            <AlertDialog.Icon
                                status="danger"
                                className="bg-error/10 text-error"
                            />

                            <AlertDialog.Heading
                                className="
                                    mt-4
                                    text-lg
                                    font-bold
                                    text-text-primary
                                    sm:text-xl
                                "
                            >
                                Delete this car?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        {/* Body */}
                        <AlertDialog.Body
                            className="
                                px-5
                                py-5
                                sm:px-6
                            "
                        >
                            <p
                                className="
                                    text-sm
                                    leading-6
                                    text-text-secondary
                                "
                            >
                                Are you sure you want to permanently
                                delete{" "}
                                <strong className="font-semibold text-text-primary">
                                    {car.carName}
                                </strong>
                                ?
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-xs
                                    leading-5
                                    text-text-muted
                                "
                            >
                                This action cannot be undone. The car will
                                be permanently removed from your listings.
                            </p>
                        </AlertDialog.Body>

                        {/* Footer */}
                        <AlertDialog.Footer
                            className="
                                flex
                                flex-col-reverse
                                gap-2
                                border-t
                                border-border
                                bg-surface
                                px-5
                                py-4
                                sm:flex-row
                                sm:justify-end
                                sm:px-6
                            "
                        >
                            <Button
                                slot="close"
                                variant="tertiary"
                                className="
                                    w-full
                                    rounded-lg
                                    font-semibold
                                    text-text-secondary
                                    hover:bg-card
                                    hover:text-text-primary
                                    sm:w-auto
                                "
                            >
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                variant="danger"
                                className="
                                    w-full
                                    rounded-lg
                                    bg-error
                                    px-5
                                    font-semibold
                                    text-white
                                    transition-all
                                    hover:opacity-90
                                    active:scale-95
                                    sm:w-auto
                                "
                                onPress={handleDelete}
                            >
                                Delete Car
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteCarDialog;