<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class AppNotification extends Notification
{
    use Queueable;

    /**
     * NOTIFICATION TYPES
     * 
     * NEW POST: STANLEY EIRES added a post
     * FREIEND SUGGESTION: You have a new friend suggestion: STANLEY EIRES
     * COMMENT: EIRES STANLEY commented on your post
     * NEW DEVICE: There was a login to your account from a new device. 
     */




    /**
     * Create a new notification instance.
     */
    public function __construct(protected $db = null, protected $mail = null, protected $sms = null)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $channels = [];
        if ($this->db) {
            $channels[] = 'database';
        }
        if ($this->mail) {
            $channels[] = 'mail';
        }
        if ($this->sms) {
            $channels[] = 'sms';
        }
        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject($this->mail['subject'])
            ->line(new HtmlString($this->mail['message']));

        // return (new MailMessage)
        //     ->subject($this->mail['subject'])
        //     ->line($this->mail['message']);
        // ->line($this->mail['button']['prefix'])
        // ->action($this->mail['button']['text'], url($this->mail['button']['url']))
        // ->line('Thank you for choosing ' . config('app.name') . '!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }

    /**
     * Get the database representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return $this->db;
    }
}
