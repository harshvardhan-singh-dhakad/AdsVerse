import { redirect } from "next/navigation";

export default function SignupPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const returnUrl = searchParams.returnUrl as string | undefined;
  
  if (returnUrl) {
    redirect(`/login?mode=signup&returnUrl=${encodeURIComponent(returnUrl)}`);
  } else {
    redirect(`/login?mode=signup`);
  }
}
