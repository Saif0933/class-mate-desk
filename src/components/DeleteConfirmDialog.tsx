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

interface Props {
  open: boolean;
  studentName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmDialog = ({ open, studentName, onConfirm, onCancel }: Props) => (
  <AlertDialog open={open} onOpenChange={(v) => !v && onCancel()}>
    <AlertDialogContent className="animate-fade-in">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-display">Delete Student</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete <span className="font-semibold text-foreground">{studentName}</span>? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteConfirmDialog;
