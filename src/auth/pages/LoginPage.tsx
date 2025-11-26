import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "../graphql/loginMutation";
import { setCredentials } from "@/auth/store/authSlice";
import { Page } from "@/ui/patterns/Page";
import { PageHeader } from "@/ui/patterns/PageHeader";
import { TextInput } from "@/ui/primitives/TextInput";
import { Button } from "@/ui/primitives/Button";

type User = {
  id: number;
  name: string;
  email: string;
  login: any;
}

export default function LoginPage() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });

  const [login, { loading, error }] = useMutation<User>(LOGIN_MUTATION);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await login({
      variables: {
        email: form.email,
        password: form.password,
      },
    });

    if (res?.data?.login) {
      dispatch(
        setCredentials({
          accessToken: res.data.login.accessToken,
          user: res.data.login.user,
        })
      );
      // redirigir a dashboard o main route
    }
  };

  return (
    <Page>
      <PageHeader title="Login" />

      <div className="max-w-sm mt-8 mx-auto">
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <TextInput
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  email: (e.target as HTMLInputElement).value,
                }))
              }
            />
  
            <TextInput
              label="Password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  password: (e.target as HTMLInputElement).value,
                }))
              }
            />

            <Button disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {error && (
              <p className="text-red-500 text-sm">
                Invalid credentials. Please try again.
              </p>
            )}

          </form>
        </div>
      </div>
    </Page>
  );
}
