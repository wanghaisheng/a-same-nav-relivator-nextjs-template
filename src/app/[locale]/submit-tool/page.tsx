import { HeaderClient } from "~/ui/business/header/HeaderClient";
import { FooterClient } from "~/ui/business/footer/FooterClient";
import { SubmitToolForm } from "~/ui/business/submit-tool-form/SubmitToolForm";

export default function SubmitToolPage() {
  return (
    <>
      <HeaderClient />
      <main className="flex-1">
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Submit Your Tool
              </h1>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Share your tool with our community and reach thousands of potential users.
              </p>
            </div>
            
            <SubmitToolForm />
          </div>
        </section>
      </main>
      <FooterClient />
    </>
  );
}