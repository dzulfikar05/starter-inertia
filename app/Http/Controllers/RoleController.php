<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Menampilkan daftar Role.
     */
    public function index()
    {
        $data = Role::with('permissions')->latest()->get();

        return Inertia::render('Roles/Index', [
            'roles' => $data
        ]);
    }

    /**
     * Form tambah role.
     */
    public function create()
    {
        // Mengirim semua permission untuk dipilih di checkbox grouping
        $data = Permission::all();

        return Inertia::render('Roles/Create', [
            'permissions' => $data
        ]);
    }

    /**
     * Menyimpan role baru dan sinkronisasi permission.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'array'
        ]);

        $role = Role::create(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('roles.index')->with('success', 'Role berhasil dibuat.');
    }

    /**
     * Menampilkan detail role (Opsional).
     */
    public function show(string $id)
    {
        $role = Role::with('permissions')->findOrFail($id);

        return Inertia::render('Roles/Show', [
            'role' => $role
        ]);
    }

    /**
     * Form edit role.
     */
    public function edit(string $id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        $permissions = Permission::all();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Memperbarui role dan sinkronisasi ulang permission.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $id,
            'permissions' => 'array'
        ]);

        $role->update(['name' => $request->name]);

        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('success', 'Role berhasil diperbarui.');
    }

    /**
     * Menghapus role.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role berhasil dihapus.');
    }
}
