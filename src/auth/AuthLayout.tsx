import { Outlet } from "react-router";

import authCss from "./auth.module.css";

export default function AuthLayout() {
  return (
    <main className={authCss.layout}>
      <Outlet />
    </main>
  );
}
