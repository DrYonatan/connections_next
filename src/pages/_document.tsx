import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <body className="antialiased bg-lightTheme-primary dark:bg-darkTheme-primary duration-300 dark:text-white">
          <Main />
          <NextScript />
        </body>
    </Html>
  );
}
