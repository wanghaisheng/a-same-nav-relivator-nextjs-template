import Link from "next/link";
import { HeaderClient } from "~/ui/business/header/HeaderClient";
import { FooterClient } from "~/ui/business/footer/FooterClient";
import { Button } from "~/ui/components/core/button";
import { CheckCircle } from "lucide-react";

export default function SubmitToolSuccessPage() {
  return (
    <>
      <HeaderClient />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="h-24 w-24 text-green-500" />
            </div>
            
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Tool Submitted Successfully!
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground">
              Thank you for submitting your tool. Our team will review it shortly and publish it on our platform.
            </p>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You will receive an email notification once your tool is approved and published.
              </p>
              
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/">
                  <Button variant="outline" size="lg">
                    Return to Home
                  </Button>
                </Link>
                
                <Link href="/dashboard">
                  <Button size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterClient />
    </>
  );
}