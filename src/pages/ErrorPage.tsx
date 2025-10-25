import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.status === 404 && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-semibold md:text-2xl text-destructive">
              {error.status} - {error.statusText}
            </h1>
            <p className="mt-1 text-sm md:text-base">
              {error.status === 404
                ? "Sorry, the page you're looking for doesn't exist."
                : "Something went wrong."}
            </p>
            <Link to="" className="text-accent mt-5 text-sm md:text-base">
              Go Home
            </Link>
          </div>
        )}
      </div>
    );
  }
};

export default ErrorPage;
