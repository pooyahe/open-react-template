import Footer from "@/components/ui/footer";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="flex grow flex-col">{children}</main>
      <Footer />
    </>
  );
}
