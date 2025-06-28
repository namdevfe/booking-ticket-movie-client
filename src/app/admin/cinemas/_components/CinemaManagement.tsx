'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CinemaForm from "@/app/admin/cinemas/_components/CinemaForm";
import { CopyPlus } from "lucide-react";

interface Cinema {
  id: string;
  name: string;
  location: string;
  screens: number;
}

export function CinemaManagement() {
  const [cinemas, setCinemas] = useState<Cinema[]>([
    { id: "1", name: "City Cinema", location: "Downtown", screens: 8 },
    { id: "2", name: "Starplex", location: "Suburbs", screens: 6 },
  ]);

  const [isOpenCinemaModal,  setIsOpenCinemaModal] = useState<boolean>(false)

  const handleOpenCinemaModal = () => { setIsOpenCinemaModal(true) }
  const handleCloseCinemaModal = () => { setIsOpenCinemaModal(false) }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý rạp</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCinemaModal}>
              <CopyPlus className="mr-2 h-4 w-4" />
              <span>Thêm mới</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full">
            <DialogHeader>
              <DialogTitle>Thêm mới rạp</DialogTitle>
            </DialogHeader>
            <CinemaForm />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Screens</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cinemas.map((cinema) => (
            <TableRow key={cinema.id}>
              <TableCell>{cinema.name}</TableCell>
              <TableCell>{cinema.location}</TableCell>
              <TableCell>{cinema.screens}</TableCell>
              <TableCell>
                <Button variant="ghost">Edit</Button>
                <Button variant="ghost" className="text-destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}