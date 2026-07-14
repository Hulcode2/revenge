import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/button";
import useAuthStore from "../contexts/AuthStore";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
const AuthButton = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const user = useAuthStore((state) => state.userInfo);

  const [login, setLogin] = useState(true);
  async function logoutHandler() {
    setLogin(false);
    setUserInfo(null);
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }

  async function loginHandler() {
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      if (!data.success) {
        return toast.error(data.message || "Login failed");
      }

      toast.success("Login success:");

      setEmail("");
      setPassword("");

      setUserInfo(data);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function signupHandler() {
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
      });

      if (!data.success) {
        return toast.error(data.message || "Register failed");
      }

      toast.success(data.message || "Registration successful");

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  if (user) {
    return (
      <Button
        className=" bg-blue-600 hover:bg-blue-700 px-6 py-5"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-5">
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{login ? "Login" : "Signup"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {!login && (
            <div className="space-y-2">
              <Label>User Name</Label>

              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}{" "}
          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {login ? (
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setLogin(false);
                }}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setLogin(true);
                }}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                login
              </span>
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            disabled={loading}
            onClick={() => {
              login ? loginHandler() : signupHandler();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Submet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthButton;
