import Navbar from "./navbar";
import { currentUserRole } from "@/modules/auth/actions";

export default async function ServerNavbar() {
  let userRole = null;

  try {
    userRole = await currentUserRole();
  } catch (error) {
    console.warn("ServerNavbar: user role unavailable");
  }

  return <Navbar userRole={userRole} />;
}
