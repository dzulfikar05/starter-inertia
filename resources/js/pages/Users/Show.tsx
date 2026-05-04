import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeftCircleIcon, PencilIcon } from 'lucide-react';
import { User } from '@/types';

export default function Show({ user }: { user: User }) {
    return (
        <>
            <Head title={`User Profile - ${user.name}`} />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">
                            User Details
                        </h2>
                        <div className="flex gap-2">
                            {/* Tombol Back */}
                            <Button asChild variant="outline">
                                <Link href="/users">
                                    <ArrowLeftCircleIcon className="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </Button>
                            {/* Tombol Edit Baru */}
                            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                <Link href={`/users/${user.id}/edit`}>
                                    <PencilIcon className="mr-2 h-4 w-4" />
                                    Edit User
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <div className="max-w-xl space-y-6">
                        {/* Display Name */}
                        <div className="grid gap-1">
                            <Label className="text-gray-500">Full Name</Label>
                            <p className="text-lg font-medium text-gray-900">{user.name}</p>
                        </div>

                        {/* Display Email */}
                        <div className="grid gap-1">
                            <Label className="text-gray-500">Email Address</Label>
                            <p className="text-lg font-medium text-gray-900">{user.email}</p>
                        </div>

                        {/* Display Status/Other Info (Contoh tambahan) */}
                        <div className="grid gap-1">
                            <Label className="text-gray-500">Account Created</Label>
                            <p className="text-sm text-gray-700">
                                {new Date(user.created_at).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: 'View Details',
            href: '#',
        },
    ],
};
