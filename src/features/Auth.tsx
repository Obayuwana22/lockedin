import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen m-5">
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-primary p-2 rounded-md">
          <Lock className="text-primary-foreground" />
        </div>
        <span className="text-2xl font-semibold">LockedIn</span>
      </div>
      <div className="border border-border rounded-xl shadow-2xl bg-sidebar px-5 py-6 text-sm w-full max-w-[450px]">
        <div className="text-2xl font-semibold">Create your Account</div>
        <p className="my-5 font-semibold text-muted-foreground">
          Join thousands managing their finance smarter
        </p>
        <form>
          <div className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50 "
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50"
                placeholder="you@gmail.com"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                className="shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50"
                placeholder="********"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                className="shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50"
                placeholder="********"
              />
            </div>
          </div>

          <div className="flex gap-3 my-8">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <p className="text-xs">
              <span>I agree to the</span>
              <a href="#" className="text-primary">
                Terms of Service
              </a>
              <span className="mx-1">and</span>
              <a href="#" className="text-primary">
                Privacy Policy
              </a>
            </p>
          </div>

          <Link to="/dashboard">
            <button
              type="button"
              //   disabled
              className="flex items-center justify-center gap-3 w-full bg-primary py-3  text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <span>Create account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </form>

        <div className="border border-border mt-6 mb-7"></div>

        <p className="text-center font-semibold">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <a href="#" className="text-primary">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
