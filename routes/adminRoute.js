const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_view");

router.get("/stats", adminController.getDashboardStats);

router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUsersById); 
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);
router.post("/users", adminController.createUser);

router.get("/students", adminController.getAllStudents);
router.delete("/students/:id", adminController.deleteStudent);
router.get("/students/:id", adminController.getStudentById);
router.put("/students/:id", adminController.updateStudent);
router.post("/students", adminController.createStudent);
router.get("/form-data", adminController.getStudentFormData);

router.get("/teachers-users", adminController.getTeacherUsers)
router.get("/levels", adminController.getTeacherLevels)
router.get("/teachers", adminController.getAllTeachers);
router.post("/teachers", adminController.createTeacher)
router.delete("/teachers/:id", adminController.deleteTeacher);
router.get("/teachers/:id", adminController.getTeacherById);
router.put("/teachers/:id", adminController.updateStudent);

router.get("/academics/analytics", adminController.getAcademicAnalytics);
router.get("/academics/levels", adminController.getAllLevels);
router.delete("/academics/levels/:id", adminController.deleteLevel);
router.get("/academics/levels/:id", adminController.getLevelById);
router.put("/academics/levels/:id", adminController.updateLevel);
router.post("/academics/levels", adminController.createLevel);

// SUBJECTS
router.get("/academics/subjects", adminController.getAllSubjects);
router.post("/academics/subjects", adminController.createSubject);
router.get("/academics/subjects/:id", adminController.getSubjectById);
router.put("/academics/subjects/:id", adminController.updateSubject);

// FORM DATA (separate)
router.get("/subjects/form-data", adminController.getSubjectFormData);

router.get("/academics/attendance", adminController.getAllAttendance);
router.get("/attendance/form-data", adminController.getAttendanceFormData);
router.get("/academics/attendance/:id", adminController.getAttendanceById);
router.put("/academics/attendance/:id", adminController.updateAttendance);
router.post("/academics/attendance", adminController.createAttendance);

router.get ("/academics/tests", adminController.getAllTests);
router.get ("/academics/tests/form-data", adminController.getTestFormData);
router.get ("/academics/tests/:id", adminController.getTestById);
router.put ("/academics/tests/:id", adminController.updateTest);
router.post ("/academics/tests", adminController.createTest);

router.get ("/academics/quizzes", adminController.getAllQuizzes);
router.get ("/quiz/form-data", adminController.getQuizFormData);
router.post ("/academics/quizzes", adminController.createQuiz);
router.get ("/academics/quizzes/:id", adminController.getQuizById);
router.put ("/academics/quizzes/:id", adminController.updateQuiz);

router.get ("/academics/exams", adminController.getAllExams);
router.get ("/exam/form-data", adminController.getExamFormData);
router.post ("/academics/exams", adminController.createExam);
router.get ("/academics/exams/:id", adminController.getExamById);
router.put ("/academics/exams/:id", adminController.updateExam);

router.get("/academics/assessment-items", adminController.getAllAssessmentItems);
router.get("/academics/assessment-items/form-data", adminController.getAssessmentItemFormData);
router.get("/academics/assessment-items/:id", adminController.getAssessmentItemById);
router.put("/academics/assessment-items/:id", adminController.updateAssessmentItem);
router.post("/academics/assessment-items", adminController.createAssessmentItem);

router.get("/assessments", adminController.getAllAssessments);
router.get("/assessments/form-data", adminController.getAssessmentFormData);
router.get("/assessments/student-items", adminController.getStudentAssessmentItems);
router.get("/assessments/:id", adminController.getAssessmentById);
router.put("/assessments/:id/update", adminController.updateAssessment);
router.post("/assessments", adminController.createAssessment);

module.exports = router;