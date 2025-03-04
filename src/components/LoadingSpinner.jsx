import "./LoadingSpinner.css"
function LoadingSpinner(){
    return(
        <>
            <main className="h-screen bg-gray-900 text-white flex flex-col items-center">
                <div className="loader bg-gray-900"></div>
                <p>loading</p>
            </main>
        </>
    );
}

export default LoadingSpinner;