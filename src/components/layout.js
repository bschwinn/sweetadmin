import Head from 'next/head'
import Nav from './nav';

export default function Layout({
  children,
  prefix = 'OpenFin Suite Admin',
  page = ''
}) {
  const suffix = (page !== "") ? ` - ${page}` : '';
  return (
    <div>
      <Head>
        <title>{prefix}{suffix}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header>
        <Nav />
      </header>

      <main>
      {children}
      </main>

      <footer>
          Powered by OpenFin
      </footer>
    </div>
  )
}