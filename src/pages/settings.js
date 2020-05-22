import fetch from 'node-fetch'
import Layout from '../components/layout'
import SettingsEditor from '../components/settingsEditor'

function Settings({ settings, manifest }) {
  return (
    <Layout>
        <SettingsEditor settings={settings} manifest={manifest} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const opts = { headers: { cookie: ctx.req.headers.cookie } };
  let res = await fetch(`${process.env.BASE_URL}/api/admin/settings`, opts);
  const setts = await res.json();
  res = await fetch(`${process.env.BASE_URL}/api/admin/manifest`, opts);
  const manif = await res.json();

  return {
    props: {
        settings: setts,
        manifest: manif
    },
  }
}

export default Settings