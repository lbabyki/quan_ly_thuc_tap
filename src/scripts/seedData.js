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
import Evaluation from "../dal/models/evaluation.model.js";
import DefenseSchedule from "../dal/models/defenseSchedule.model.js";
import Notification from "../dal/models/notification.model.js";
import { hashPassword } from "../utils/hash.js";

const seedData = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("🔗 Connected to database");

    // Clear existing data
    await Promise.all([
      Student.deleteMany({}),
      Lecturer.deleteMany({}),
      Company.deleteMany({}),
      Internship.deleteMany({}),
      Progress.deleteMany({}),
      CompanyReport.deleteMany({}),
      SystemConfig.deleteMany({}),
      Evaluation.deleteMany({}),
      DefenseSchedule.deleteMany({}),
      Notification.deleteMany({}),
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

    // 2. CREATE STUDENTS (Expanded)
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
        gpa: 3.8,
        cv: "cv_nguyen_van_a.pdf",
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
        gpa: 3.6,
        cv: "cv_tran_thi_b.pdf",
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
        gpa: 3.9,
      },
      {
        userName: "Pham Thi D",
        email: "student4@gmail.com",
        password: hashedPassword,
        role: "student",
        fullName: "Pham Thi D",
        department: "Computer Science",
        studentCode: "SV004",
        phone: "0456789123",
        status: "approved",
        skills: ["C#", ".NET", "SQL Server"],
        year: 3,
        gpa: 3.7,
      },
      {
        userName: "Hoang Van E",
        email: "student5@gmail.com",
        password: hashedPassword,
        role: "student",
        fullName: "Hoang Van E",
        department: "Information Technology",
        studentCode: "SV005",
        phone: "0789123456",
        status: "approved",
        skills: ["PHP", "Laravel", "Vue.js"],
        year: 4,
        gpa: 3.5,
      },
    ]);
    console.log("✅ Students created:", students.length);

    // 3. CREATE LECTURERS (Expanded)
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
        specialization: "Software Engineering",
        experience: 10,
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
        specialization: "Database Systems",
        experience: 8,
      },
      {
        name: "Dr. Le Van D",
        email: "lecturer3@gmail.com",
        password: hashedPassword,
        role: "lecturer",
        fullName: "Dr. Le Van D",
        department: "Software Engineering",
        phone: "0456123789",
        status: "approved",
        specialization: "Web Development",
        experience: 12,
      },
    ]);
    console.log("✅ Lecturers created:", lecturers.length);

    // 4. CREATE COMPANIES (Expanded)
    const companies = await Company.insertMany([
      {
        companyName: "FPT Software",
        contactPerson: "Nguyen Van Manager",
        contactEmail: "fpt@gmail.com",
        password: hashedPassword,
        contactPhone: "0901234567",
        address: "FPT Tower, Ho Chi Minh City",
        status: "active",
        website: "https://www.fpt-software.com",
        industry: "Software Development",
        size: "1000+",
      },
      {
        companyName: "VNG Corporation",
        contactPerson: "Tran Thi Director",
        contactEmail: "vng@gmail.com",
        password: hashedPassword,
        contactPhone: "0902345678",
        address: "VNG Campus, Ho Chi Minh City",
        status: "active",
        website: "https://www.vng.com.vn",
        industry: "Technology",
        size: "500-1000",
      },
      {
        companyName: "Tiki Corporation",
        contactPerson: "Le Van HR",
        contactEmail: "tiki@gmail.com",
        password: hashedPassword,
        contactPhone: "0903456789",
        address: "Tiki Building, Ho Chi Minh City",
        status: "active",
        website: "https://tiki.vn",
        industry: "E-commerce",
        size: "200-500",
      },
      {
        companyName: "Shopee Vietnam",
        contactPerson: "Nguyen Thi Manager",
        contactEmail: "shopee@gmail.com",
        password: hashedPassword,
        contactPhone: "0904567890",
        address: "Shopee Building, Ho Chi Minh City",
        status: "active",
        website: "https://shopee.vn",
        industry: "E-commerce",
        size: "500-1000",
      },
    ]);
    console.log("✅ Companies created:", companies.length);

    // 5. CREATE INTERNSHIPS (Expanded)
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
        requirements: ["JavaScript", "React", "HTML/CSS"],
        maxStudents: 3,
        description: "Develop modern web applications using React",
        benefits: ["Salary: 5M VND/month", "Training", "Certificate"],
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
        requirements: ["Node.js", "Python", "Database"],
        maxStudents: 2,
        description: "Work on backend systems and APIs",
        benefits: ["Salary: 6M VND/month", "Mentorship", "Full-time offer"],
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
        requirements: ["JavaScript", "React", "Node.js", "MongoDB"],
        maxStudents: 2,
        description: "E-commerce platform development",
        benefits: ["Salary: 5.5M VND/month", "Product training"],
      },
      {
        companyName: "Shopee Vietnam",
        position: "Mobile Developer Intern",
        contactPerson: "Nguyen Thi Manager",
        contactEmail: "shopee@gmail.com",
        contactPhone: "0904567890",
        address: "Shopee Building, Ho Chi Minh City",
        status: "open",
        students: [],
        startDate: new Date("2024-09-15"),
        endDate: new Date("2024-12-31"),
        requirements: ["React Native", "Flutter", "Mobile Development"],
        maxStudents: 2,
        description: "Mobile app development for e-commerce",
        benefits: ["Salary: 6M VND/month", "Device provided"],
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
        requirements: ["Python", "Machine Learning", "NLP"],
        maxStudents: 1,
      },
    ]);
    console.log("✅ Internships created:", internships.length);

    // Update student internship assignments
    await Student.findByIdAndUpdate(students[0]._id, {
      internshipCompany: internships[0]._id,
      supervisor: lecturers[0]._id,
    });
    await Student.findByIdAndUpdate(students[1]._id, {
      internshipCompany: internships[2]._id,
      supervisor: lecturers[1]._id,
    });

    // 6. CREATE PROGRESS REPORTS (Expanded)
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
        attachments: ["week1_setup.pdf", "timeline.xlsx"],
        submittedAt: new Date("2024-08-08"),
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
        attachments: ["week2_ui_mockups.png"],
        submittedAt: new Date("2024-08-15"),
        reviewedAt: new Date("2024-08-17"),
        reviewedBy: lecturers[0]._id,
        feedback:
          "Good progress on UI development. Consider adding unit tests.",
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
        attachments: ["api_documentation.pdf"],
        submittedAt: new Date("2024-08-22"),
      },
      {
        student: students[0]._id,
        week: 12,
        title: "Final Report - Frontend Development Project",
        content:
          "Complete summary of 12-week internship. Successfully delivered a responsive web application with modern UI/UX design, user authentication, and real-time features.",
        reportType: "final",
        status: "submitted",
        internship: internships[0]._id,
        attachments: [
          "final_report.pdf",
          "project_demo.mp4",
          "source_code.zip",
        ],
        submittedAt: new Date("2024-11-25"),
      },
    ]);
    console.log("✅ Progress reports created:", progressReports.length);

    // 7. CREATE EVALUATIONS
    const evaluations = await Evaluation.insertMany([
      {
        student: students[0]._id,
        lecturer: lecturers[0]._id,
        progressReport: progressReports[0]._id,
        scoreProcess: 8.5,
        scoreReport: 8.0,
        scoreDefense: 8.5,
        comments:
          "Excellent technical skills and good learning attitude. Shows strong problem-solving abilities.",
      },
      {
        student: students[0]._id,
        lecturer: lecturers[0]._id,
        progressReport: progressReports[1]._id,
        scoreProcess: 8.0,
        scoreReport: 7.5,
        scoreDefense: 8.0,
        comments: "Good performance overall. Delivered quality work on time.",
      },
      {
        student: students[1]._id,
        lecturer: lecturers[1]._id,
        progressReport: progressReports[2]._id,
        scoreProcess: 9.0,
        scoreReport: 8.5,
        scoreDefense: 9.0,
        comments:
          "Outstanding performance. Demonstrates excellent technical and soft skills.",
      },
    ]);
    console.log("✅ Evaluations created:", evaluations.length);

    // 8. CREATE DEFENSE SCHEDULES
    const defenseSchedules = await DefenseSchedule.insertMany([
      {
        title: "Final Defense - Batch 1",
        date: new Date("2024-12-16"),
        startTime: "08:00",
        endTime: "12:00",
        location: "Room A101",
        lecturer: lecturers[0]._id,
        students: [students[0]._id],
        status: "scheduled",
        semester: "2024-2",
        notes: "Morning session for Computer Science students",
      },
      {
        title: "Final Defense - Batch 2",
        date: new Date("2024-12-17"),
        startTime: "14:00",
        endTime: "18:00",
        location: "Room B202",
        lecturer: lecturers[1]._id,
        students: [students[1]._id],
        status: "scheduled",
        semester: "2024-2",
        notes: "Afternoon session for IT students",
      },
      {
        title: "Midterm Defense - Batch 1",
        date: new Date("2024-10-15"),
        startTime: "09:00",
        endTime: "11:00",
        location: "Room C303",
        lecturer: lecturers[2]._id,
        students: [students[2]._id, students[3]._id],
        status: "completed",
        semester: "2024-2",
        notes: "Midterm evaluation session",
      },
    ]);
    console.log("✅ Defense schedules created:", defenseSchedules.length);

    // 9. CREATE NOTIFICATIONS
    const notifications = await Notification.insertMany([
      {
        recipient: students[0]._id,
        recipientModel: "Student",
        title: "Progress Report Reminder",
        message: "Your weekly progress report for Week 3 is due tomorrow.",
        type: "info",
        read: false,
      },
      {
        recipient: students[1]._id,
        recipientModel: "Student",
        title: "Defense Schedule Notification",
        message:
          "Your final defense has been scheduled for December 17, 2024 at 2:00 PM in Room B202.",
        type: "info",
        read: false,
      },
      {
        recipient: lecturers[0]._id,
        recipientModel: "Lecturer",
        title: "New Progress Report Submitted",
        message:
          "Nguyen Van A has submitted Week 2 progress report for review.",
        type: "info",
        read: true,
      },
      {
        recipient: companies[0]._id,
        recipientModel: "Company",
        title: "Student Evaluation Request",
        message:
          "Please provide evaluation for your intern Nguyen Van A before November 30, 2024.",
        type: "warning",
        read: false,
      },
    ]);
    console.log("✅ Notifications created:", notifications.length);

    // 10. CREATE COMPANY REPORTS (Expanded)
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
        submittedAt: new Date("2024-11-30"),
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
        submittedAt: new Date("2024-11-25"),
        reviewedAt: new Date("2024-12-01"),
        reviewedBy: admin._id,
        adminNotes: "Excellent feedback from VNG. Approved.",
      },
      {
        company: companies[2]._id,
        semester: "2024-2",
        year: 2024,
        overallAssessment: {
          totalStudents: 1,
          completedStudents: 0,
          averagePerformance: 8.0,
          recommendedStudents: [],
        },
        detailedFeedback: {
          strengths: "Good technical foundation and willingness to learn",
          weaknesses: "Needs more time to adapt to company culture",
          suggestions: "Extend internship duration for better results",
          cooperationQuality: "good",
        },
        improvements: {
          curriculumSuggestions: "Add e-commerce specific modules",
          skillGaps: ["E-commerce platforms", "Payment systems"],
          futureCollaboration: true,
        },
        status: "draft",
        submittedAt: new Date("2024-12-05"),
      },
    ]);
    console.log("✅ Company reports created:", companyReports.length);

    // 11. CREATE SYSTEM CONFIG (Updated)
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

    // 12. PRINT COMPREHENSIVE SAMPLE DATA
    console.log("\n🎯 COMPREHENSIVE SAMPLE IDs FOR TESTING:");
    console.log("=".repeat(60));
    console.log(`Admin ID: ${admin._id}`);
    console.log(`Student IDs: ${students.map((s) => s._id).join(", ")}`);
    console.log(`Lecturer IDs: ${lecturers.map((l) => l._id).join(", ")}`);
    console.log(`Company IDs: ${companies.map((c) => c._id).join(", ")}`);
    console.log(`Internship IDs: ${internships.map((i) => i._id).join(", ")}`);
    console.log(
      `Progress IDs: ${progressReports.map((p) => p._id).join(", ")}`
    );
    console.log(`Evaluation IDs: ${evaluations.map((e) => e._id).join(", ")}`);
    console.log(
      `Defense IDs: ${defenseSchedules.map((d) => d._id).join(", ")}`
    );
    console.log(
      `Notification IDs: ${notifications.map((n) => n._id).join(", ")}`
    );
    console.log(
      `Company Report IDs: ${companyReports.map((cr) => cr._id).join(", ")}`
    );
    console.log(`Semester ID: ${systemConfig._id}`);
    console.log("=".repeat(60));

    console.log("\n📧 COMPREHENSIVE LOGIN CREDENTIALS:");
    console.log("=".repeat(60));
    console.log("🔑 ADMIN:");
    console.log("   Email: admin@gmail.com | Password: 123456");
    console.log("\n👨‍🎓 STUDENTS:");
    console.log(
      "   Email: student@gmail.com | Password: 123456 (Has internship)"
    );
    console.log(
      "   Email: student2@gmail.com | Password: 123456 (Has internship)"
    );
    console.log(
      "   Email: student3@gmail.com | Password: 123456 (Pending status)"
    );
    console.log("   Email: student4@gmail.com | Password: 123456");
    console.log("   Email: student5@gmail.com | Password: 123456");
    console.log("\n👨‍🏫 LECTURERS:");
    console.log("   Email: lecturer@gmail.com | Password: 123456");
    console.log("   Email: lecturer2@gmail.com | Password: 123456");
    console.log("   Email: lecturer3@gmail.com | Password: 123456");
    console.log("\n🏢 COMPANIES:");
    console.log("   Email: fpt@gmail.com | Password: 123456");
    console.log("   Email: vng@gmail.com | Password: 123456");
    console.log("   Email: tiki@gmail.com | Password: 123456");
    console.log("   Email: shopee@gmail.com | Password: 123456");
    console.log("=".repeat(60));

    console.log("\n📊 DATA SUMMARY:");
    console.log("=".repeat(60));
    console.log(`✅ Total Students: ${students.length + 1} (including admin)`);
    console.log(`✅ Total Lecturers: ${lecturers.length}`);
    console.log(`✅ Total Companies: ${companies.length}`);
    console.log(`✅ Total Internships: ${internships.length}`);
    console.log(`✅ Total Progress Reports: ${progressReports.length}`);
    console.log(`✅ Total Evaluations: ${evaluations.length}`);
    console.log(`✅ Total Defense Schedules: ${defenseSchedules.length}`);
    console.log(`✅ Total Notifications: ${notifications.length}`);
    console.log(`✅ Total Company Reports: ${companyReports.length}`);
    console.log(`✅ System Config: Active semester ${systemConfig.semester}`);
    console.log("=".repeat(60));
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  } finally {
    process.exit(0);
  }
};

seedData();
