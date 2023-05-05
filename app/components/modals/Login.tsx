"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const Login = () => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setLoading(false);

      if (callback?.ok) {
        toast.success("Login successful", {
          position: "top-center",
          duration: 2000,
        });

        router.refresh();

        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error, {
          position: "top-center",
          duration: 2000,
        });
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />

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
    loginModal.onClose();

    registerModal.onOpen();
  }, [loginModal, registerModal]);

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
        <p>Don't have an account?</p>

        <button
          className="text-neutral-800 font-semibold hover:underline"
          onClick={toggle}
        >
          Sign up
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={() => loginModal.onClose()}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      disabled={loading}
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default Login;
