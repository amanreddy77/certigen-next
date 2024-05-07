import { useState } from "react";
import router, { useRouter } from "next/router";

// Assuming this function generates the certificate content
function generateCertificate(
  studentName: string,
  course: string,
  date: string
): string {
  // Generate certificate logic here, for demonstration, let's just return a string
  return `This is to certify that ${studentName} has successfully completed the course "${course}" on ${date}.`;
}

export default function Certificate() {
  const [certificateContent, setCertificateContent] = useState<string>("");

  // Function to handle certificate generation
  const handleGenerateCertificate = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // Assuming you have input fields for student name, course, and date
    const studentName = (event.target as any).elements["name"].value;
    const course = (event.target as any).elements["course"].value;
    const date = (event.target as any).elements["date"].value;
    const certificate = generateCertificate(studentName, course, date);
    setCertificateContent(certificate);
    router.push(`/certificate?content=${encodeURIComponent(certificate)}`);
  };

  return (
    <div>
      <form onSubmit={handleGenerateCertificate}>
        <div>
          <label htmlFor="name">Student Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="course">Course</label>
          <input id="course" name="course" type="text" required />
        </div>
        <div>
          <label htmlFor="date">Date of Approval</label>
          <input id="date" name="date" type="date" required />
        </div>
        <button type="submit">Generate Certificate</button>
      </form>
      {certificateContent && (
        <div>
          <h2>Generated Certificate</h2>
          <pre>{certificateContent}</pre>
        </div>
      )}
    </div>
  );
}
