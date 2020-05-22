import { getApps } from '../api'
import Layout from '../components/layout'
import AppList from '../components/applist'

import of from '@openfin/service-utils/modules/misc/of';

function Apps({ apps }) {
  return (
    <Layout page="Apps">
      <AppList apps={apps} ></AppList>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { res: apps, err } = await of(getApps(ctx));
  if (err) {
      console.error('error getting user list', err);
  }

  return {
    props: {
      apps: apps,
    },
  }
}

export default Apps