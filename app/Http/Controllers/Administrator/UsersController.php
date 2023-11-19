<?php

namespace App\Http\Controllers\Administrator;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::withCount(['post', 'invited_by'])->with("roles:id,name");
        if ($request->get('search')) {
            $users = $users->where(
                fn ($query) => $query->where('firstname', 'like', "%{$request->search}%")
                    ->orWhere('lastname', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%")
            );
        }
        if ($request->get('status')) {
            $users = $users->where(['status' => $request->status]);
        }
        $data['users'] = $users->orderBy('firstname')->paginate(20);
        $data['filter'] = $request->all();
        return inertia("Admin/Users/Index", $data);
    }
    public function bulkOperations(Request $request, $action = null)
    {
        if ($action && $action == 'delete') {
            User::whereIn('id', $request->id)->delete();
        } else {
            User::whereIn('id', $request->id)->update($request->except(['id']));
        }
        return back()->with('message', ['content' => "Successful", 'status' => 'success']);
    }

    public function create()
    {
        $data['user'] = [];
        $data['roles'] = Role::get();
        return inertia("Admin/Users/Create", $data);
    }
    public function edit($id)
    {
        $data['user'] = User::select('firstname', 'lastname', 'email', 'phone', 'created_at', 'login_at', 'status', 'id', 'slug')->with('roles:id')->findOrFail($id);
        $data['roles'] = Role::get();
        return inertia("Admin/Users/Create", $data);
    }

    public function store(Request $request)
    {
        $data = $request->except(['callback', 'role']);
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        if ($data['id']) {
            $user = User::find($data['id']);
        } else {
            $user = new User();
        }
        $user->fill($data)->save();
        $user->syncRoles($request->role);
        if ($request->callback == 'close') {
            return to_route('administrator.users');
        } elseif ($request->callback == 'new') {
            return to_route('administrator.users.create');
        } elseif ($request->callback == 'save') {
            return to_route('administrator.users.edit', [$user->id])->with('message', ['content' => "Updated Successfully", 'status' => 'success']);
        }
        return back();
        // User::where('id', $data['id'])->update($data);
    }
}
