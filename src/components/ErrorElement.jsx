import { useRouteError } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

function ErrorElement() {
    const error = useRouteError();

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-5">
            <MdErrorOutline className="text-red-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
            <p className="text-gray-400 mt-2 text-lg">We couldn't find the page you're looking for.</p>
            {error && (
                <p className="mt-3 text-sm text-gray-500">
                    <strong>Error:</strong> {error.statusText || error.message}
                </p>
            )}
            <a
                href="/"
                className="mt-5 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white text-lg transition-all duration-200"
            >
                Go Home
            </a>
        </main>
    );
}

export default ErrorElement;
