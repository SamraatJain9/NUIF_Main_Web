import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for applications
const ApplicationTemplate = ({ 
  displayName,
  email,
  studentId,
  academicYear,
  position,
  positionReason,
  sectors,
  motivation,
  hasCV
}: { 
  displayName: string;
  email: string;
  studentId: string;
  academicYear: string;
  position: string;
  positionReason: string;
  sectors?: string[];
  motivation: string;
  hasCV: boolean;
}) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 15px;">
        New NUIF Application
      </h1>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">Personal Information</h2>
        <p><strong>Full Name:</strong> ${displayName}</p>
        <p><strong>University Email:</strong> ${email}</p>
        <p><strong>University ID:</strong> ${studentId}</p>
        <p><strong>Academic Year (2025/2026):</strong> ${academicYear}</p>
      </div>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">Position Details</h2>
        <p><strong>Position Applied For:</strong> ${position}</p>
        <p><strong>Reason for Position:</strong></p>
        <div style="background-color: white; padding: 10px; border-radius: 3px;">
          ${positionReason.split("\n").join("<br>")}
        </div>
        
        <p><strong>Preferred Sectors:</strong></p>
        ${sectors && sectors.length > 0 ? `
          <ul>
            ${sectors.map(sector => `<li>${sector}</li>`).join("")}
          </ul>
        ` : '<p>None selected</p>'}
      </div>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">Motivation</h2>
        <div style="background-color: white; padding: 10px; border-radius: 3px;">
          ${motivation.split("\n").join("<br>")}
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">CV</h2>
        <p>${hasCV ? "CV attached to this email" : "No CV attached"}</p>
      </div>
      
      <p style="text-align: center; margin-top: 20px; color: #666; font-style: italic;">
        Submitted via the NUIF Application Form
      </p>
    </div>
  `;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const studentId = formData.get("studentId") as string;
    const academicYear = formData.get("academicYear") as string;
    const position = formData.get("position") as string;
    const positionReason = formData.get("positionReason") as string;
    const sectorsJson = formData.get("sectors") as string;
    const sectors = sectorsJson ? JSON.parse(sectorsJson) as string[] : [];
    const motivation = formData.get("motivation") as string;
    const cv = formData.get("cv") as File;
    const applicationCount = parseInt(formData.get("applicationCount") as string || "1");
    
    // Format name with application count for 2nd+ applications
    const getOrdinalNumber = (num: number) => {
      const ordinals = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
      return ordinals[num] || `${num}th`;
    };
    
    const formattedName = applicationCount > 1 
      ? `${fullName} - ${getOrdinalNumber(applicationCount)} Application`
      : fullName;
    
    // Check if position requires sector selection
    const requiresSectorSelection = position === "Head Analyst" || position === "Analyst";
    
    // Validate required fields
    if (!fullName || !email || !studentId || !academicYear || !position || 
        !positionReason || !motivation || !cv) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    
    if (!email.endsWith('@newcastle.ac.uk')) {
      return NextResponse.json(
        { error: "Please use your Newcastle University email address" },
        { status: 400 }
      );
    }
    
    // Only validate sectors for Analyst and Head Analyst positions
    if (requiresSectorSelection) {
      if (!Array.isArray(sectors) || sectors.length !== 3) {
        return NextResponse.json(
          { error: "Please select exactly 3 sectors" },
          { status: 400 }
        );
      }
    }
    
    const fileArrayBuffer = await cv.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    
    const { data, error } = await resend.emails.send({
      from: "NUIF Applications <onboarding@resend.dev>",
      to: ["newcastleinvestmentfund@gmail.com"],
      subject: `NUIF Application: ${formattedName}`,
      html: ApplicationTemplate({
        displayName: formattedName,
        email,
        studentId,
        academicYear,
        position,
        positionReason,
        sectors,
        motivation,
        hasCV: true
      }),
      attachments: [
        {
          filename: cv.name,
          content: fileBuffer
        }
      ],
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}