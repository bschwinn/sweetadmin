import Link from 'next/link'
import { getUserName, getUserSatus, formatUserSince } from '../utils';

function UserList ({users}) {
    return (
        <table id="userlist">
        <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Admin</th>
                <th>Joined</th>
            </tr>
        </thead>
        <tbody>
        {users.map(user => <User key={user.username} user={user} />)}
        </tbody>
    </table>
    )
}

function User (props) {
    const {user} = props;
    const name = getUserName(user);
    const userSince = new Date(user.created);
    return <tr>
        <td title={user.email}><Link href="/admin/users/[username]" as={`/admin/users/${user.username}`}><a>{name}</a></Link></td>
        <td>{getUserSatus(user.enabled, user.status, userSince)}</td>
        <td>{user.isAdmin ? 'X' : ' '}</td>
        <td>{formatUserSince(userSince)}</td>
    </tr>
}

export default UserList