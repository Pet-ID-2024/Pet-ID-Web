import axios from "axios";
import { create } from "zustand";

interface TokenStore {
  token: string | null;
  fetchToken: () => Promise<string | null>;
  tokenReady: Promise<string | null>;
}

const useTokenStore = create<TokenStore>((set) => {
  let resolveTokenReady: (value: string | null) => void;

  const tokenReady = new Promise<string | null>((resolve) => {
    resolveTokenReady = resolve; // Store the resolve function
  });

  const fetchToken = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/auth/test/token`,{params : {memberId : 12}});    
     const token = response.data;
    set({ token });
    resolveTokenReady(token); // Resolve the promise once the token is set
    return token;
  };

  // Call fetchToken immediately when the store is created
  fetchToken();

  return {
    token: null,
    fetchToken,
    tokenReady,
  };
});

export default useTokenStore;