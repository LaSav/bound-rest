import Spinner from './Spinner';
function UserProfile({ profile, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  } else
    return (
      <div>
        <h3>Your Profile</h3>

        {profile.name}
      </div>
    );
}

export default UserProfile;
