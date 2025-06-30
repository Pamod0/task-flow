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
import { Progress } from '@/components/ui/progress';
import type { Task } from '@/lib/types';
import { AddTaskDialog } from './add-task-dialog';

const mockTasks: Task[] = [
  {
    taskId: 'TSK-001',
    employeeId: 'USR-001',
    taskName: 'Design new dashboard layout',
    description: 'Create a modern and intuitive dashboard design.',
    hoursSpent: 4,
    progressPercentage: 75,
    taskDate: new Date().getTime(),
    status: 'In Progress',
    lastUpdated: new Date().getTime(),
  },
  {
    taskId: 'TSK-002',
    employeeId: 'USR-001',
    taskName: 'Develop login functionality',
    description: 'Implement secure user authentication.',
    hoursSpent: 6,
    progressPercentage: 100,
    taskDate: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    status: 'Completed',
    lastUpdated: new Date().getTime(),
  },
  {
    taskId: 'TSK-003',
    employeeId: 'USR-001',
    taskName: 'API Integration for user profiles',
    description: 'Connect frontend to backend for profile data.',
    hoursSpent: 2,
    progressPercentage: 20,
    taskDate: new Date().getTime(),
    status: 'Pending',
    lastUpdated: new Date().getTime(),
  },
   {
    taskId: 'TSK-004',
    employeeId: 'USR-001',
    taskName: 'Setup project repository',
    description: 'Initialize Git repo and setup CI/CD pipeline.',
    hoursSpent: 1,
    progressPercentage: 100,
    taskDate: new Date(new Date().setDate(new Date().getDate() - 2)).getTime(),
    status: 'Completed',
    lastUpdated: new Date().getTime(),
  },
  {
    taskId: 'TSK-005',
    employeeId: 'USR-001',
    taskName: 'Client meeting for feature review',
    description: 'Discuss progress and next steps with the client.',
    hoursSpent: 1.5,
    progressPercentage: 100,
    taskDate: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    status: 'Completed',
    lastUpdated: new Date().getTime(),
  },
   {
    taskId: 'TSK-006',
    employeeId: 'USR-001',
    taskName: 'Fix production bug #1024',
    description: 'Urgent fix for a critical issue.',
    hoursSpent: 3,
    progressPercentage: 50,
    taskDate: new Date().getTime(),
    status: 'On Hold',
    lastUpdated: new Date().getTime(),
  },
];

export function TaskList() {
  return (
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
            {mockTasks.map((task) => (
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
