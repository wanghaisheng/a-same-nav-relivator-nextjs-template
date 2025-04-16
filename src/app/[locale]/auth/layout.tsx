import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authService } from "~/services";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authService.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
