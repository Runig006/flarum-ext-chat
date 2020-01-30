import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import fullTime from 'flarum/helpers/fullTime';
import humanTime from 'flarum/utils/humanTime';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import extractText from 'flarum/utils/extractText';

import DropDown from 'flarum/components/Dropdown';
import Button from 'flarum/components/Button';
import Separator from 'flarum/components/Separator';

export default class ChatMessage extends Component
{
	init()
	{
		this.inited = false;
		this.labels = [];
		Object.assign(this, this.props);

		this.user = app.store.getById('users', this.actor);
        if(this.user == undefined)
        {
			app.store.find('users', this.actor).then((function(user) 
			{
				this.user = user;
				this.inited = true;
				this.userResolved(this);
				this.initLabels();

				m.redraw();
            }).bind(this));
		}
		else 
		{
			this.inited = true;
			this.userResolved(this);
			this.initLabels();
		}
		
		this.textFormat();
		this.instanceGetter(this);
	}

	view()
	{
		return (
			<div className='message-wrapper' data-id={this.id} config={this.configWrapper.bind(this)}>
				{this.inited ?
					<div>
						<a className='avatar-wrapper' href={app.route.user(this.user)} config={m.route}>
							<span>
								{avatar(this.user, {className: 'avatar'})}
							</span>
						</a>
						<div className='message-block'>
							<div className='toolbar'>
								<a className='name' onclick={this.chatFrame.insertMention.bind(this.chatFrame, this)}>
									{username(this.user).children[0] + ': '}
								</a>
								<a className='timestamp' title={fullTime(this.created_at).children[0]}>{this.humanTime = humanTime(this.created_at)}</a>
								<div className='labels'>
									{this.labels.map(label => label.condition() ? label.component : null)}
								</div>
								{this.user == app.session.user ?
									this.editDropDown()
									: (this.chatFrame.permissions.moderate.delete ? this.editDropDownModerate() : null)
								}
							</div>
							<div className='message'>
								<div config={this.configFormat.bind(this)}>
									{this.message}
								</div>
							</div>
						</div>
					</div>
					: <LoadingIndicator className='loading-old Button-icon' />
				}
			</div>
		)
	}

	initLabels()
	{
		this.labelBind(() => this.edited_at, (
			<div class='icon' title={extractText(app.translator.trans(
				'core.forum.post.edited_tooltip',
				{user: this.user, ago: humanTime(this.edited_at)}
			))}>
				<i class="fas fa-pencil-alt"></i>
			</div>
		));

		this.labelBind(() => this.deleted_by, (
			<div class='icon'>
				<i class="fas fa-trash-alt"></i>
			</div>
		));
	}

	labelBind(condition, component)
	{
		this.labels.push({condition: condition, component: component})
	}

	editDropDown()
	{
		return (
			<div className='edit'>
				<DropDown 
					buttonClassName="Button Button--icon Button--flat"
					menuClassName="Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right"
					icon="fas fa-ellipsis-h"
				>
					<Button 
						onclick={this.chatFrame.messageEdit.bind(this.chatFrame, this)} 
						icon='fas fa-pencil-alt'
						disabled={this.deleted_by || this.chatFrame.messageEditing || !this.chatFrame.permissions.edit}
					>
						{app.translator.trans('core.forum.post_controls.edit_button')}
					</Button>
					<Separator />
					{this.deleted_by ?
						<Button 
							onclick={this.restore.bind(this)} 
							icon='fas fa-reply'
						>
							{app.translator.trans('core.forum.post_controls.restore_button')}
						</Button>
						:
						<Button 
							onclick={this.hide.bind(this)} 
							icon='fas fa-trash-alt'
							disabled={!this.chatFrame.permissions.delete}
						>
							{app.translator.trans('core.forum.post_controls.delete_button')}
						</Button>
					}
				</DropDown>
			</div>
		)
	}

	editDropDownModerate()
	{
		return (
			<div className='edit'>
				<DropDown 
					buttonClassName="Button Button--icon Button--flat"
					menuClassName="Dropdown-menu--top Dropdown-menu--bottom Dropdown-menu--left Dropdown-menu--right"
					icon="fas fa-ellipsis-h"
				>
					{this.deleted_by ?
						<Button 
							onclick={this.restore.bind(this)} 
							icon='fas fa-reply'
						>
							{app.translator.trans('core.forum.post_controls.restore_button')}
						</Button>
						:
						<Button 
							onclick={this.hide.bind(this)} 
							icon='fas fa-trash-alt'
							disabled={!this.chatFrame.permissions.delete}
						>
							{app.translator.trans('core.forum.post_controls.delete_button')}
						</Button>
					}
				</DropDown>
			</div>
		)
	}

	configWrapper(element)
	{
		this.elementWrapper = element;
		if(this.needToFlash) 
		{
			this.flash();
			this.needToFlash = false;
		}
	}

	configFormat(element, isInitialized)
	{
		if(element.chatMessage == this.message) return;

		element.chatMessage = this.message
		this.element = element;
		this.textFormat();
	}

	textFormat(text)
	{
		if(!text) text = this.message
		if(this.element) s9e.TextFormatter.preview(text, this.element);

		setTimeout(() => {
			$('.chat script').each(function() {
				eval.call(window, $(this).text());
			});
		}, 1000);
	}

	hide()
	{
		this.deleted_by = app.session.user.id();
		this.elementWrapper.classList.add('deleted');

		this.apiDelete();
	}

	restore()
	{
		this.deleted_by = null;
		this.elementWrapper.classList.remove('deleted');

		this.apiDelete();
	}

	edit(newContent, outside = false)
	{
		this.edited_at = new Date();
		this.message = newContent;
		m.redraw();

		this.textFormat();
		this.flash();

		if(!outside) this.apiEdit(newContent);
	}

    apiEdit(content)
    {
        app.request({
            method: 'PATCH',
            url: app.forum.attribute('apiUrl') + '/chat/' + this.id,
            data: {msg: content}
        })
	}
	
	apiDelete()
	{
        app.request({
            method: 'DELETE',
            url: app.forum.attribute('apiUrl') + '/chat/' + this.id
        })
	}

	flash()
	{
		if(!this.elementWrapper) this.needToFlash = true;
		else this.flashItem($(this.elementWrapper));
	}

	/**
	 * https://github.com/flarum/core/blob/7e74f5a03c7f206014f3f091968625fc0bf29094/js/src/forum/components/PostStream.js#L579
	 * 
	 * 'Flash' the given post, drawing the user's attention to it.
	 *
	 * @param {jQuery} $item
	 */
	flashItem($item) {
		$item.addClass('flash').one('animationend webkitAnimationEnd', () => $item.removeClass('flash'));
	}
}