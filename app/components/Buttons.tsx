"use client";
import Link from "next/link";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { Avatar, Button, Icon, Spinner } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HiCheck } from "react-icons/hi";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner data-testid="sign-in-button-spinner" size={"sm"} />;
  }

  if (status === "authenticated") {
    return (
      <Link data-testid="dashboard-link" href={`/dashboard`}>
        <Avatar data-testid="user-avatar" name={session.user?.image!} src={session.user?.image!} size={"sm"} />
      </Link>
    );
  }

  return <Button onClick={() => signIn()}>Sign in</Button>;
}

export function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}

export function SubmitButton({ completed }: { completed: boolean | undefined }) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button data-testid="submit-button" isLoading={pending} colorScheme="green" type="submit" isDisabled={pending}>
        {completed ? (
          <>
            <Icon data-testid="checkmark" as={HiCheck} mr={1} />
            Done
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </>
  );
}
