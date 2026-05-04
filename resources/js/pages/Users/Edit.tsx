import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { User } from '@/types';

export default function Edit({ user }: { user: User }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <>
            <Head title="Edit User" />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">
                            Edit User
                        </h2>
                        <Button asChild variant="outline">
                            <Link href="/users">
                                <ArrowLeftCircleIcon className="mr-2 h-4 w-4" />{' '}
                                Back
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Form Section */}
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <form onSubmit={submit} className="max-w-xl space-y-4">
                        {/* Input Name */}
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <span className="text-sm text-red-500">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        {/* Input Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Input Password (Opsional) */}
                        <div className="space-y-1">
                            <Label htmlFor="password">
                                New Password (Leave blank to keep current)
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Input Confirm Password */}
                        <div className="space-y-1">
                            <Label htmlFor="password_confirmation">
                                Confirm New Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
                                disabled={processing}
                            >
                                {processing ? 'Updating...' : 'Update User'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: 'Edit',
            href: '#',
        },
    ],
};
