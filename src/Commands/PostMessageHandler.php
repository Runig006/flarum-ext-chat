<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Carbon\Carbon;
use Xelson\Chat\ChatRepository;
use Xelson\Chat\Message;
use Xelson\Chat\MessageValidator;
use Flarum\User\AssertPermissionTrait;

class PostMessageHandler
{
    use AssertPermissionTrait;

    /**
     * @var MessageValidator
     */
    protected $validator;

    /**
     * @param MessageValidator      $validator
     * @param ChatRepository        $chats
     */
    public function __construct(
        MessageValidator $validator,
        ChatRepository $chats
    ) {
        $this->validator = $validator;
        $this->chats = $chats;
    }

    /**
     * Handles the command execution.
     *
     * @param PostMessage $command
     * @return null|string
     */
    public function handle(PostMessage $command)
    {
        $actor = $command->actor;
        $attributes = $command->data['attributes'];
        $ip_address = $command->ip_address;

        $content = $attributes['message'];
        $chat_id = $attributes['chat_id'];

        $chat = $this->chats->findOrFail($chat_id, $actor);

        $this->assertCan(
            $actor,
            'xelson-chat.permissions.chat'
        );

        $chatUser = $chat->getChatUser($actor);

        $this->assertPermission(
            $chatUser && !$chatUser->removed_at
        );

        $message = Message::build(
            $content,
            $actor->id,
            Carbon::now(),
            $chat->id,
            $ip_address
        );

        $this->validator->assertValid($message->getDirty());

        $message->save();

        $chat->users()->updateExistingPivot($actor->id, ['readed_at' => Carbon::now()]);

        return $message;
    }
}
