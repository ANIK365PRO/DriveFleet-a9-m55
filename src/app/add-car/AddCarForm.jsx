"use client";

import { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import {
  Car,
  CircleCheck,
  ImageIcon,
  MapPin,
  UserRound,
} from "lucide-react";
import { createNewCarPost } from "@/lib/actions/car";

const inputClass = `
  h-12
  w-full
  rounded-xl
  border
  border-border
  bg-background
  px-4
  text-sm
  text-text-primary
  shadow-sm
  outline-none
  transition-all
  placeholder:text-text-muted
  hover:border-border-strong
  focus:border-primary
  focus:ring-2
  focus:ring-primary/10
`;

const textareaClass = `
  min-h-32
  w-full
  resize-y
  rounded-xl
  border
  border-border
  bg-background
  px-4
  py-3
  text-sm
  text-text-primary
  shadow-sm
  outline-none
  transition-all
  placeholder:text-text-muted
  hover:border-border-strong
  focus:border-primary
  focus:ring-2
  focus:ring-primary/10
`;

const labelClass =
  "mb-2 block text-sm font-semibold text-text-primary";

const helperClass =
  "mt-1.5 text-xs leading-5 text-text-muted";

const AddCarForm = ({ loggedInOwner }) => {
  const [submitted, setSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { name, email, image } = loggedInOwner || {};

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!imageUrl || imageError || !imageLoaded) {
    return;
  }

  const formData = new FormData(event.currentTarget);

  const newCarData = {
    carName: formData.get("carName"),
    dailyRentPrice: Number(formData.get("dailyRentPrice")),
    carType: formData.get("carType"),
    imageUrl: formData.get("imageUrl"),
    seatCapacity: Number(formData.get("seatCapacity")),
    pickupLocation: formData.get("pickupLocation"),
    description: formData.get("description"),
    availabilityStatus: formData.get("availabilityStatus"),

    ownerName: name,
    ownerEmail: email,
    ownerImage: image,
  };

  console.log("Car post Data:", newCarData);

  try {
    setIsLoading(true);
    setServerError("");
    setSubmitted(false);

    const result = await createNewCarPost(newCarData);

    console.log("Create car result:", result);

    if (result?.insertedId) {
      console.log("Car added successfully");

      setImageUrl("");
      setImageError(false);
      setImageLoaded(false);

      setSubmitted(true);
    } else {
      setServerError(
        "Car could not be added. Please try again."
      );
    }
  } catch (error) {
    console.error("Create car error:", error);

    setServerError(
      "Failed to add car. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleImageChange = (event) => {
    const value = event.target.value;

    setImageUrl(value);
    setImageError(false);
    setImageLoaded(false);
    setSubmitted(false);
  };

  const handleImageLoad = () => {
    setImageError(false);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleReset = () => {
      
    setImageUrl("");
    setImageError(false);
    setImageLoaded(false);
    setSubmitted(false);
  };


  return (
    <Form onSubmit={handleSubmit} className="w-full">
      <Fieldset className="w-full">
        {/* =====================================================
            OWNER INFO
        ====================================================== */}
        <div className="mb-7 rounded-xl border border-border bg-surface p-4 sm:mb-8 sm:p-5">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="size-11 shrink-0 overflow-hidden rounded-full border border-border bg-primary">
              {image ? (
                <img
                  src={image}
                  alt={name || "Owner"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gold">
                  <UserRound className="size-5" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Listing Owner
              </p>

              <p className="truncate text-sm font-semibold text-text-primary sm:text-base">
                {name || "Unknown User"}
              </p>

              <p className="truncate text-xs text-text-secondary">
                {email || "No email available"}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            FORM FIELDS
        ====================================================== */}
        <FieldGroup className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
          {/* Car Name */}
          <TextField
            name="carName"
            isRequired
            className="md:col-span-2"
          >
            <Label className={labelClass}>Car Name</Label>

            <Input
              className={inputClass}
              placeholder="e.g. Toyota Corolla 2024"
            />

            <Description className={helperClass}>
              Enter the vehicle brand and model name.
            </Description>

            <FieldError className="mt-1.5 text-xs text-error" />
          </TextField>

          {/* Daily Rent Price */}
          <TextField
            name="dailyRentPrice"
            type="number"
            isRequired
          >
            <Label className={labelClass}>
              Daily Rent Price
            </Label>

            <div className="relative">
              <Input
                className={`${inputClass} pr-16`}
                placeholder="3500"
                min="0"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-text-muted">
                BDT/day
              </span>
            </div>

            <Description className={helperClass}>
              Set the rental price for one day.
            </Description>

            <FieldError className="mt-1.5 text-xs text-error" />
          </TextField>

          {/* Car Type */}
          <div>
            <Label
              htmlFor="carType"
              className={labelClass}
            >
              Car Type
            </Label>

            <select
              id="carType"
              name="carType"
              required
              defaultValue=""
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Select car type
              </option>

              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Van">Van</option>
            </select>

            <p className={helperClass}>
              Choose the category that best describes the car.
            </p>
          </div>

          {/* =====================================================
              IMAGE URL
          ====================================================== */}
          <TextField
            name="imageUrl"
            type="url"
            isRequired
            className="md:col-span-2"
          >
            <div className="flex items-center gap-2">
              <Label className={labelClass}>
                Image URL
              </Label>

              <span className="mb-2 rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                Required
              </span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-text-muted">
                <ImageIcon className="size-4" />
              </div>

              <Input
                className={`${inputClass} pl-11`}
                placeholder="https://i.ibb.co/..."
                value={imageUrl}
                onChange={handleImageChange}
              />
            </div>

            <Description className={helperClass}>
              Use a direct image URL from ImgBB, Postimages, Unsplash,
              or another image hosting service.
            </Description>

            <FieldError className="mt-1.5 text-xs text-error" />

            {/* Image Preview */}
            {imageUrl && !imageError && (
              <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Car preview"
                    className={`
                      h-52
                      w-full
                      object-cover
                      transition-opacity
                      duration-300
                      sm:h-64
                      lg:h-72
                      ${imageLoaded ? "opacity-100" : "opacity-0"}
                    `}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />

                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="size-4 animate-spin rounded-full border-2 border-border border-t-primary" />
                        Loading image...
                      </div>
                    </div>
                  )}

                  {imageLoaded && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-primary/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
                      <CircleCheck className="size-3.5 text-gold" />
                      Image ready
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Invalid Image */}
            {imageUrl && imageError && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-error/20 bg-error/5 p-4">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-error/10">
                  <span className="text-sm font-bold text-error">
                    !
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-error">
                    Invalid image URL
                  </p>

                  <p className="mt-1 text-xs leading-5 text-text-secondary">
                    The image could not be loaded. Please provide a
                    valid direct image URL.
                  </p>
                </div>
              </div>
            )}
          </TextField>

          {/* Seat Capacity */}
          <TextField
            name="seatCapacity"
            type="number"
            isRequired
          >
            <Label className={labelClass}>
              Seat Capacity
            </Label>

            <Input
              className={inputClass}
              placeholder="e.g. 5"
              min="1"
              max="10"
            />

            <Description className={helperClass}>
              Enter the maximum number of passengers.
            </Description>

            <FieldError className="mt-1.5 text-xs text-error" />
          </TextField>

          {/* Pickup Location */}
          <TextField
            name="pickupLocation"
            isRequired
          >
            <Label className={labelClass}>
              Pickup Location
            </Label>

            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-text-muted">
                <MapPin className="size-4" />
              </div>

              <Input
                className={`${inputClass} pl-11`}
                placeholder="e.g. Dhaka Airport"
              />
            </div>

            <Description className={helperClass}>
              Tell customers where they can pick up the car.
            </Description>

            <FieldError className="mt-1.5 text-xs text-error" />
          </TextField>

          {/* Description */}
          <TextField
            name="description"
            isRequired
            className="md:col-span-2"
          >
            <Label className={labelClass}>
              Description
            </Label>

            <TextArea
              className={textareaClass}
              placeholder="Describe the car, its features, condition, and rental terms..."
            />

            <Description className={helperClass}>
              Add useful information about the vehicle for potential
              renters.
            </Description>

            <FieldError className="mt-1.5 text-xs text-error" />
          </TextField>

          {/* Availability */}
          <div className="md:col-span-2">
            <Label
              htmlFor="availabilityStatus"
              className={labelClass}
            >
              Availability Status
            </Label>

            <select
              id="availabilityStatus"
              name="availabilityStatus"
              required
              defaultValue="available"
              className={`${inputClass} cursor-pointer`}
            >
              <option value="available">
                Available
              </option>

              <option value="unavailable">
                Unavailable
              </option>

              <option value="maintenance">
                Under Maintenance
              </option>
            </select>

            <p className={helperClass}>
              Set the current availability of this vehicle.
            </p>
          </div>
        </FieldGroup>

        {/* =====================================================
            ERROR AND SUCCESS MESSAGE
        ====================================================== */}
        {serverError && (
          <div className="mt-6 rounded-xl border border-error/20 bg-error/5 p-4">
            <p className="text-sm font-semibold text-error">
              {serverError}
            </p>
          </div>
        )}


        {submitted && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-success/20 bg-success/5 p-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success/10">
              <CircleCheck className="size-4 text-success" />
            </div>

            <div>
              <p className="text-sm font-semibold text-success">
                Car information submitted successfully.
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                Your car listing has been added successfully.
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            ACTIONS
        ====================================================== */}
        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            {/* Reset */}
            <Button
              type="reset"
              onPress={handleReset}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-card
                px-6
                font-semibold
                text-text-secondary
                transition-all
                hover:border-border-strong
                hover:bg-surface
                hover:text-text-primary
                sm:w-auto
              "
            >
              Reset
            </Button>

            {/* Submit */}
            <Button
              type="submit"
              isDisabled={
                isLoading ||
                !imageUrl ||
                imageError ||
                !imageLoaded
              }
              className="
                h-12
                w-full
                rounded-xl
                bg-primary
                px-7
                font-semibold
                text-white
                shadow-sm
                transition-all
                hover:-translate-y-0.5
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              <Car className="size-4" />
             {isLoading ? "Adding Car..." : "Add Car"}
            </Button>
          </div>

          {/* Submit Hint */}
          <p className="mt-3 text-center text-xs text-text-muted sm:text-right">
            All required fields must be completed before submitting.
          </p>
        </div>
      </Fieldset>
    </Form>
  );
};

export default AddCarForm;