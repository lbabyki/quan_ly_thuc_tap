import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Student from "../dal/models/student.model.js";
import Lecturer from "../dal/models/lecturer.model.js";
import Company from "../dal/models/company.model.js";
import Internship from "../dal/models/internship.model.js";
import Progress from "../dal/models/progress.model.js";
import CompanyReport from "../dal/models/companyReport.model.js";
import SystemConfig from "../dal/models/systemConfig.model.js";
import { hashPassword } from "../utils/hash.js";

const seedData = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("🔗 Connected to database");

    // Clear existing data
    await Promise.all([
      Student.deleteMany({}),
      Company.deleteMany({}),
      Internship.deleteMany({}),
      Progress.deleteMany({}),
      CompanyReport.deleteMany({}),
      SystemConfig.deleteMany({}),
    ]);
    console.log("🧹 Cleared existing data");

    const hashedPassword = await hashPassword("123456");

    // 1. CREATE ADMIN
    const admin = await Student.create({
      userName: "System Administrator",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      fullName: "System Administrator",
      department: "IT Department",
      status: "approved",
      studentCode: "000000",
    });
    console.log("✅ Admin created:", admin.email);

    // 2. CREATE STUDENTS
    const students = await Student.insertMany([
      {
        userName: "Nguyen Van A",
        email: "student@gmail.com",
        password: hashedPassword,
        role: "student",
        fullName: "Nguyen Van A",
        department: "Computer Science",
        studentCode: "SV001",
        phone: "0123456789",
        status: "approved",
        skills: ["JavaScript", "React", "Node.js"],
        year: 4,
      },
      {
        userName: "Tran Thi B",
        email: "student2@gmail.com",
        password: hashedPassword,
        role: "student",
        fullName: "Tran Thi B",
        department: "Information Technology",
        studentCode: "SV002",
        phone: "0987654321",
        status: "approved",
        skills: ["Python", "Django", "PostgreSQL"],
        year: 3,
      },
      {
        userName: "Le Van C",
        email: "student3@gmail.com",
        password: hashedPassword,
        role: "student",
        fullName: "Le Van C",
        department: "Software Engineering",
        studentCode: "SV003",
        phone: "0369852147",
        status: "pending",
        skills: ["Java", "Spring Boot", "MySQL"],
        year: 4,
      },
    ]);
    console.log("✅ Students created:", students.length);

    // 3. CREATE LECTURERS
    const lecturers = await Lecturer.insertMany([
      {
        name: "Dr. Nguyen Van B",
        email: "lecturer@gmail.com",
        password: hashedPassword,
        role: "lecturer",
        fullName: "Dr. Nguyen Van B",
        department: "Computer Science",
        phone: "0123456789",
        status: "approved",
      },
      {
        name: "Dr. Pham Thi C",
        email: "lecturer2@gmail.com",
        password: hashedPassword,
        role: "lecturer",
        fullName: "Dr. Pham Thi C",
        department: "Information Technology",
        phone: "0987654321",
        status: "approved",
      },
    ]);
    console.log("✅ Lecturers created:", lecturers.length);

    // 4. CREATE COMPANIES
    const companies = await Company.insertMany([
      {
        companyName: "FPT Software",
        contactPerson: "Nguyen Van Manager",
        contactEmail: "fpt@gmail.com",
        password: hashedPassword,
        contactPhone: "0901234567",
        address: "FPT Tower, Ho Chi Minh City",
        status: "active",
      },
      {
        companyName: "VNG Corporation",
        contactPerson: "Tran Thi Director",
        contactEmail: "vng@gmail.com",
        password: hashedPassword,
        contactPhone: "0902345678",
        address: "VNG Campus, Ho Chi Minh City",
        status: "active",
      },
      {
        companyName: "Tiki Corporation",
        contactPerson: "Le Van HR",
        contactEmail: "tiki@gmail.com",
        password: hashedPassword,
        contactPhone: "0903456789",
        address: "Tiki Building, Ho Chi Minh City",
        status: "active",
      },
    ]);
    console.log("✅ Companies created:", companies.length);

    // 5. CREATE INTERNSHIPS
    const internships = await Internship.insertMany([
      {
        companyName: "FPT Software",
        position: "Frontend Developer Intern",
        contactPerson: "Nguyen Van Manager",
        contactEmail: "fpt@gmail.com",
        contactPhone: "0901234567",
        address: "FPT Tower, Ho Chi Minh City",
        status: "open",
        students: [students[0]._id],
        startDate: new Date("2024-08-01"),
        endDate: new Date("2024-11-30"),
      },
      {
        companyName: "VNG Corporation",
        position: "Backend Developer Intern",
        contactPerson: "Tran Thi Director",
        contactEmail: "vng@gmail.com",
        contactPhone: "0902345678",
        address: "VNG Campus, Ho Chi Minh City",
        status: "open",
        students: [],
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-12-31"),
      },
      {
        companyName: "Tiki Corporation",
        position: "Full Stack Developer Intern",
        contactPerson: "Le Van HR",
        contactEmail: "tiki@gmail.com",
        contactPhone: "0903456789",
        address: "Tiki Building, Ho Chi Minh City",
        status: "open",
        students: [students[1]._id],
        startDate: new Date("2024-08-15"),
        endDate: new Date("2024-12-15"),
      },
      {
        companyName: "Student Suggestion",
        position: "AI Research Intern",
        suggestedTitle: "AI Chatbot Development",
        suggestedDescription:
          "Develop an AI-powered chatbot for customer service",
        isSuggested: true,
        suggestedBy: students[2]._id,
        status: "pending",
        students: [],
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-12-31"),
      },
    ]);
    console.log("✅ Internships created:", internships.length);

    // Update student internship assignments
    await Student.findByIdAndUpdate(students[0]._id, {
      internshipCompany: internships[0]._id,
    });
    await Student.findByIdAndUpdate(students[1]._id, {
      internshipCompany: internships[2]._id,
    });

    // 6. CREATE PROGRESS REPORTS
    const progressReports = await Progress.insertMany([
      {
        student: students[0]._id,
        week: 1,
        title: "Week 1 Progress Report",
        content:
          "This week I completed the project setup and initial research. Key achievements include setting up development environment, studying existing solutions, and creating project timeline.",
        reportType: "weekly",
        status: "submitted",
        internship: internships[0]._id,
      },
      {
        student: students[0]._id,
        week: 2,
        title: "Week 2 Progress Report",
        content:
          "Continued with frontend development. Implemented user authentication and basic UI components using React and Material-UI.",
        reportType: "weekly",
        status: "reviewed",
        internship: internships[0]._id,
      },
      {
        student: students[1]._id,
        week: 1,
        title: "Week 1 Backend Setup",
        content:
          "Set up backend infrastructure using Node.js and Express. Configured database connections and basic API endpoints.",
        reportType: "weekly",
        status: "submitted",
        internship: internships[2]._id,
      },
    ]);
    console.log("✅ Progress reports created:", progressReports.length);

    // 7. CREATE COMPANY REPORTS
    const companyReports = await CompanyReport.insertMany([
      {
        company: companies[0]._id,
        semester: "2024-1",
        year: 2024,
        overallAssessment: {
          totalStudents: 2,
          completedStudents: 1,
          averagePerformance: 8.5,
          recommendedStudents: [students[0]._id],
        },
        detailedFeedback: {
          strengths:
            "Students show good technical skills and learning attitude",
          weaknesses: "Need improvement in communication and teamwork",
          suggestions: "More practical projects and soft skills training",
          cooperationQuality: "good",
        },
        improvements: {
          curriculumSuggestions:
            "Add more modern web technologies to curriculum",
          skillGaps: ["DevOps", "Cloud Computing", "Agile Methodology"],
          futureCollaboration: true,
        },
        status: "submitted",
        submittedAt: new Date(),
      },
      {
        company: companies[1]._id,
        semester: "2024-1",
        year: 2024,
        overallAssessment: {
          totalStudents: 1,
          completedStudents: 1,
          averagePerformance: 9.0,
          recommendedStudents: [students[1]._id],
        },
        detailedFeedback: {
          strengths: "Excellent problem-solving skills and quick learning",
          weaknesses: "Limited experience with enterprise-level projects",
          suggestions: "Provide more complex real-world projects",
          cooperationQuality: "excellent",
        },
        improvements: {
          curriculumSuggestions: "Include microservices and system design",
          skillGaps: ["System Design", "Performance Optimization"],
          futureCollaboration: true,
        },
        status: "approved",
        submittedAt: new Date(),
        reviewedAt: new Date(),
        reviewedBy: admin._id,
        adminNotes: "Excellent feedback from VNG. Approved.",
      },
    ]);
    console.log("✅ Company reports created:", companyReports.length);

    // 8. CREATE SYSTEM CONFIG
    const systemConfig = await SystemConfig.create({
      semester: "2024-2",
      startDate: new Date("2024-08-01"),
      endDate: new Date("2024-12-15"),
      reportDeadlines: [
        {
          type: "weekly",
          deadline: new Date("2024-12-01"),
        },
        {
          type: "final",
          deadline: new Date("2024-12-10"),
        },
      ],
      defenseSchedule: {
        startDate: new Date("2024-12-16"),
        endDate: new Date("2024-12-20"),
      },
      isActive: true,
    });
    console.log("✅ System config created:", systemConfig.semester);

    // 9. PRINT SAMPLE IDs FOR TESTING
    console.log("\n🎯 SAMPLE IDs FOR TESTING:");
    console.log("=".repeat(50));
    console.log(`Admin ID: ${admin._id}`);
    console.log(`Student ID: ${students[0]._id}`);
    console.log(`Lecturer ID: ${lecturers[0]._id}`);
    console.log(`Company ID: ${companies[0]._id}`);
    console.log(`Internship ID: ${internships[0]._id}`);
    console.log(`Progress ID: ${progressReports[0]._id}`);
    console.log(`Company Report ID: ${companyReports[0]._id}`);
    console.log(`Semester ID: ${systemConfig._id}`);
    console.log("=".repeat(50));

    console.log("\n📧 LOGIN CREDENTIALS:");
    console.log("=".repeat(50));
    console.log("Admin: admin@gmail.com / 123456");
    console.log("Student: student@gmail.com / 123456");
    console.log("Lecturer: lecturer@gmail.com / 123456");
    console.log("Company: fpt@gmail.com / 123456");
    console.log("=".repeat(50));
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  } finally {
    process.exit(0);
  }
};

seedData();
