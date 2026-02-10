import { SignIn } from "@clerk/nextjs";

export function generateStaticParams() {
    return [{ "sign-in": [] }];
}

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-[70vh] py-16">
            <SignIn />
        </div>
    );
}
