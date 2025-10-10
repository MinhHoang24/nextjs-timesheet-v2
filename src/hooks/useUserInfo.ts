import { useEffect, useState } from "react";
import { userService } from "@/services/userService/userServices";
import { UserInfo } from "@/types/user";
import Cookies from "js-cookie";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userAva, setUserAva] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    const userId = Cookies.get("userId");
    if (!userId) return;
    setLoading(true);
    try {
      const [userInfoRes, userAvaRes] = await Promise.all([
        userService.getUserInfo(Number(userId)),
        userService.getUserAva(Number(userId)),
      ]);
      setUserInfo(userInfoRes.data.result);
      setUserAva(userAvaRes.data.result);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return { userInfo, userAva, loading, refresh: fetchUserInfo };
};