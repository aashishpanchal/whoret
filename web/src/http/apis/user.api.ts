import { api } from '../instance';

class UserApi {
  async me() {
    return await api.get<Auth.UserState>(`/user/me`);
  }
}

export const userApi = new UserApi();
