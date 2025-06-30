"use client";

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from '@/components/ui/progress';
import type { Task } from '@/lib/types';
import { EditTaskDialog } from './edit-task-dialog';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export function TaskList() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [taskToEdit, setTaskToEdit] = React.useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = React.useState<Task | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!auth) return;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && db) {
        const q = query(collection(db, "tasks"), where("employeeId", "==", user.uid));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const tasksData: Task[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            tasksData.push({
              ...data,
              taskId: doc.id,
              taskDate: (data.taskDate as Timestamp)?.toMillis() || Date.now(),
              lastUpdated: (data.lastUpdated as Timestamp)?.toMillis() || Date.now(),
            } as Task);
          });
          setTasks(tasksData.sort((a, b) => b.taskDate - a.taskDate));
          setIsLoading(false);
        }, (error) => {
          console.error("Error fetching tasks: ", error);
          toast({ variant: "destructive", title: "Error", description: "Could not fetch tasks." });
          setIsLoading(false);
        });
        return () => unsubscribeSnapshot();
      } else {
        setTasks([]);
        setIsLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, [toast]);

  const handleDelete = async () => {
    if (!taskToDelete || !db) return;
    try {
      await deleteDoc(doc(db, "tasks", taskToDelete.taskId));
      toast({ title: "Success", description: "Task deleted successfully." });
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task: ", error);
      toast({ variant: "destructive", title: "Error", description: "Could not delete task." });
    }
  };

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            Loading tasks...
          </TableCell>
        </TableRow>
      );
    }
    if (tasks.length === 0) {
       return (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            No tasks found. Add a new task to get started!
          </TableCell>
        </TableRow>
      );
    }
    return tasks.map((task) => (
      <TableRow key={task.taskId}>
        <TableCell>
          <div className="font-medium">{task.taskName}</div>
          <div className="text-sm text-muted-foreground md:hidden">
            {task.status} - {task.progressPercentage}%
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge variant={task.status === 'Completed' ? 'default' : 'secondary'} className={
            task.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
            task.status === 'On Hold' ? 'bg-yellow-200 text-yellow-800' :
            task.status === 'Pending' ? 'bg-gray-200 text-gray-800' : 
            'bg-green-200 text-green-800'
          }>
            {task.status}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Progress value={task.progressPercentage} className="w-full" />
          <span className="text-xs text-muted-foreground">{task.progressPercentage}%</span>
        </TableCell>
        <TableCell className="hidden lg:table-cell">{task.hoursSpent}</TableCell>
        <TableCell className="hidden lg:table-cell">
          {new Date(task.taskDate).toLocaleDateString()}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTaskToEdit(task)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTaskToDelete(task)} className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
        <CardDescription>
          A list of your recently submitted tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Progress</TableHead>
              <TableHead className="hidden lg:table-cell">Hours Spent</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderTableBody()}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {taskToEdit && (
        <EditTaskDialog
          task={taskToEdit}
          open={!!taskToEdit}
          onOpenChange={() => setTaskToEdit(null)}
        />
      )}
      
      <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
