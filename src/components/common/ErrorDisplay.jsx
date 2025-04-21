import { FaExclamationTriangle } from 'react-icons/fa'

function ErrorDisplay({ message, retry }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-8 my-8 max-w-lg mx-auto text-center">
      <FaExclamationTriangle className="text-5xl text-accent mb-4" />
      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Something went wrong</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{message || 'An unexpected error occurred. Please try again later.'}</p>
      {retry && (
        <button 
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
          onClick={retry}
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay