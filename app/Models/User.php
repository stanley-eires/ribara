<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname', 'lastname', 'phone', 'usermeta', 'phone_verified_at',
        'email', 'password', 'slug', 'user_agents', 'is_admin', 'invited_by', 'avatar', 'headline', 'interests'
    ];

    protected $appends = ['fullname'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'password' => 'hashed',
        "usermeta" => "array",
        'user_agents' => "array",
        'is_admin' => 'boolean',
        'interests' => "array",
    ];

    protected $attributes = [
        "usermeta" => '{"dream_job":null,"bio":null,"available_for_work":false,"available_for_mentoring":false,"available_to_mentor":false,"country":null}',
        'user_agents' => '[]',
        'interests' => '{"mentorship":[],"protege":[]}'
    ];

    protected function fullname(): Attribute
    {
        return Attribute::make(get: fn ($value, $attribute) => "{$attribute['firstname']} {$attribute['lastname']}");
    }

    public function education()
    {
        return $this->hasMany(UserEducation::class);
    }
    public function experience()
    {
        return $this->hasMany(UserExperience::class);
    }
    public function certification()
    {
        return $this->hasMany(UserCertification::class);
    }
    public function post()
    {
        return $this->hasMany(Post::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public static function userConnectedFriends($user_id)
    {
        $connection = User::select('id', 'firstname', 'lastname', 'avatar', 'headline', 'slug', 'email')
            //GET MENTORS
            ->whereIn(
                'id',
                DB::table('connections')->select('user_id')->where(['status' => 'accepted', 'connection_type' => 'mentor', 'connected_user_id' => $user_id,])
            )->orWhereIn(
                'id',
                DB::table('connections')->select('connected_user_id')->where(['status' => 'accepted', 'connection_type' => 'protege', 'user_id' => $user_id,])
            )
            //GET PROTEGES
            ->orWhereIn(
                'id',
                DB::table('connections')->select('connected_user_id')->where(['status' => 'accepted', 'connection_type' => 'mentor', 'user_id' => $user_id,])
            )
            ->orWhereIn(
                'id',
                DB::table('connections')->select('user_id')->where(['status' => 'accepted', 'connection_type' => 'protege', 'connected_user_id' => $user_id])
            )
            //GET PEERS
            ->orWhereIn(
                'id',
                DB::table('connections')->select('user_id')->where(['status' => 'accepted', 'connected_user_id' => $user_id, 'connection_type' => 'peer'])
            )->orWhereIn(
                'id',
                DB::table('connections')->select('connected_user_id')->where(['status' => 'accepted', 'user_id' => $user_id, 'connection_type' => 'peer'])
            )
            ->orderBy('firstname')->get();
        return $connection;
    }
    public function connections()
    {
        return $this->hasMany(Connection::class, 'user_id')->select('user_id', 'connected_user_id', 'status');
    }

    public static function mentors($user_id)
    {
        return
            Connection::join('users', 'users.id', '=', 'connections.connected_user_id')
            ->select('connections.id', 'connections.connection_type', 'connections.status', 'connected_user_id', 'user_id')
            ->addSelect('users.firstname', 'users.lastname', 'users.slug', 'avatar', 'headline', 'users.id')
            ->where(['user_id' => $user_id, 'status' => 'accepted', 'connection_type' => 'protege'])->get()

            ->merge(
                Connection::join('users', 'users.id', '=', 'connections.user_id')
                    ->select('connections.id', 'connections.connection_type', 'connections.status', 'connected_user_id', 'user_id')->addSelect('users.firstname', 'users.lastname', 'users.slug', 'avatar', 'headline', 'users.id')->where(['connected_user_id' => $user_id, 'status' => 'accepted', 'connection_type' => 'mentor'])->get()
            )->sortBy('firstname')->values();
    }

    public static function proteges($user_id)
    {
        return
            Connection::join('users', 'users.id', '=', 'connections.user_id')
            ->select('connections.id', 'connections.connection_type', 'connections.status', 'connected_user_id', 'user_id')
            ->addSelect('users.firstname', 'users.lastname', 'users.slug', 'avatar', 'headline', 'users.id')
            ->where(['connected_user_id' => $user_id, 'status' => 'accepted', 'connection_type' => 'protege'])->get()

            ->merge(
                Connection::join('users', 'users.id', '=', 'connections.connected_user_id')
                    ->select('connections.id', 'connections.connection_type', 'connections.status', 'connected_user_id', 'user_id')->addSelect('users.firstname', 'users.lastname', 'users.slug', 'avatar', 'headline', 'users.id')->where(['user_id' => $user_id, 'status' => 'accepted', 'connection_type' => 'mentor'])->get()
            )->sortBy('firstname')->values();
    }
    public static function peers($user_id)
    {
        return
            Connection::join('users', 'users.id', '=', 'connections.user_id')
            ->select('connections.id', 'connections.connection_type', 'connections.status', 'connected_user_id', 'user_id')
            ->addSelect('users.firstname', 'users.lastname', 'users.slug', 'avatar', 'headline', 'users.id')
            ->where(['connected_user_id' => $user_id, 'status' => 'accepted', 'connection_type' => 'peer'])->get()

            ->merge(
                Connection::join('users', 'users.id', '=', 'connections.connected_user_id')
                    ->select('connections.id', 'connections.connection_type', 'connections.status', 'connected_user_id', 'user_id')->addSelect('users.firstname', 'users.lastname', 'users.slug', 'avatar', 'headline', 'users.id')->where(['user_id' => $user_id, 'status' => 'accepted', 'connection_type' => 'peer'])->get()
            )->sortBy('firstname')->values();
    }
    public static function pendingRequests($user_id)
    {
        return
            Connection::join('users', 'users.id', '=', 'connections.connected_user_id')
            ->select('connections.id', 'connections.connection_type', 'connections.status', 'connected_user_id', 'user_id')
            ->addSelect('users.firstname', 'users.lastname', 'users.slug', 'avatar', 'headline', 'users.id')
            ->where(['user_id' => $user_id, 'status' => 'pending'])->orderBy('firstname')->get();
    }
    public static function connectionStats($user_id, $columns = ['mentor', 'protege', 'peer', 'requests'])
    {
        $stats = [];
        if (in_array('mentor', $columns)) {
            $stats['mentor'] = Connection::where(['status' => 'accepted'])
                ->where(fn ($query) => $query->where(['user_id' => $user_id, 'connection_type' => 'protege'])->orWhere(fn ($query) => $query->where(['connected_user_id' => $user_id, 'connection_type' => 'mentor'])))->count();
        }
        if (in_array('protege', $columns)) {
            $stats['protege'] = Connection::where(['status' => 'accepted'])
                ->where(fn ($query) => $query->where(['user_id' => $user_id, 'connection_type' => 'mentor'])->orWhere(fn ($query) => $query->where(['connected_user_id' => $user_id, 'connection_type' => 'protege'])))->count();
        }
        if (in_array('peer', $columns)) {
            $stats['peer'] = Connection::where(['status' => 'accepted'])
                ->where(fn ($query) => $query->where(['user_id' => $user_id, 'connection_type' => 'peer'])->orWhere(fn ($query) => $query->where(['connected_user_id' => $user_id, 'connection_type' => 'peer'])))->count();
        }
        if (in_array('requests', $columns)) {
            $stats['requests'] = Connection::where(['user_id' => $user_id, 'status' => 'pending'])->count();
        }

        return $stats;
    }
}
