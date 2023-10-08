<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserCertificationController;
use App\Http\Controllers\UserEducationController;
use App\Http\Controllers\UserExperienceController;
use App\Models\UserCertification;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('csv_ldif', function () {
//     $removeBom = fn ($str) => substr($str, 0, 3) == pack("CCC", 0xEF, 0xBB, 0xBF) ? substr($str, 3) : $str;
//     $csvFilePath = public_path('100level202324.csv');
//     $ldifFilePath = "output_" . date("Y_m_d") . '.ldif';

//     $csvContent = $removeBom(file_get_contents($csvFilePath));
//     $ldifFile = fopen($ldifFilePath, "w");
//     $lines = explode("\n", $csvContent);
//     foreach ($lines as $line) {
//         if ($line) {
//             $data = str_getcsv($line);
//             if ($data && !empty($data)) {

//                 $firstname = trim(ucfirst(strtolower($data[0])));
//                 $lastname = trim(ucfirst(strtolower($data[1])));
//                 $matric = trim($data[2]);
//                 $email = trim($data[3]);
//                 $fullname = "{$firstname} {$lastname}";
//                 $password = "Password23?";

//                 $ldifEntry = "dn: uid={$matric},ou=people,dc=covenantuniversity,dc=edu,dc=ng\n";
//                 $ldifEntry .= "cn: {$fullname}\n";
//                 $ldifEntry .= "displayname: {$fullname}\n";
//                 $ldifEntry .= "givenname: {$firstname}\n";
//                 $ldifEntry .= "mail: {$email}\n";
//                 $ldifEntry .= "objectclass: inetOrgPerson\n";
//                 $ldifEntry .= "objectclass: organizationalPerson\n";
//                 $ldifEntry .= "objectclass: person\n";
//                 $ldifEntry .= "objectclass: top\n";
//                 $ldifEntry .= "sn: {$lastname}\n";
//                 $ldifEntry .= "uid: {$matric}\n";
//                 $ldifEntry .= "userpassword: {$password}\n\n";

//                 fwrite($ldifFile, $ldifEntry);
//             }
//         }
//     }
//     fclose($ldifFile);

//     return "LDIF file created successfully!";

//     // if (($handle = fopen($csvFilePath, "r")) !== false) {
//     //     $ldifFile = fopen($ldifFilePath, "w");

//     //     while (($data = fgetcsv($handle, 1000, ",")) !== false) {
//     //         dd($data);
//     //         $firstname = trim(ucfirst(strtolower($data[0])));
//     //         $lastname = trim(ucfirst(strtolower($data[1])));
//     //         $matric = trim($data[2]);
//     //         $email = trim($data[3]);
//     //         $fullname = "{$data[0]} {$data[1]}";

//     //         $ldifEntry = "dn: cn={$matric},ou=people,dc=example,dc=com\n";
//     //         $ldifEntry .= "objectClass: top\n";
//     //         $ldifEntry .= "objectClass: person\n";
//     //         $ldifEntry .= "objectClass: organizationalPerson\n";
//     //         $ldifEntry .= "objectClass: inetOrgPerson\n";
//     //         $ldifEntry .= "uuid: {$matric}\n";
//     //         $ldifEntry .= "cn: {$fullname}\n";
//     //         $ldifEntry .= "sn: {$lastname}\n";
//     //         $ldifEntry .= "givenName: {$firstname}\n";
//     //         $ldifEntry .= "mail: {$email}\n\n";

//     //         fwrite($ldifFile, $ldifEntry);
//     //     }

//     //     // Close both files
//     //     fclose($handle);
//     //     fclose($ldifFile);

//     //     return "LDIF file created successfully!";
//     // } else {
//     //     return "Error opening CSV file.";
//     // }
// });


Route::redirect("/", "/login");

Route::redirect("/dashboard", "/feeds");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/feeds', [FeedController::class, 'index'])->name('feeds')->middleware('profile.check');
    Route::get('/post/{id}', [PostController::class, 'show'])->name('post.show');
    Route::get('/post/{id}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::post('/post', [PostController::class, 'save'])->name('post.save');

    Route::put('/post', [PostController::class, 'update'])->name('post.update');
    Route::patch('/post', [PostController::class, 'simpleUpdate'])->name('post.update.simple');
    Route::delete('/post', [PostController::class, 'destroy'])->name('post.destroy');

    Route::prefix('search')->group(function () {
        Route::get('', [SearchController::class, 'search'])->name('search');
        Route::get('{tab}', [SearchController::class, 'searchResult'])->name('search.results')->middleware('profile.check');
    })->middleware('profile.check');


    Route::get('comment', [CommentController::class, 'show'])->name('comment.show');
    Route::post('comment', [CommentController::class, 'store'])->name('comment.store');
    Route::put('comment', [CommentController::class, 'update'])->name('comment.update');
    Route::delete('comment', [CommentController::class, 'destroy'])->name('comment.destroy');
    Route::post('comment/actions', [CommentController::class, 'likeOrDislikeComment'])->name('comment.actions');
    Route::post('/comment/reply', [CommentController::class, 'reply'])->name('comment.reply.store');

    Route::get('like', [LikeController::class, 'show'])->name('like.show');
    Route::post('like', [LikeController::class, 'store'])->name('like.store');
    Route::delete('like', [LikeController::class, 'destroy'])->name('like.destroy');


    Route::get('/appointment', [AppointmentController::class, 'index'])->name('appointment.index')->middleware('profile.check');
    Route::post('/appointment', [AppointmentController::class, 'store'])->name('appointment.store');
    Route::delete('/appointment', [AppointmentController::class, 'destroy'])->name('appointment.destroy');
    Route::put('/appointment', [AppointmentController::class, 'actions'])->name('appointment.actions');
    Route::get('/user-appointments', [AppointmentController::class, 'getAppointments'])->name('appointment.get');
    Route::get('/appointment/schedule', [AppointmentController::class, 'schedule'])->name('appointment.schedule')->middleware('profile.check');


    Route::get('/user-suggestions', [ConnectionController::class, 'connectionSuggestions'])->name('users.suggestions');
    Route::get('invitation', [ConnectionController::class, 'invitation'])->name('users.invitation')->middleware('profile.check');
    Route::post('invitation', [ConnectionController::class, 'sendInvitation'])->name('users.invitation.send');

    Route::get('/connections', [ConnectionController::class, 'index'])->name('connections')->middleware('profile.check');
    Route::get('/connections/{id}', [ConnectionController::class, 'connections'])->name('user.connections');
    Route::post('/connect', [ConnectionController::class, 'connect'])->name('user.connect');
    Route::delete('/connect', [ConnectionController::class, 'disconnect'])->name('user.disconnect');
    Route::put('/connect', [ConnectionController::class, 'accept'])->name('user.connection.accept');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile-image', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/profile-image', [ProfileController::class, 'removeAvatar'])->name('profile.avatar.destroy');

    Route::prefix('search')->group(function () {
        Route::get('/people/{json?}', [FeedController::class, 'people'])->name('search.people')->middleware('profile.check');
    })->middleware('profile.check');

    Route::prefix('education')->group(function () {
        Route::get('create', [UserEducationController::class, 'create'])->name('education.create');
        Route::get('edit/{id}', [UserEducationController::class, 'edit'])->name('education.edit');
        Route::post('save', [UserEducationController::class, 'save'])->name('education.save');
        Route::delete('delete', [UserEducationController::class, 'destroy'])->name('education.destroy');
    })->middleware('profile.check');

    Route::prefix('experience')->group(function () {
        Route::get('create', [UserExperienceController::class, 'create'])->name('experience.create');
        Route::get('edit/{id}', [UserExperienceController::class, 'edit'])->name('experience.edit');
        Route::post('save', [UserExperienceController::class, 'save'])->name('experience.save');
        Route::delete('delete', [UserExperienceController::class, 'destroy'])->name('experience.destroy');
    })->middleware('profile.check');
    Route::prefix('certification')->group(function () {
        Route::get('create', [UserCertificationController::class, 'create'])->name('certification.create');
        Route::get('edit/{id}', [UserCertificationController::class, 'edit'])->name('certification.edit');
        Route::post('save', [UserCertificationController::class, 'save'])->name('certification.save');
        Route::delete('delete', [UserCertificationController::class, 'destroy'])->name('certification.destroy');
    })->middleware('profile.check');

    Route::get('/messages/{id?}', [MessageController::class, 'index'])->name('messages.index')->middleware('profile.check');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::delete('/messages/conversation', [MessageController::class, 'destroyConversation'])->name('messages.destroy.conversation');

    Route::get('/learning-box', fn () => inertia('Construction', ['title' => 'Learning Box']))->name('learning-box');
    Route::get('/community', fn () => inertia('Construction', ['title' => 'Community']))->name('community');
    Route::get('/ranking', fn () => inertia('Construction', ['title' => 'Ranking']))->name('ranking');
    Route::get('/analytics', fn () => inertia('Construction', ['title' => 'Analytics']))->name('analytics');
    Route::get('/settings', fn () => inertia('Construction', ['title' => 'Settings']))->name('settings');

    Route::prefix('notifications')->group(function () {
        Route::get('/read', [NotificationController::class, 'readAll'])->name('notifications.read.all');
        Route::post('/read', [NotificationController::class, 'read'])->name('notification.read');
    });
});

require __DIR__ . '/auth.php';

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::get('/{slug}/experiences', [UserExperienceController::class, 'index'])->name('profile.experience')->middleware('profile.check');
        Route::get('/{slug}/educations', [UserEducationController::class, 'index'])->name('profile.education')->middleware('profile.check');
        Route::get('/{slug}/certification', [UserCertificationController::class, 'index'])->name('profile.certification')->middleware('profile.check');
        Route::get('{slug}/{page?}', [ProfileController::class, 'index'])->name('profile.index');
        // Route::get('{slug}/{stream}', [ProfileController::class, 'index'])->name('profile.index');
        // Route::get('/{slug}/connections/', [ProfileController::class, 'index'])->name('profile.connections')->middleware('profile.check');
    }
);
