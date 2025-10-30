import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
import * as z from "zod";

const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name is too long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attach the error to confirmPassword field
  });

type SignupFormInput = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormInput) => {
    console.log("Form submitted successfully:", data);

    setTimeout(() => {
      reset();
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-2">
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                {...register("fullName")}
                name="fullName"
                id="fullName"
                className="shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50 "
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                {...register("email")}
                name="email"
                id="email"
                className="shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50"
                placeholder="you@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("password")}
                  name="password"
                  id="password"
                  className="w-full shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50"
                  placeholder="********"
                />

                <div
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {isPasswordVisible ? (
                    <Eye className="w-4 h-4 text-accent " />
                  ) : (
                    <EyeOff className="w-4 h-4 text-accent" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full shadow-border px-3 py-2 focus:outline-2 focus:outline-ring/50"
                  placeholder="********"
                />

                <div
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {isConfirmPasswordVisible ? (
                    <Eye className="w-4 h-4 text-accent " />
                  ) : (
                    <EyeOff className="w-4 h-4 text-accent" />
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="my-8">
            <div className="flex gap-3">
              <input
                type="checkbox"
                {...register("terms")}
                name="checkbox"
                id="checkbox"
              />
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
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 w-full bg-primary py-3  text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
          >
            {isSubmitting ? (
              <span>Creating...</span>
            ) : (
              <>
                <span>Create account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
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

export default Signup;
