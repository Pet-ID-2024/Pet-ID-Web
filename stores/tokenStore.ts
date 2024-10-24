import { getToken } from "@/services/api";
import axios from "axios";
import { create } from "zustand";

interface TokenStore {
  token: string | null;
  fetchToken: () => Promise<void>;
}

const useTokenStore = create<TokenStore>((set) => {
  const fetchToken = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/auth/test/token`,{params : {memberId : 12}});
    const token = response.data;
    set({ token });
  };

  // Call fetchToken immediately when the store is created
  fetchToken();

  return {
    token: null,
    fetchToken
  };
});

export default useTokenStore;