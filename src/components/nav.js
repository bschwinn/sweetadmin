import NavLink from './navlink';

const Nav = () => (
  <nav>
    <style jsx>{`
      .nav-link {
        text-decoration: none;
      }
      .active:after {
        content: ' *';
      }
    `}</style>
    <ul className="nav">
      <li>
        <NavLink activeClassName="active" href="/admin/settings">
          <a className="nav-link">Settings</a>
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" href="/admin/users">
          <a className="nav-link">Users</a>
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" href="/admin/apps">
          <a className="nav-link">Apps</a>
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" href="/admin/searches">
          <a className="nav-link">Searches</a>
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Nav