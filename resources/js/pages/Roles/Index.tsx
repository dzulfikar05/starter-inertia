import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { useEffect } from 'react';
import { LucideEye, Pencil, Trash } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Role {
    id: number;
    name: string;
}

export default function Index({ roles }: { roles:  Array<Role> }) {
    const { flash } = usePage<{ flash: { success?: string } }>().props;

    useEffect(() => {
        if (flash.success) {
            const toastId = toast.success(flash.success, { id: flash.success });
            return () => toast.dismiss(toastId);
        }
    }, [flash.success]);

    const processDelete = (id: number) => {
        router.delete(`/roles/${id}`, {
            onSuccess: () => {
            },
            onError: () => {
                toast.error('Gagal menghapus role.');
            }
        });
    };

    return (
        <>
            <Head title="Roles" />
            <Toaster position="top-right" richColors />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Role List</h2>
                        <Button asChild variant="outline">
                            <Link href="/roles/create">+ Add Role</Link>
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell className="font-medium">{role.id}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* View Button */}
                                            <Button variant="outline" size="icon" className="h-8 w-8 text-purple-600 hover:bg-purple-50" asChild>
                                                <Link href={`/roles/${role.id}`}>
                                                    <LucideEye className="h-4 w-4" />
                                                </Link>
                                            </Button>

                                            {/* Delete Button with Alert Dialog */}
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Role?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure? This action cannot be undone and the data for <strong>{role.name}</strong> will be permanently deleted.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => processDelete(role.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Yes, Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Roles', href: '/roles' },
    ],
};
