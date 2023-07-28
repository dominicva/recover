import LoginButton from '../buttons/LoginButton';
import LogoutButton from '../buttons/LogoutButton';

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-semibold text-purple-darker">Recover</h1>
      <nav>
        <ul>
          <li>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</li>
        </ul>
      </nav>
    </header>
  );
}
