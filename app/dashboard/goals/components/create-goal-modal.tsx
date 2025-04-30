import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateGoalForm } from "./create-goal-form";

export const CreateGoalModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Goal</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Goal</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new goal.
          </DialogDescription>
        </DialogHeader>
        <CreateGoalForm />
      </DialogContent>
    </Dialog>
  );
};
