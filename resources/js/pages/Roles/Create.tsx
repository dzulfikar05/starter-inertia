import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeftCircleIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Permission {
    id: number;
    name: string;
}

export default function Create({ permissions }: { permissions: Permission[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as string[],
    });

    // State untuk kontrol Show/Hide per grup
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    // Mengelompokkan permission berdasarkan prefix
    const groupedPermissions = useMemo(() => {
        const groups: Record<string, Permission[]> = {};
        permissions.forEach((perm) => {
            const groupName = perm.name.split('.')[0];
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(perm);
        });
        return groups;
    }, [permissions]);

    const toggleAccordion = (groupName: string) => {
        setOpenGroups((prev) => ({
            ...prev,
            [groupName]: !prev[groupName],
        }));
    };

    const toggleGroup = (groupName: string, isChecked: boolean) => {
        const groupPermNames = groupedPermissions[groupName].map((p) => p.name);
        let newPermissions = [...data.permissions];

        if (isChecked) {
            groupPermNames.forEach((name) => {
                if (!newPermissions.includes(name)) newPermissions.push(name);
            });
        } else {
            newPermissions = newPermissions.filter(
                (name) => !groupPermNames.includes(name),
            );
        }
        setData('permissions', newPermissions);
    };

    const handleCheckboxChange = (permissionName: string) => {
        const current = [...data.permissions];
        const index = current.indexOf(permissionName);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(permissionName);
        }
        setData('permissions', current);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/roles');
    };

    return (
        <>
            <Head title="Create Role" />

            <div className="space-y-6 p-4">
                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">
                            Create New Role
                        </h2>
                        <Button asChild variant="outline">
                            <Link href="/roles">
                                <ArrowLeftCircleIcon className="mr-2 h-4 w-4" />{' '}
                                Back
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
                    <form onSubmit={submit} className="max-w-4xl space-y-6">
                        <div className="max-w-xl space-y-1">
                            <Label htmlFor="name">Role Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="e.g. Administrator"
                            />
                            {errors.name && (
                                <span className="text-sm text-red-500">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            <Label className="text-base font-bold text-slate-700">
                                Assign Permissions
                            </Label>

                            <div className="space-y-4">
                                {Object.entries(groupedPermissions).map(
                                    ([groupName, perms]) => {
                                        const isExpanded =
                                            !!openGroups[groupName];
                                        const isAllGroupChecked = perms.every(
                                            (p) =>
                                                data.permissions.includes(
                                                    p.name,
                                                ),
                                        );

                                        return (
                                            <div
                                                key={groupName}
                                                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all"
                                            >
                                                {/* Header Grup */}
                                                <div className="flex items-center justify-between bg-slate-50/50 p-4">
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                toggleAccordion(
                                                                    groupName,
                                                                )
                                                            }
                                                            className="rounded-md p-1 text-slate-500 hover:bg-slate-200"
                                                        >
                                                            {isExpanded ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                        <h3 className="font-bold text-slate-700 capitalize">
                                                            {groupName}{' '}
                                                            Management
                                                        </h3>
                                                    </div>

                                                    <div className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-white px-3 py-1">
                                                        <Checkbox
                                                            id={`all-${groupName}`}
                                                            checked={
                                                                isAllGroupChecked
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                toggleGroup(
                                                                    groupName,
                                                                    !!checked,
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={`all-${groupName}`}
                                                            className="cursor-pointer text-[10px] font-bold tracking-wider text-slate-500 uppercase"
                                                        >
                                                            Check All
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Konten Permission (Show/Hide) */}
                                                {isExpanded && (
                                                    <div className="grid grid-cols-1 gap-3 border-t border-slate-100 p-5 md:grid-cols-2 lg:grid-cols-3">
                                                        {perms.map(
                                                            (permission) => (
                                                                <div
                                                                    key={
                                                                        permission.id
                                                                    }
                                                                    className={`flex items-center space-x-3 rounded-xl border p-3 transition-all ${
                                                                        data.permissions.includes(
                                                                            permission.name,
                                                                        )
                                                                            ? 'border-blue-200 bg-blue-50/50'
                                                                            : 'border-transparent hover:bg-slate-50'
                                                                    }`}
                                                                >
                                                                    <Checkbox
                                                                        id={`perm-${permission.id}`}
                                                                        checked={data.permissions.includes(
                                                                            permission.name,
                                                                        )}
                                                                        onCheckedChange={() =>
                                                                            handleCheckboxChange(
                                                                                permission.name,
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={`perm-${permission.id}`}
                                                                        className="cursor-pointer text-sm font-medium text-slate-600 capitalize"
                                                                    >
                                                                        {permission.name.split(
                                                                            '.',
                                                                        )[1] ||
                                                                            permission.name}
                                                                    </label>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                            {errors.permissions && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.permissions}
                                </p>
                            )}
                        </div>

                        <div className="border-t pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Roles', href: '/roles' },
        { title: 'Create', href: '/roles/create' },
    ],
};
