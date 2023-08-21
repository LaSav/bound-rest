function UserProfile({ profile }) {
  return (
    <div>
      <h3>Your Profile</h3>

      {profile.name}
    </div>
  );
}

export default UserProfile;
