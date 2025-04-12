import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/services/auth.sqlite";
import { DashboardLayout } from "~/ui/components/layouts/dashboard-layout";

export default async function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
