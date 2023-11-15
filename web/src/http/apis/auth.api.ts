import axios, { type AxiosError } from "axios";
import { api } from "../instance";
import { toast } from "react-hot-toast";

class AuthApi {
  async login(username: string, password: string) {
    const res = await toast.promise(
      axios.post<Auth.UserState>(
        `${import.meta.env.VITE_API_URL}/auth/token-in-cookie`,
        {
          username,
          password,
        }
      ),
      {
        loading: "Login...",
        success: "Successfully logged in!",
        error: (props: AxiosError<API.APIError>) => {
          const { response } = props;
          if (response && response.status >= 400) return response.data?.message;
          return "Login failed!";
        },
      }
    );
    return res;
  }

  async logout() {
    return await toast.promise(api.get(`/auth/token-blacklist-from-cookie`), {
      loading: "Logout...",
      success: "Successfully logout!",
      error: (props: AxiosError<API.APIError>) => {
        const { response } = props;
        if (response && response.status >= 400) return response.data?.message;
        return "Logout failed!";
      },
    });
  }
}

export const authApi = new AuthApi();
