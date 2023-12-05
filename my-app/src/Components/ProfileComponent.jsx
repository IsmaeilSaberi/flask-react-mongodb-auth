const ProfileComponent = ({ displayName }) => {
  return (
    <div>
      <h2 className="text-black text-bold">
        خوش آمدید،{" "}
        <span className="text-bold text-gray-950 text-2xl">{displayName}</span>!
      </h2>
    </div>
  );
};

export default ProfileComponent;
