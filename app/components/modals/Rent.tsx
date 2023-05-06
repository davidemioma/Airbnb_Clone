"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import axios from "@/util/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageUpload from "../inputs/ImageUpload";
import { categories } from "../../../util/helper";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import useRentModal from "@/app/hooks/useRentModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const Rent = () => {
  const router = useRouter();

  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");

  const location = watch("location");

  const guestCount = watch("guestCount");

  const roomCount = watch("roomCount");

  const bathroomCount = watch("bathroomCount");

  const imgSrc = watch("imgSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return setStep((prev) => prev + 1);
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listings Created!", {
          position: "top-center",
          duration: 2000,
        });

        router.refresh();

        reset();

        setStep(STEPS.CATEGORY);

        rentModal.onClose();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong!", {
          position: "top-center",
          duration: 2000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a Category"
      />

      <div className="grid md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <CategoryInput
            key={item.label}
            label={item.label}
            Icon={item.icon}
            selected={category === item.label}
            onClick={() => setCustomValue("category", item.label)}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />

        <hr />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />

        <hr />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />

        <ImageUpload
          value={imgSrc}
          onChange={(value) => setCustomValue("imgSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />

        <Input
          id="title"
          label="Title"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />

        <hr />

        <Input
          id="description"
          label="Description"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />

        <Input
          id="price"
          label="Price"
          type="number"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={() => rentModal.onClose()}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      title="Airbnb your home!"
      actionLabel={step === STEPS.PRICE ? "Create" : "Next"}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : "Back"}
      secondaryAction={
        step === STEPS.CATEGORY ? undefined : () => setStep((prev) => prev - 1)
      }
      body={bodyContent}
    />
  );
};

export default Rent;
