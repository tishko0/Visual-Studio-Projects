// Sample data for assignments and grades
        const assignments = {
            "Grade 1": [],
            "Grade 2": [],
            "Grade 3": [],
            "Grade 4": [],
            "Grade 5": [],
            "Grade 6": [],
            "Grade 7": [],
            "Grade 8": [],
            "Grade 9": [],
            "Grade 10": [],
            "Grade 11": [],
            "Grade 12": []
        };

        const submittedGrades = {};

        // Sample data for external submissions
        const externalSubmissions = {
            "John Doe": { grade: 5, feedback: "Great work!" },
            "Michael Brown": { grade: 6, feedback: "Outstanding performance!" },
            "James Garcia": { grade: 4, feedback: "Good effort." },
            "Daniel Wright": { grade: 3, feedback: "Satisfactory submission." },
            "Emily Johnson": { grade: 2, feedback: "Needs improvement." },
            "Sarah Wilson": { grade: 6, feedback: "Excellent submission!" },
            "Patricia Lee": { grade: 3, feedback: "Satisfactory." },
            "Linda King": { grade: 5, feedback: "Well done!" }
        };

        // Sample data for student information
        const studentInfo = {
            "John Doe": { age: 11, parentName: "Jane Doe", email: "johndoe@example.com", phone: "123-456-7890" },
            "Michael Brown": { age: 11, parentName: "Mark Brown", email: "michaelbrown@example.com", phone: "234-567-8901" },
            "James Garcia": { age: 12, parentName: "Maria Garcia", email: "jamesgarcia@example.com", phone: "345-678-9012" },
            "Daniel Wright": { age: 11, parentName: "Sara Wright", email: "danielwright@example.com", phone: "456-789-0123" },
            "Emily Johnson": { age: 10, parentName: "Emma Johnson", email: "emilyjohnson@example.com", phone: "567-890-1234" },
            "Sarah Wilson": { age: 12, parentName: "Susan Wilson", email: "sarahwilson@example.com", phone: "678-901-2345" },
            "Patricia Lee": { age: 11, parentName: "Paul Lee", email: "patricialee@example.com", phone: "789-012-3456" },
            "Linda King": { age: 10, parentName: "Lisa King", email: "lindaking@example.com", phone: "890-123-4567" }
        };

        // Create Homework Assignment
        document.getElementById("homeworkForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const className = document.getElementById("class").value;
            const title = document.getElementById("title").value;
            const instructions = document.getElementById("instructions").value;
            const deadline = document.getElementById("deadline").value;

            const assignment = { title, instructions, deadline };
            assignments[className].push(assignment);
            document.getElementById("assignmentOutput").innerHTML = `Assignment created for ${className}: ${title}`;
            this.reset();
        });

        // Grade Homework
        document.getElementById("gradeForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const assignmentTitle = document.getElementById("assignmentSelect").value;
            const grade = document.getElementById("grade").value;
            const feedback = document.getElementById("feedback").value;

            // Modify the feedback based on the Bulgarian grading scale
            let gradingFeedback = "";
            switch (parseInt(grade)) {
                case 12:
                    gradingFeedback = "Отличен (Excellent)";
                    break;
                case 11:
                    gradingFeedback = "Много добър (Very Good)";
                    break;
                case 10:
                    gradingFeedback = "Добър (Good)";
                    break;
                case 9:
                    gradingFeedback = "Задоволителен (Satisfactory)";
                    break;
                case 8:
                    gradingFeedback = "Слаб (Poor)";
                    break;
                case 7:
                case 6:
                case 5:
                case 4:
                case 3:
                case 2:
                    gradingFeedback = "Неудовлетворителен (Unsatisfactory)";
                    break;
                default:
                    gradingFeedback = "Invalid grade.";
            }

            submittedGrades[assignmentTitle] = { grade, feedback: gradingFeedback + ": " + feedback };
            document.getElementById("gradeOutput").innerHTML = `Grade submitted for ${assignmentTitle}: ${grade} - ${gradingFeedback}`;
            this.reset();
        });

        // Generate Grading Report
        document.getElementById("reportForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const reportClass = document.getElementById("reportClass").value;
            const reportAssignments = assignments[reportClass];

            if (reportAssignments.length > 0) {
                let report = `Grading Report for ${reportClass}:\n`;
                reportAssignments.forEach((assignment, index) => {
                    report += `${index + 1}. ${assignment.title} - Due: ${assignment.deadline}\n`;
                });
                document.getElementById("reportOutput").innerText = report;
            } else {
                document.getElementById("reportOutput").innerText = `No assignments found for ${reportClass}.`;
            }
        });

        // View Submissions
        document.getElementById("viewSubmissionsForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const studentName = document.getElementById("studentName").value;
            const submission = externalSubmissions[studentName];

            if (submission) {
                document.getElementById("submissionsOutput").innerHTML = `Submission by ${studentName}: Grade: ${submission.grade}, Feedback: ${submission.feedback}`;
            } else {
                document.getElementById("submissionsOutput").innerText = `No submissions found for ${studentName}.`;
            }
            this.reset();
        });

        // Modify Grades
        document.getElementById("modifyGradesForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const assignmentTitle = document.getElementById("modifyAssignmentSelect").value;
            const newGrade = document.getElementById("newGrade").value;
            const newFeedback = document.getElementById("newFeedback").value;

            if (submittedGrades[assignmentTitle]) {
                submittedGrades[assignmentTitle].grade = newGrade;
                submittedGrades[assignmentTitle].feedback = newFeedback;
                document.getElementById("modifyGradeOutput").innerHTML = `Grade modified for ${assignmentTitle}: New Grade: ${newGrade}, Feedback: ${newFeedback}`;
            } else {
                document.getElementById("modifyGradeOutput").innerText = `Assignment not found.`;
            }
            this.reset();
        });

        // Access Student Information
        document.getElementById("studentInfoForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const studentName = document.getElementById("studentSelect").value;
            const info = studentInfo[studentName];

            if (info) {
                document.getElementById("studentInfoOutput").innerHTML = `
                    Name: ${studentName} <br>
                    Age: ${info.age} <br>
                    Parent Name: ${info.parentName} <br>
                    Email: ${info.email} <br>
                    Phone: ${info.phone}
                `;
            } else {
                document.getElementById("studentInfoOutput").innerText = `Student information not found.`;
            }
            this.reset();
        });