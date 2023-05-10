"use client";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const Register = () => {
  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success");

        registerModal.onClose();

        loginModal.onOpen();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong!", {
          position: "top-center",
          duration: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />

      <Input
        id="name"
        type="text"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="email"
        type="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const toggle = useCallback(() => {
    registerModal?.onClose();

    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button
        label="Continue with Google"
        onClick={() => signIn("google")}
        Icon={FcGoogle}
        outline
      />

      <Button
        label="Continue with Github"
        onClick={() => signIn("github")}
        Icon={AiFillGithub}
        outline
      />

      <div className="flex items-center gap-2 mt-4 text-sm text-neutral-500 font-light">
        <p>Already have an account?</p>

        <button
          className="text-neutral-800 font-semibold hover:underline"
          onClick={toggle}
        >
          Log in
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={() => registerModal.onClose()}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      disabled={loading}
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default Register;
