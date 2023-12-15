function SignIn() {
  return (
    <form id="login-form">
      <input
        type="text"
        name="username"
        id="username-field"
        class="login-form-field"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        id="password-field"
        class="login-form-field"
        placeholder="Password"
      />
      <input type="submit" value="Sign In" id="login-form-submit" />
    </form>
  );
}

export default SignIn;
