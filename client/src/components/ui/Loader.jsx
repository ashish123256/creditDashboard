const Loader = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    };
  
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div
          className={`${sizeClasses[size]} border-2 border-indigo-500 border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>
    );
  };
  
  export default Loader;