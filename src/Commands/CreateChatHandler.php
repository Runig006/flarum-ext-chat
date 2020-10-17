<?php
/*
 * This file is part of xelson/flarum-ext-chat
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xelson\Chat\Commands;

use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Xelson\Chat\ChatRepository;

class CreateChatHandler
{
	use AssertPermissionTrait;

	/**
     * @param ChatRepository             $ctats
     */
	public function __construct(ChatRepository $chats) 
	{
        $this->chats  = $chats;
	}
	
    /**
     * Handles the command execution.
     *
     * @param CreateChat 	$command
     * @return null|string
     */
    public function handle(CreateChat $command)
    {
		$actor = $command->actor;
        $data = $command->data;
        $attributes = Arr::get($data, 'attributes', []);

		// Права на создание чата?
		// Личный чат между двумя пользователями не существует (валидация на фронте тоже должна быть)
		// Хендлим список айдишников пользователей для добавления в чат. В конце чат должен быть создан и данные
		// отосланы по сокету. Но сообщение сокета может прийти раньше чем http ответ (надо учесть)
		// Пользователь должен иметь возможность запретить приглашать себя куда либо
		// По-хорошему код на изменение чата (тайтл, участники) должен быть переиспользован, т.к у нас еще будет команда EditChat
		// Необходимо ввести тип сообщений для служебных уведомлений об событиях (создание чата, добавление юзеров) 

        return $data;
    }
}