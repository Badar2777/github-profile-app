const ProfileSkeleton = () => (
  <div className="p-5 border rounded-xl animate-pulse space-y-4">
    <div className="flex gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/2 rounded" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 w-3/4 rounded" />
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
