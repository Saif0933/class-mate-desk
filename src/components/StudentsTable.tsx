import { Student } from "@/types/student";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const SkeletonRows = () => (
  <>
    {Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-28" /></TableCell>
        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
        <TableCell><Skeleton className="h-4 w-10" /></TableCell>
        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      </TableRow>
    ))}
  </>
);

const StudentsTable = ({ students, loading, onEdit, onDelete }: Props) => (
  <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/60 hover:bg-secondary/60">
          <TableHead className="font-display font-semibold text-secondary-foreground">Name</TableHead>
          <TableHead className="font-display font-semibold text-secondary-foreground">Email</TableHead>
          <TableHead className="font-display font-semibold text-secondary-foreground">Age</TableHead>
          <TableHead className="font-display font-semibold text-secondary-foreground text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <SkeletonRows />
        ) : students.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
              No students found. Add one to get started!
            </TableCell>
          </TableRow>
        ) : (
          students.map((s, i) => (
            <TableRow key={s.id} className="animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
              <TableCell className="font-medium">{s.name}</TableCell>
              <TableCell className="text-muted-foreground">{s.email}</TableCell>
              <TableCell>
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold w-8 h-8">
                  {s.age}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Button size="icon" variant="ghost" onClick={() => onEdit(s)} className="hover:text-primary">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(s)} className="hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

export default StudentsTable;
