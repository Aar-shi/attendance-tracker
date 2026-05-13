import prisma from "../config/prisma.js";


export const createClassService = async ({ department, section, subjectName, subjectCode, teacherId, teacherName, teacherProfilePic }) => {
    //save to db
    const newClass = await prisma.classroom.create({
        data: {
            department, section, subjectName, subjectCode, teacherId, teacherName, teacherProfilePic
        }
    })
    return newClass;
}

export const enrollClassService = async ({ classId, userId }) => {



    //check if user is already enrolled in the class
    const existingEnrollment = await prisma.userClass.findFirst({
        where: {
            classId,
            userId
        }
    })

    if (existingEnrollment) {
        throw new Error("You are already enrolled in this class");
    }

    //save to db
    const newEnrollment = await prisma.userClass.create({
        data: {
            classId,
            userId
        }
    })

    //get details of the class
    const classDetails = await prisma.classroom.findUnique({
        where: {
            classId: newEnrollment.classId
        }
    })

    return classDetails;
}

export const fetchClassForTeacherService = async (teacherId) => {

    const classes = await prisma.classroom.findMany({
        where: {
            teacherId: teacherId
        }
    })

    return classes;

}

export const fetchClassForStudentService = async (studentId) => {

    const classes = await prisma.userClass.findMany({
        where: {
            userId: studentId
        },
        select: {
            class: true
        }
    });

    const mappedClasses = classes.map((item) => item.class)

    return mappedClasses;
}

export const fetchClassById = async (classId) => {
    const fetchedClass = await prisma.classroom.findUnique({
        where: {
            classId
        }
    })

    return fetchedClass;
}

export const fetchStudentsInClassService = async (classId) => {
    const students = await prisma.userClass.findMany({
        where: {
            classId: classId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    institutionId: true,
                    department: true,
                    section: true,
                    profilePic: true,
                    role: true
                }
            }
        }
    })

    const mappedStudents = students.map(item => item.user);
    mappedStudents.map(student => {
        student.institutionId = student.institutionId.toString();
    })
    return mappedStudents;
}