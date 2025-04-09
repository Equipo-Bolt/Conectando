import React from "react";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <Button variant={"gemso_yellow"}>Click me</Button>
      </div>
    </div>
  );
};

export default LoginPage;
