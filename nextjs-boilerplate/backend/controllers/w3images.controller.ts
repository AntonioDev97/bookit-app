import { NextRequest, NextResponse } from "next/server";

const { W3PROFILE_API_URL } = process.env;

export const getW3Image = async (request: NextRequest) => {
    const defaultImage = 'ZZ0062781?def=avatar&date=undefined';
    let { email } = Object.fromEntries(new URL(request.url).searchParams);
    if (!email || email?.length < 1) email = defaultImage;

    let data = await fetch(`${W3PROFILE_API_URL}/image/${email}`);
    if (data.status === 404) data = await fetch(`${W3PROFILE_API_URL}/image/${defaultImage}`);

    const image = await data.blob();
    return new NextResponse(image, {
        status: 200,
        headers: { "Content-Disposition": "image/*" },
    });
};