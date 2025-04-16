import { NextResponse } from "next/server";
import { coursesService } from "~/services/courses";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const level = searchParams.get("level"); // 按难度级别过滤
    const certification = searchParams.get("certification"); // 按是否提供证书过滤
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 8;

    let courses;
    switch (type) {
      case "trending":
        courses = await coursesService.getTrending(limit);
        break;
      case "new":
        courses = await coursesService.getNew(limit);
        break;
      case "featured":
        courses = await coursesService.getFeatured(limit);
        break;
      case "bestseller":
        courses = await coursesService.getBestSellers(limit);
        break;
      case "bestrated":
        courses = await coursesService.getBestRated(limit);
        break;
      default:
        courses = await coursesService.getAll();
    }
    
    // 按难度级别过滤
    if (level) {
      courses = courses.filter(course => course.level === level);
    }
    
    // 按是否提供证书过滤
    if (certification !== null) {
      const hasCertification = certification === "true";
      courses = courses.filter(course => Boolean(course.certification) === hasCertification);
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCourse = await coursesService.create(body);
    return NextResponse.json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}