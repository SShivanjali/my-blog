import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

// Type definition for route parameters
type RouteParams = {
  params: {
    slug: string;
  };
};

// GET request to fetch a post by slug
// export const GET = async (_request: Request, { params }: RouteParams) => {
    //removing request [Error: 'request' is defined but never used.  @typescript-eslint/no-unused-vars]
export const GET = async ({ params }: RouteParams) => {

  const { slug } = params;

  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return NextResponse.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { error: "Failed to fetch post!" },
      { status: 500 }
    );
  }
};

// DELETE request to delete a post by slug
export const DELETE = async ({ params }: RouteParams) => {
  const { slug } = params;

  try {
    const { error } = await supabase.from("posts").delete().eq("slug", slug);

    if (error) throw error;

    return NextResponse.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json(
      { error: "Failed to delete post!" },
      { status: 500 }
    );
  }
};