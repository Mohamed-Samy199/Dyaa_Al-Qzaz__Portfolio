import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin.js";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, { onSuccess: () => navigate("/dashboard") });
    },
  });

  const serverError = error?.response?.data?.message;

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
      {serverError && (
        <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2">
          {serverError}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:border-mainGold"
          placeholder="you@example.com"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:border-mainGold"
          placeholder="••••••••"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-400 text-xs mt-1">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-mainColor text-lightColor font-semibold py-2.5 rounded-md hover:bg-mainColor/90 transition disabled:opacity-50 border border-mainGold/30"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;