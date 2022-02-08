// 회원정보 관련
export type User = {
  uid: string;
  email: string;
  emailVerified: boolean;
  photoURL: string | null;
  displayedName: string;
};
