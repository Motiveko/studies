import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

/**
 * auth reducer 사용에 필요한 모든걸 가져오는 커스텀 훅
 * @returns {*} { user, loading, error, dispatch }
 */
export default function useAuth() {
  const { user, loading, error } = useSelector(
    ({ auth: { user, loading, error } }: RootState) => ({ user, loading, error }),
    shallowEqual,
  );

  const dispatch = useDispatch();
  return {
    user, loading, error, dispatch,
  };
}
