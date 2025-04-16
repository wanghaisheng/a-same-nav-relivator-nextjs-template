"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "~/lib/auth-client";
import { Button } from "~/ui/components/core/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/ui/components/core/card";
import { Input } from "~/ui/components/core/input";
import { Label } from "~/ui/components/core/label";
import { Separator } from "~/ui/components/core/separator";
import { useTranslations } from 'next-intl';

export function SignInPageClient() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn.email({
        email,
        password,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(t('signInError'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    setLoading(true);
    try {
      void signIn.social({ provider: "github" });
    } catch (err) {
      setError(t('socialSignInError', { provider: 'GitHub' }));
      console.error(err);
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    try {
      void signIn.social({ provider: "google" });
    } catch (err) {
      setError(t('socialSignInError', { provider: 'Google' }));
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t('signIn')}</CardTitle>
            <CardDescription>{t('signInDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleEmailLogin(e);
              }}
              className="space-y-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  placeholder={t('passwordPlaceholder')}
                />
              </div>
              {error && (
                <div className="text-sm font-medium text-destructive">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('loading', { ns: 'Common' }) : t('signIn')}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('orContinueWith')}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleGitHubLogin}
                disabled={loading}
              >
                {t('loginWith')} GitHub
              </Button>
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {t('loginWith')} Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground">
              {t('noAccount')}{" "}
              <Link
                href="/auth/sign-up"
                className="text-primary underline-offset-4 hover:underline"
              >
                {t('signUp')}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
