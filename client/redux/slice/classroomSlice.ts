import { axiosInstance } from "@/lib/axios";
import { ClassItem, CreateClassroomData, Student } from "@/types/classes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

export const fetchClassrooms = createAsyncThunk(
  "classroom/fetchClassrooms",
  async () => {
    try {
      const response = await axiosInstance.get("/class/fetch");
      return response.data;
    } catch (error) {
      console.log("Error in fetchClassrooms", error);
    }
  },
);
export const createClassroom = createAsyncThunk(
  "classroom/createClassroom",
  async (data: CreateClassroomData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/class/create", data);
      Toast.show({
        type: "success",
        text1: "Class created Successfully 👏",
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to create class 😞",
      });
      return rejectWithValue("Error in createClassroom");
    }
  },
);
export const enrollClassroom = createAsyncThunk(
  "classroom/enrollClassroom",
  async (classId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/class/enroll", { classId });
      Toast.show({
        type: "success",
        text1: "Enrolled in class successfully 👏",
      });
      return response.data;
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message as string,
      });
      return rejectWithValue("Error in enrollClassroom");
    }
  },
);

export const fetchStudentsInClass = createAsyncThunk(
  "classroom/fetchStudentsInClass",
  async (classId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/class/students/${classId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Error in fetchStudentsInClass");
    }
  },
);

interface ClassroomState {
  classrooms: ClassItem[];
  students: Student[];
  isLoading: boolean;
  isFetchingStudents: boolean;
  classCount: number;
  errorInFetch: boolean;
  isCreatingClass: boolean;
  isEnrolling: boolean;
}

const initialState: ClassroomState = {
  classrooms: [],
  students: [],
  isLoading: false,
  isFetchingStudents: false,
  classCount: 0,
  errorInFetch: false,
  isCreatingClass: false,
  isEnrolling: false,
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    (((builder.addCase(fetchClassrooms.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchClassrooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.classrooms = action.payload?.result;
      state.classCount = state.classrooms ? state.classrooms.length : 0;
      state.errorInFetch = false;
    })),
    builder.addCase(fetchClassrooms.rejected, (state) => {
      state.isLoading = false;
      state.errorInFetch = true;
    })),
      (builder.addCase(createClassroom.pending, (state) => {
        state.isCreatingClass = true;
      }),
      builder.addCase(createClassroom.fulfilled, (state, action) => {
        state.isCreatingClass = false;
        state.classrooms.push(action.payload?.result);
        state.classCount = state.classrooms.length;
      }),
      builder.addCase(createClassroom.rejected, (state) => {
        state.isCreatingClass = false;
      })),
      (builder.addCase(enrollClassroom.pending, (state) => {
        state.isEnrolling = true;
      }),
      builder.addCase(enrollClassroom.fulfilled, (state, action) => {
        state.isEnrolling = false;
        state.classrooms.push(action.payload?.result);
        state.classCount = state.classrooms.length;
      }),
      builder.addCase(enrollClassroom.rejected, (state) => {
        state.isEnrolling = false;
      })),
      (builder.addCase(fetchStudentsInClass.pending, (state) => {
        state.isFetchingStudents = true;
      }),
      builder.addCase(fetchStudentsInClass.fulfilled, (state, action) => {
        state.isFetchingStudents = false;
        state.students = action.payload?.result || [];
      }),
      builder.addCase(fetchStudentsInClass.rejected, (state) => {
        state.isFetchingStudents = false;
      })));
  },
});

export default classroomSlice.reducer;
