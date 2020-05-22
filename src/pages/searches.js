import { getSearchEngines } from '../api'
import Layout from '../components/layout'
import SearchList from '../components/searchlist'

import of from '@openfin/service-utils/modules/misc/of';

function Searches({ searches }) {
  return (
    <Layout page="Search Engines">
      <SearchList searches={searches} ></SearchList>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { res: json, err } = await of(getSearchEngines(ctx));
  if (err) {
      console.error('error getting user list', err);
  }

  return {
    props: {
        searches: json,
    },
  }
}

export default Searches