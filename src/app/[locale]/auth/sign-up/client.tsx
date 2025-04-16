"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "~/lib/auth-client";
import { useTranslations } from 'next-intl';

export function SignUpPageClient() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Call the signup function with only the supported fields
    void signUp
      .email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })
      .then(() => {
        router.push("/auth/sign-in?registered=true");
      })
      .catch((err: unknown) => {
        setError(t('signUpError'));
        console.error(err);
        setLoading(false);
      })
      .finally(() => {
        if (loading) setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t('signUp')}</h1>
          <p className="mt-2 text-gray-600">{t('signUpDesc')}</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">{t('name')}</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName">{t('firstName')}</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('firstNamePlaceholder')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName">{t('lastName')}</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('lastNamePlaceholder')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="age">{t('age')}</label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder={t('agePlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email">{t('email')}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password">{t('password')}</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t('passwordPlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? t('loading', { ns: 'Common' }) : t('signUp')}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            {t('haveAccount')}{" "}
            <a
              href="/auth/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t('signIn')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
