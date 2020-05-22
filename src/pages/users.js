import { getUsers } from '../api'
import Layout from '../components/layout'
import UserList from '../components/userlist'

import of from '@openfin/service-utils/modules/misc/of';

function Users({ users }) {
  return (
    <Layout page="Users">
      <UserList users={users} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { res: users, err } = await of(getUsers(ctx));
  if (err) {
      console.error('error getting user list', err);
  }

  return {
    props: {
        users: users,
    },
  }
}

export default Users