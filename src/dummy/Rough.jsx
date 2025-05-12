<form
  onSubmit={handleLogin}
  className="h-full flex flex-col md:p-6 mt-10 space-y-4 p-4"
>
  <h1 className="text-[2.5rem] text-center font-bold bluetxt pb-2">
    Welcome Back
  </h1>
  <p className="text-center text-gray-600 text-sm mb-4">
    Please enter your credentials to sign in
  </p>

  <label className="text-[0.95rem] font-medium text-gray-700 mb-1" htmlFor="userId">
    User ID
  </label>
  <input
    type="text"
    id="userId"
    name="userId"
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
    placeholder="Enter User ID"
    className="block w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 outline-none sm:text-sm"
    required
  />

  <label className="text-[0.95rem] font-medium text-gray-700 mb-1" htmlFor="password">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter password"
      className="block w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 outline-none sm:text-sm"
      required
    />
    <div
      className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
    </div>
  </div>

  <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="accent-blue-500"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
      Remember me
    </label>
    <button
      type="button"
      onClick={handleForgotPassword}
      className="text-blue-600 hover:underline"
    >
      Forgot password?
    </button>
  </div>

  <div className="flex items-center justify-center pt-4">
    <button
      className={`custom-signin-btn ${loading ? "loading" : ""}`}
      disabled={loading}
    >
      <div className="back"></div>
      {!loading ? (
        <span className="text">Sign In</span>
      ) : (
        <div className="circle-spinner" />
      )}
    </button>
  </div>
</form>
