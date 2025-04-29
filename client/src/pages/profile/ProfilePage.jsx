import ProfileForm from '../../components/profile/ProfileForm';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="max-w-2xl mx-auto">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;