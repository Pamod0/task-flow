export type UserProfile = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  employeeId?: string;
  designation?: string;
  department?: string;
  role: 'Employee' | 'HOD' | 'Admin';
  phoneNumber?: string;
  dateOfJoining: number; // timestamp
  profilePictureURL?: string;
  managerId?: string;
};

export type Task = {
  taskId: string;
  employeeId: string;
  taskName: string;
  description?: string;
  hoursSpent: number;
  progressPercentage: number;
  taskDate: number; // timestamp
  status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
  lastUpdated: number; // timestamp
};
