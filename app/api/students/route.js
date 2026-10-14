import { NextResponse } from "next/server";

const students = [
  { id: 1, name: "Aman Sharma", class: "10", totalFee: 5000, paidAmount: 3000 },
  { id: 2, name: "Priya Verma", class: "9", totalFee: 4000, paidAmount: 4000 },
  { id: 3, name: "Rahul Patel", class: "10", totalFee: 6000, paidAmount: 2500 },
  { id: 4, name: "Neha Singh", class: "8", totalFee: 3000, paidAmount: 0 },
  { id: 5, name: "Rohan Das", class: "9", totalFee: 5500, paidAmount: 2000 },
];

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch students." },
      { status: 500 }
    );
  }
}