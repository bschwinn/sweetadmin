import Link from 'next/link'
import { getUser, deleteUser, resendUser, updateUser, createUser, saveUser } from '../../api'
import Layout from '../../components/layout'
import { getUserSatus, formatUserSince, isUserTempPasswordExpired } from '../../utils';

import of from '@openfin/service-utils/modules/misc/of';

function UserPage ({user}) {
    return (
        <Layout page="Edit User">
            <UserEdit user={user} />
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { res: user, err } = await of(getUser(ctx, ctx.req.params.username));
    if (err) {
        console.error('error getting user list', err);
    }
  
    return {
      props: {
          user: user,
      },
    }
}

class UserEdit extends React.Component {
    constructor(props) {
      super(props);
      const {user} = props;
      this.state = {
        user: user
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.resendUser = this.resendUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const t = event.target;
        const u = this.state.user;
        switch(t.getAttribute('id')) {
            case "firstName" :
                u.firstName = t.value;
                break;
            case "lastName" :
                u.lastName = t.value;
                break;
            case "phone" :
                u.phone = t.value;
                break;
            case "isAdmin" :
                u.isAdmin = t.checked;
                break;
        }
        this.setState({user: u});
    }
    
    async resendUser() {
        const { res: resp, err } = of(resendUser(this.state.user));
        if (err) {
            // TODO display error message to user
            console.error('error resending welcome/tmp-password to user', err);
            return;
        }
        window.location.href = '/admin/users';
    }

    async deleteUser() {
        const { res: resp, err } = of(deleteUser(this.state.user));
        if (err) {
            // TODO display error message to user
            console.error('error deleting user', err);
            return;
        }
        window.location.href = '/admin/users';
    }

    async handleSubmit(event) {
        event.preventDefault();
        const u = {
            email: this.state.user.email,
            phone: this.state.user.phone,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            isAdmin: this.state.user.isAdmin
        }
        const { res: resp, err } = of(saveUser(this.state.user.username, JSON.stringify(u)));
        if (err) {
            // TODO display error message to user
            console.error('error saving user', err);
            return;
        }
        window.location.href = '/admin/users';
    }
  
    render() {
      const user = this.state.user;
      const userSince = new Date(user.created)
      return (
        <form onSubmit={this.handleSubmit}>
            <label className="title"><Link href="/admin/users"><a> &lt; </a></Link> Edit User</label>
            <label>
                Email
                <input id="email" className="edit" readOnly={true} value={user.email} />
            </label>
            <label>
                Name
                <input id="firstName" className="edit" onChange={this.handleChange} value={user.firstName} />
            </label>
            <label>
                Last/Sur Name
                <input id="lastName" className="edit" onChange={this.handleChange} value={user.lastName} />
            </label>
            <label>
                Phone
                <input id="phone" className="edit" onChange={this.handleChange} value={user.phone} />
            </label>
            <label>
                User Since
                <input className="edit" readOnly={true} value={formatUserSince(userSince)} />
            </label>
            <label>
                User Status
                <input className="edit" readOnly={true} value={user.status + ' ' + getUserSatus(user, userSince)} />
            </label>
            <label>
                Admin ?
                <input id="isAdmin" type="checkbox" onChange={this.handleChange} checked={user.isAdmin} />
            </label>
            <input id="saveUser" type="submit" value="Save" />
            <input id="deleteUser" onClick={this.deleteUser} type="button" value="Delete" />
            <Resend user={user} resend={this.resendUser}/>
        </form>
      );
    }
}

function Resend(props) {
    const {user} = props;
    if ( isUserTempPasswordExpired(user, new Date(user.created)) ) {
        return <input id="resendUser" onClick={props.resend} type="button" value="Resend" />
    }
    return <span />
}

export default UserPage