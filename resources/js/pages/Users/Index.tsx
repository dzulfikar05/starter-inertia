import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { useEffect } from 'react';
import { User } from '@/types';
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

export default function Index({ users }: { users: { data: Array<User> } }) {
    const { flash } = usePage<{ flash: { success?: string } }>().props;

    useEffect(() => {
        if (flash.success) {
            const toastId = toast.success(flash.success, { id: flash.success });
            return () => toast.dismiss(toastId);
        }
    }, [flash.success]);

    const processDelete = (id: number) => {
        router.delete(`/users/${id}`, {
            onSuccess: () => {
            },
            onError: () => {
                toast.error('Gagal menghapus user.');
            }
        });
    };

    return (
        <>
            <Head title="Users" />
            <Toaster position="top-right" richColors />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">User List</h2>
                        <Button asChild variant="outline">
                            <Link href="/users/create">+ Add User</Link>
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
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* View Button */}
                                            <Button variant="outline" size="icon" className="h-8 w-8 text-purple-600 hover:bg-purple-50" asChild>
                                                <Link href={`/users/${user.id}`}>
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
                                                        <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure? This action cannot be undone and the data for <strong>{user.name}</strong> will be permanently deleted.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => processDelete(user.id)}
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
        { title: 'Users', href: '/users' },
    ],
};
