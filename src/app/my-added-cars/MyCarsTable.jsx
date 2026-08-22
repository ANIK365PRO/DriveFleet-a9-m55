"use client";

import Link from "next/link";
import { Button, Chip, Table } from "@heroui/react";

const statusColorMap = {
    available: "success",
    unavailable: "danger",
    maintenance: "warning",
};

const columns = [
    { id: "car", name: "Car" },
    { id: "type", name: "Type" },
    { id: "price", name: "Price / Day" },
    { id: "seats", name: "Seats" },
    { id: "location", name: "Location" },
    { id: "availability", name: "Availability" },
    { id: "actions", name: "Actions" },
];

const MyCarsTable = ({ cars = [] }) => {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm sm:rounded-2xl">
            <Table>
                {/* Responsive horizontal scroll */}
                <Table.ScrollContainer className="w-full overflow-x-auto">
                    <Table.Content
                        aria-label="My added cars table"
                        className="min-w-[950px]"
                    >
                        {/* ================= Table Header ================= */}
                        <Table.Header className="bg-primary">
                            {columns.map((column) => (
                                <Table.Column
                                    key={column.id}
                                    id={column.id}
                                    isRowHeader={column.id === "car"}
                                    className="h-12 px-4 text-xs font-semibold uppercase tracking-wide text-white sm:h-14 sm:text-sm"
                                >
                                    {column.name}
                                </Table.Column>
                            ))}
                        </Table.Header>

                        {/* ================= Table Body ================= */}
                        <Table.Body
                            items={cars}
                            renderEmptyState={() => (
                                <div className="flex min-h-56 items-center justify-center px-6 text-center">
                                    <div className="max-w-sm">
                                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface text-2xl">
                                            🚗
                                        </div>

                                        <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                                            No cars added yet
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                                            You haven't listed any cars yet.
                                            Add your first car to start renting
                                            it out.
                                        </p>
                                    </div>
                                </div>
                            )}
                        >
                            {(car) => {
                                const status =
                                    car.availabilityStatus?.toLowerCase();

                                return (
                                    <Table.Row
                                        key={car._id}
                                        className="border-b border-border transition-colors hover:bg-surface"
                                    >
                                        {/* ================= Car ================= */}
                                        <Table.Cell className="px-4 py-4">
                                            <div className="flex min-w-[220px] items-center gap-3">
                                                <img
                                                    src={car.imageUrl}
                                                    alt={car.carName}
                                                    className="h-12 w-16 shrink-0 rounded-lg object-cover sm:h-14 sm:w-20 sm:rounded-xl"
                                                />

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-text-primary sm:text-[15px]">
                                                        {car.carName}
                                                    </p>

                                                    <p className="mt-1 truncate text-xs text-text-muted">
                                                        {car.ownerName}
                                                    </p>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* ================= Type ================= */}
                                        <Table.Cell className="px-4 py-4">
                                            <span className="whitespace-nowrap text-sm font-medium text-text-secondary">
                                                {car.carType}
                                            </span>
                                        </Table.Cell>

                                        {/* ================= Price ================= */}
                                        <Table.Cell className="px-4 py-4">
                                            <div className="whitespace-nowrap">
                                                <span className="text-sm font-bold text-primary">
                                                    ৳{car.dailyRentPrice}
                                                </span>

                                                <span className="ml-1 text-xs text-text-muted">
                                                    / day
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* ================= Seats ================= */}
                                        <Table.Cell className="px-4 py-4">
                                            <span className="whitespace-nowrap text-sm text-text-secondary">
                                                {car.seatCapacity} seats
                                            </span>
                                        </Table.Cell>

                                        {/* ================= Location ================= */}
                                        <Table.Cell className="px-4 py-4">
                                            <div className="flex max-w-[180px] items-center gap-1.5">
                                                <span className="text-xs text-accent">
                                                    ●
                                                </span>

                                                <span
                                                    className="truncate text-sm text-text-secondary"
                                                    title={car.pickupLocation}
                                                >
                                                    {car.pickupLocation}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* ================= Availability ================= */}
                                        <Table.Cell className="px-4 py-4">
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color={
                                                    statusColorMap[status] ||
                                                    "warning"
                                                }
                                                className="capitalize"
                                            >
                                                {car.availabilityStatus}
                                            </Chip>
                                        </Table.Cell>

                                        {/* ================= Actions ================= */}
                                        <Table.Cell className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    as={Link}
                                                    href={`/my-added-cars/update/${car._id}`}
                                                    size="sm"
                                                    className="bg-gold px-3 font-semibold text-primary transition-opacity hover:opacity-90"
                                                >
                                                    Update
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    className="bg-error/10 px-3 font-semibold text-error transition-colors hover:bg-error/20"
                                                    onPress={() =>
                                                        console.log(
                                                            "Delete car:",
                                                            car._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default MyCarsTable;