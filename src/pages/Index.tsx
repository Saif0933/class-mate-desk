import { useState, useEffect, useMemo } from "react";
import { Student } from "@/types/student";
import { initialStudents } from "@/data/students";
import StudentsTable from "@/components/StudentsTable";
import StudentFormDialog from "@/components/StudentFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Download, Search, GraduationCap } from "lucide-react";
import * as XLSX from "xlsx";

const Index = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        String(s.age).includes(q)
    );
  }, [students, search]);

  const handleSave = (data: Omit<Student, "id">) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s))
      );
    } else {
      setStudents((prev) => [
        ...prev,
        { ...data, id: crypto.randomUUID() },
      ]);
    }
    setFormOpen(false);
    setEditingStudent(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleExport = () => {
    const data = filtered.map(({ name, email, age }) => ({ Name: name, Email: email, Age: age }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Students
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setEditingStudent(null);
                setFormOpen(true);
              }}
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Student</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-card border p-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-display font-bold">{students.length}</p>
          </div>
          <div className="rounded-xl bg-card border p-4">
            <p className="text-sm text-muted-foreground">Avg. Age</p>
            <p className="text-2xl font-display font-bold">
              {students.length
                ? (students.reduce((a, s) => a + s.age, 0) / students.length).toFixed(1)
                : "—"}
            </p>
          </div>
          <div className="rounded-xl bg-card border p-4 col-span-2 sm:col-span-1">
            <p className="text-sm text-muted-foreground">Showing</p>
            <p className="text-2xl font-display font-bold">
              {filtered.length}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                of {students.length}
              </span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or age…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <StudentsTable
          students={filtered}
          loading={loading}
          onEdit={(s) => {
            setEditingStudent(s);
            setFormOpen(true);
          }}
          onDelete={setDeleteTarget}
        />
      </main>

      {/* Dialogs */}
      <StudentFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSave}
        student={editingStudent}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        studentName={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Index;
