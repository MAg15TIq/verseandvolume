import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HtmlAttributes from "@/components/HtmlAttributes";
import NavigationTestComponent from "@/components/NavigationTestComponent";
import Breadcrumb from "@/components/Breadcrumb";
import { AudioProvider } from "@/contexts/AudioContext";

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure locale is defined, fallback to 'en' if it's not
  // We need to handle params properly in an async component
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale || 'en';
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AudioProvider>
        <HtmlAttributes />
        <NavigationTestComponent />
        <div className="min-h-screen flex flex-col">
          <Header />
          <Breadcrumb />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </AudioProvider>
    </NextIntlClientProvider>
  );
}
