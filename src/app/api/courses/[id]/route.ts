import { NextResponse } from "next/server";
import { coursesService } from "~/services/courses";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const course = await coursesService.getById(params.id);
    
    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(course);
  } catch (error) {
    console.error(`Error fetching course ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedCourse = await coursesService.update(params.id, body);
    
    if (!updatedCourse) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error(`Error updating course ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await coursesService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting course ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}