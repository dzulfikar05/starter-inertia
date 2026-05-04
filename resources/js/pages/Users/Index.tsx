import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { useEffect } from 'react';
// Import Badge untuk tampilan Role yang lebih elegan
import { Badge } from "@/components/ui/badge";
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

// Definisikan tipe User dengan relasi roles
type UserWithRoles = User & {
    roles: Array<{ id: number; name: string }>;
};

export default function Index({ users }: { users: { data: Array<UserWithRoles> } }) {
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
                toast.success('User berhasil dihapus.');
            },
            onError: () => {
                toast.error('Gagal menghapus user.');
            }
        });
    };

    return (
        <>
            <Head title="Users Management" />
            <Toaster position="top-right" richColors />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md border border-slate-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                        <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/users/create">+ Add User</Link>
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-lg bg-white shadow-md border border-slate-100">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-500 text-xs">#{user.id}</TableCell>
                                        <TableCell className="font-semibold text-slate-700">{user.name}</TableCell>
                                        <TableCell className="text-slate-600">{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.length > 0 ? (
                                                    user.roles.map((role) => (
                                                        <Badge
                                                            key={role.id}
                                                            variant="secondary"
                                                            className="capitalize bg-blue-50 text-blue-700 border-blue-100 font-medium"
                                                        >
                                                            {role.name}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">No Role</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {/* View Button */}
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50 hover:text-blue-700" asChild title="View Details">
                                                    <Link href={`/users/${user.id}`}>
                                                        <LucideEye className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                {/* Edit Button */}
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-amber-600 border-amber-100 hover:bg-amber-50 hover:text-amber-700" asChild title="Edit User">
                                                    <Link href={`/users/${user.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                {/* Delete Button with Alert Dialog */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700"
                                                            title="Delete User"
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="rounded-2xl">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure? This action cannot be undone and the data for <strong>{user.name}</strong> will be permanently deleted.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => processDelete(user.id)}
                                                                className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                                                            >
                                                                Yes, Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-slate-400 italic">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Users Management', href: '/users' },
    ],
};
