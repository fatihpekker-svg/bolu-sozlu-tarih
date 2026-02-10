import { SignUp } from "@clerk/nextjs";

export function generateStaticParams() {
    return [{ "sign-up": [] }];
}

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-[70vh] py-16">
            <SignUp />
        </div>
    );
}
