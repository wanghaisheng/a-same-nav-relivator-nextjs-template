"use client";

import Link from "next/link";
import React from "react";
import type { User } from "~/db/types";
import { signOut, useSession } from "~/lib/auth-client";
import { Button } from "~/ui/components/core/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/ui/components/core/card";
import { Skeleton } from "~/ui/components/core/skeleton";
import { useTranslations } from "next-intl";

type DashboardPageClientProps = {
  user?: User | null;
};

// Extend the User type with optional properties
type ExtendedUser = {
  firstName?: string;
  lastName?: string;
  age?: number;
} & User;

export function DashboardPageClient({ user }: DashboardPageClientProps) {
  const t = useTranslations("DashboardPage");
  const { data, isPending } = useSession();

  // Use the passed user or the session user
  const currentUser = user ?? data?.user;
  const currentUserState = currentUser as ExtendedUser;

  const handleSignOut = () => {
    void signOut();
  };

  // If we're still loading, show a skeleton
  if (isPending) {
    return (
      <div className="container grid flex-1 items-start gap-4 p-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <div className="grid gap-4 md:col-span-2 lg:col-span-1">
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-28" />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
        <p className="mb-4">{t("welcome", { name: "" })}</p>
        <p className="text-gray-500">{t("noUser") || t("empty") || "No user info"}</p>
      </div>
    );
  }

  return (
    <div className="container grid flex-1 items-start gap-4 p-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div className="grid gap-4 md:col-span-2 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>
              {t("welcome", { name: currentUserState.firstName || currentUserState.name || "" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentUserState && (
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{t("name")}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentUserState.name ?? "Not set"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{t("email")}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentUserState.email ?? "Not set"}
                  </p>
                </div>
                {currentUserState?.firstName && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{t("firstName")}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUserState.firstName}
                    </p>
                  </div>
                )}
                {currentUserState?.lastName && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{t("lastName")}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUserState.lastName}
                    </p>
                  </div>
                )}
                {currentUserState?.age ? (
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{t("age")}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUserState.age}
                    </p>
                  </div>
                ) : null}
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("twoFactorAuthentication")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentUserState.twoFactorEnabled ? t("enabled") : t("disabled")}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {t("editProfile")}
            </Link>
            <Button variant="destructive" onClick={handleSignOut}>
              {t("logout")}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-4 md:col-span-2 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("quickActions")}</CardTitle>
            <CardDescription>{t("commonActions")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {t("editProfile")}
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                {t("logout")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
