<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * USERS: CAN VIEW_USERS, EDIT_USER, DELETE_USER, CREATE_USER 
         *  
         *  MANAGE_USERS,MANAGE_ROLES,MASS_MAIL_USERS
         * MANAGE_ARTICLES,MANAGE
         * 
         */

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $admin_role = Role::create(['name' => "Administrator"]);
        $registered_role = Role::create(['name' => 'Registered']);

        $manage_users = Permission::create(['name' => 'MANAGE_USERS']);
        $manage_roles = Permission::create(['name' => 'MANAGE_ROLES']);
        $ribara_default_features = Permission::create(['name' => 'RIBARA_DEFAULT_FEATURES']);

        $admin_role->syncPermissions([$manage_users, $manage_roles]);
        $ribara_default_features->syncPermissions([$ribara_default_features]);

        $users = User::select("id")->get();
        foreach ($users as $user) {
            $user->syncRoles($user->id == 1 ? $admin_role : $registered_role);
        }
    }
}
