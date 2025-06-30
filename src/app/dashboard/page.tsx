import { TaskList } from '@/components/dashboard/task-list';
import { AddTaskDialog } from '@/components/dashboard/add-task-dialog';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-headline">Daily Tasks</h1>
          <p className="text-muted-foreground">Here's a list of your tasks for today!</p>
        </div>
        <AddTaskDialog />
      </div>
      <TaskList />
    </div>
  );
}
