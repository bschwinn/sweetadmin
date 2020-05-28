import React, { Children } from 'react'
import Link from 'next/link'

import { getUser, deleteUser, resendUser, updateUser, createUser } from '../../api'
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
    const username = ctx.req.params.username;
    const userprops = { props : {}};
    if (username !== '' && username !== 'new') {
        const { res: user, err } = await of(getUser(ctx, username));
        if (err) {
            console.error('error getting user', err);
            return userprops
        }
        userprops.props = {user};
        return userprops;
    }
    return userprops;
}

class UserEdit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.user};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleResend = this.handleResend.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleError = this.handleError.bind(this);
    }
  
    handleChange(event) {
        const t = event.target;
        let val = ( t.name === 'isAdmin' ) ? (t.checked===true) : t.value;
        this.setState({ [t.name]: val } );
    }

    async handleResend() {
        const { res: resp, err } = of(resendUser(this.state.user));
        if (err) {
            this.handleError('error resending welcome/tmp-password to user', err);
            return;
        }
        window.location.href = '/admin/users';
    }

    async handleDelete() {
        const { res: resp, err } = of(deleteUser(this.state.user));
        if (err) {
            this.handleError('error deleting user', err);
            return;
        }
        window.location.href = '/admin/users';
    }

    async handleSubmit(event) {
        event.preventDefault();
        const u = {
            email: this.state.email,
            phone: this.state.phone,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            isAdmin: this.state.isAdmin
        }
        if ( this.state.username ) {
            const { res: resp, err } = await of(updateUser(this.state.username, JSON.stringify(u)));
            if (err) {
                this.handleError('error updating user', err)
                return;
            }
        } else {
            u.tmpPassword = this.state.password;
            const { res: resp, err } = await of(createUser(JSON.stringify(u)));
            if (err) {
                this.handleError('error saving user', err)
                return;
            }
        }
        window.location.href = '/admin/users';
    }

    handleError(msg, err) {
        console.error(msg, err);
        const elem = document.querySelector('#userEdit label.title error');
        elem.setAttribute('title', err.message)
        elem.innerHTML = msg;
    }
    
    render() {
      const { username, email, password, firstName, lastName, isAdmin, created, phone, enabled, status } = this.state
      const userSince = new Date(created)
      return (
        <form id="userEdit" onSubmit={this.handleSubmit}>
            <label className="title">{username ? `Editing ${email}` : 'New User'} <error></error></label>
            <Renderer when={!username}>
            <label>
                Email
                <input type="text" name="email" onChange={this.handleChange} value={email} />
            </label>
            <label>
                Temp Password
                <input type="password" name="password" onChange={this.handleChange} value={password} />
            </label>
            </Renderer>
            <label>
                Name
                <input type="text" name="firstName" onChange={this.handleChange} value={firstName} />
            </label>
            <label>
                Last/Sur Name
                <input type="text" name="lastName" onChange={this.handleChange} value={lastName} />
            </label>
            <label>
                Phone
                <input type="phone" name="phone" onChange={this.handleChange} value={phone} />
            </label>
            <Renderer when={username}>
            <label>
                User Status
                <input readOnly={true} value={status + ' ' + getUserSatus(enabled, status, userSince)} />
            </label>
            <label>
                User Since
                <input readOnly={true} value={formatUserSince(userSince)} />
            </label>
            </Renderer>
            <label>
                Admin ?
                <input type="checkbox" name="isAdmin" onChange={this.handleChange} checked={isAdmin} />
            </label>
            <footer>
                <Link href="/admin/users"><input type="button" value="Cancel" /></Link>
                <input type="submit" value={username ? 'Update' : 'Save'} />
                <Renderer when={isUserTempPasswordExpired(status, new Date(created))}>
                    <input onClick={this.handleResend} type="button" value="Resend" />
                </Renderer>
                <Renderer when={username}>
                    <input onClick={this.handleDelete}  type="button" value="Delete" />
                </Renderer>
            </footer>
        </form>
      );
    }
}

function Renderer({children, ...props}) {
    const {when, whenFunc } = props;
    let shouldRender = when;
    if (whenFunc) {
        shouldRender = whenFunc()
    }
    return shouldRender ? children : ''
}

export default UserPage