const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-gray-200 h-full w-full rounded-xl flex items-center justify-between p-10 ${className}`}>
            <div className="w-1/2 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-8 bg-gray-300 rounded w-1/3 mt-6"></div>
            </div>
            <div className="w-[250px] h-[250px] bg-gray-300 rounded-md"></div>
        </div>
    );
}
export default Skeleton;