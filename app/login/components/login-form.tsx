"use client";
import {
  Button,
  Center,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async(data) =>{
    await signInHandler(data)
  }

  const signInHandler = async (data: Inputs) => {
    const { email, password } = data;
    try {
      const userCredential =
        await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await signIn("credentials",{
        idToken,
        callbackUrl:"/dashboard"
      });

    } catch (error) {
      console.log("error");
      alert("ログインに失敗しました")
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper w="100%" radius="md" shadow="lg">
        <Flex w="100%" p={12} direction="column">
          <Stack gap="md">
            <Center>Login</Center>
            <TextInput
              label="email"
              {...register("email", { required: true })}
            />
            <PasswordInput
              label="password"
              {...register("password", { required: true })}
            />
            <Button type="submit" mt={12}>
              ログイン
            </Button>
          </Stack>
        </Flex>
      </Paper>
    </form>
  );
};

export default LoginForm;
