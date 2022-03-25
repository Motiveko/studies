import { useCallback, useEffect, useState } from "react";
import { getUser, User } from "../service/firebase/UserService";

export const useUser = (id: string | undefined) => {
  if (!id) throw new Error("id가 없습니다");
  const setUserById = useCallback(async () => {
    const result = await getUser(id);
    setUser(result);
  }, [id]);

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUserById();
  }, [setUserById]);

  return [user];
};
