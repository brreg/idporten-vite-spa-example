import { useAuth } from 'react-oidc-context';

const UserPage = () => {
  const auth = useAuth();

  return (
    <div>
      Hello {auth.user?.profile.sub}
      <button onClick={() => {
        void auth.removeUser();
        void auth.signoutRedirect();
      }}
      >
        Log out
      </button>
    </div>
  );
};

export default UserPage;