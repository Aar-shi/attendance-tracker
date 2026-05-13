export interface ClassItem {
  classId: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  section: string;
  teacherId: string;
  teacherName: string;
  teacherProfilePic: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClassroomData {
  subjectName: string;
  subjectCode: string;
  department: string;
  section: string;
}

export interface Student {
  id: string;
  name: string;
  institutionId: string;
  department: string;
  section: string;
  profilePic: string | null;
  role: string;
}
