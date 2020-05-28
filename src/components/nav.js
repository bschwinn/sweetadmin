import NavLink from './navlink';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink activeClassName="active" href="/admin/settings">
          <a>Settings</a>
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" href="/admin/users">
          <a>Users</a>
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" href="/admin/apps">
          <a>Apps</a>
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" href="/admin/searches">
          <a>Searches</a>
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Nav