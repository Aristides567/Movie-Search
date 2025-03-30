export default function SkeletonLoader() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 h-64 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }