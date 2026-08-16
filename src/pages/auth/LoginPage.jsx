import LoginForm from "../../components/auth/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 border border-mainGold/20 rounded-xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-1">
          Dashboard <span className="text-mainGold">Login</span>
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Sign in to manage your portfolio content
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;