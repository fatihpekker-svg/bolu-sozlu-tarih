import { client } from "../../../sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stories = await client.fetch(`*[_type == "story"]{ 
            "slug": slug.current, 
            title, 
            _id,
            "isDraft": (_id in path("drafts.**"))
        }`);
        return NextResponse.json({ stories });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
