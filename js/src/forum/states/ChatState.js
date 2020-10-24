import ChatPreview from '../components/ChatPreview';
import ChatViewport from '../components/ChatViewport';
import ChatMessage from '../components/ChatMessage';

import Model from 'flarum/Model';
import evented from 'flarum/utils/evented';

import * as resources from '../resources';

var refAudio = new Audio();
refAudio.src = resources.base64AudioNotificationRef;
refAudio.volume = 0.5;

var audio = new Audio();
audio.src = resources.base64AudioNotification;
audio.volume = 0.5;

class ChatState
{
	init()
	{
		this.chats = [];
		this.chatmessages = [];

		this.curChat = null;
		this.evented = evented;
		this.totalHiddenCount = 0;

		let neonchatState = JSON.parse(localStorage.getItem('neonchat')) ?? {};
		this.frameState = 
		{
			beingShown: neonchatState.beingShown ?? app.forum.attribute('pushedx-chat.settings.display.minimize'),
			beingShownChatsList: neonchatState.beingShownChatsList ?? 0,
			isMuted: neonchatState.isMuted ?? false,
			notify: neonchatState.notify ?? false,
			transform: neonchatState.transform ?? {x: 0, y: 400},
			isActive: true
		}
		
		this.permissions =
		{
            post: app.forum.attribute('pushedx-chat.permissions.chat'),
            edit: app.forum.attribute('pushedx-chat.permissions.edit'),
            delete: app.forum.attribute('pushedx-chat.permissions.delete'),
			moderate: 
			{
				delete: app.forum.attribute('pushedx-chat.permissions.moderate.delete'),
				vision: app.forum.attribute('pushedx-chat.permissions.moderate.vision')
			}
		}

		this.viewportState = {};
		app.pusher.then(this.listenSocketChannels.bind(this));

		this.evented.on('onClickMessage', this.onChatMessageClicked.bind(this))
	}

	initViewportState()
	{
		return {
			loading: false,
			scroll: {autoScroll: true, oldScroll: 0, loadingFetch: false, needToScroll: true},
			input: {messageLength: 0, rows: 1, content: ''},
			messagesFetched: false,
		}
	}

	getViewportState(model)
	{
		return this.viewportState[model.id()]
	}

    listenSocketChannels(socket)
    {
        socket.main.bind('neonchat.events', this.handleSocketEvent.bind(this));
        if(socket.user) socket.user.bind('neonchat.events', this.handleSocketEvent.bind(this));
	}
	
	handleSocketEvent(r)
    {
		let message = r.response.message;
		if(message) message = app.store.pushPayload(message);

		switch(r.event.id)
		{
			case 'message.post':
			{
				if(!app.session.user || message.user().id() != app.session.user.id())
				{
					this.insertChatMessage(message, true);
					m.redraw();
				}
				break;
			}
			case 'message.edit':
			{
				let actions = message.data.attributes.actions;
				if(actions.msg !== undefined)
				{
					if(!app.session.user || message.user().id() != app.session.user.id())
						this.editChatMessage(message, false, actions.msg);
				}
				else if(actions.hide !== undefined)
				{
					if(!app.session.user || actions.invoker != app.session.user.id())
						actions.hide ? this.hideChatMessage(message, false, message.deleted_by()) : this.restoreChatMessage(message, false)
				}
				break;
			}
			case 'message.delete':
			{
				if(!app.session.user || message.deleted_by().id() != app.session.user.id())
					this.deleteChatMessage(message, false, message.deleted_by())

				break;
			}
		}
	}

	getFrameState(key)
	{
		return this.frameState[key];
	}

	saveFrameState(key, value)
	{
		let neonchatState = JSON.parse(localStorage.getItem('neonchat')) ?? {};	
		neonchatState[key] = value;
		localStorage.setItem('neonchat', JSON.stringify(neonchatState))

		this.frameState[key] = value;
	}

	getPermissions()
	{
		return this.permissions;
	}

	getChats()
	{
		return this.chats;
	}

	componentsChats()
	{
		return this.getChats().map(model => (
			<div onclick={this.onChatChanged.bind(this, model)}>
				<ChatPreview key={model.id()} model={model} />
			</div>
		));
	}

	addChat(model)
	{
		this.chats.push(model);
		this.viewportState[model.id()] = this.initViewportState();
	}

	onChatChanged(model, e)
	{
		e.redraw = false;
		if(model == this.getCurrentChat()) return;

		this.setCurrentChat(model);
		m.redraw.sync();

		this.evented.trigger('onChatChanged', model);
	}

    comporatorAscButZerosDesc(a, b)
    {
        return a == 0 ? 1 : (b == 0 ? -1 : a - b);
    }

	getChatMessages(filter)
	{
		let list = this.chatmessages.sort((a, b) => this.comporatorAscButZerosDesc(a.id(), b.id()));
		return filter ? list.filter(filter) : list;
	}

	apiFetchChatMessages(model, start_from)
	{
		let viewport = this.getViewportState(model);
		let self = this;

		viewport.scroll.loadingFetch = true;
		m.redraw();
		
        return app.store.find('chatmessages', {chat_id: model.id(), start_from})
            .then(r => {
                viewport.scroll.loadingFetch = false;

                r.map(model => self.insertChatMessage(model));
                m.redraw();
            });
	}

	componentChatMessage(model)
	{
		return <ChatMessage key={model.id()} model={model} />
	}

	componentsChatMessages()
	{
		return this.getChatMessages().map(model => this.componentChatMessage(model));
	}

	isChatMessageExists(model)
	{
		return this.chatmessages.find(e => e.id() == model.id());
	}

	insertChatMessage(model, notify = false)
	{
		if(this.isChatMessageExists(model)) return null;
		
		this.chatmessages.push(model);
		if(notify) 
		{
			this.messageNotify(model);
			model.needToFlash = true;
		}

		let list = this.getChatMessages(mdl => mdl.chat() == model.chat());
		if(model.id() && list[list.length - 1] == model)
			model.chat().pushData({relationships: {last_message: model}})
	}

	renderChatMessage(model, content)
	{
		let element = model instanceof Model ?
			document.querySelector(`.neonchat .message-wrapper[data-id="${model.id()}"] .message`)
			: model

		if(element)
		{
			s9e.TextFormatter.preview(content, element);

			setTimeout(() => {
				$('.neonchat script').each(function() {
					if(!self.executedScripts) self.executedScripts = {};
					let scriptURL = $(this).attr('src');
					if(!self.executedScripts[scriptURL])
					{
						var scriptTag = document.createElement("script");
						scriptTag.src = scriptURL;
						document.head.appendChild(scriptTag);
	
						self.executedScripts[scriptURL] = true;
					}
				});
			}, 10);
		}
	}

	onChatMessageClicked(eventName, model)
	{
		switch(eventName)
		{
			case 'dropdownHide':
			{
				this.hideChatMessage(model, true);
				break;
			}
			case 'dropdownRestore':
			{
				this.restoreChatMessage(model, true);
				break;
			}
			case 'dropdownDelete':
			{
				this.deleteChatMessage(model, true);
				break;
			}
		}
	}

	postChatMessage(model)
	{
		return model.save({message: model.content, created_at: new Date(), chat_id: model.chat().id()})
        .then(
            r => {
				model.timedOut = false;
				model.needToFlash = true;
				model.is_editing = false;
				model.chat().pushData({relationships: {last_message: model}});
            },
            r => {
                model.timedOut = true;
            }
        );
	}

	editChatMessage(model, sync = false, content)
	{
		model.content = content;
		model.needToFlash = true;
		model.pushAttributes({message: content, edited_at: new Date()});
		if(sync) model.save({actions: {msg: content}, edited_at: new Date(), message: content});

		m.redraw();
	}

	deleteChatMessage(model, sync = false, user = app.session.user)
	{
		model.deleted_forever = true;
		if(!model.deleted_by()) model.pushData({relationships: {deleted_by: user}});
		let list = this.getChatMessages(mdl => mdl.chat() == model.chat() && mdl != model);
		if(list.length) 
			model.chat().pushData({relationships: {last_message: list[list.length - 1]}})

		if(sync) model.delete();

		m.redraw();
	}

	totalHidden()
	{
		return this.totalHiddenCount
	}

	hideChatMessage(model, sync = false, user = app.session.user)
	{
		model.pushData({relationships: {deleted_by: user}});
		if(sync) model.save({actions: {hide: true}, relationships: {deleted_by: app.session.user}});

		this.totalHiddenCount++;
		m.redraw();
	}

	restoreChatMessage(model, sync = false)
	{
		console.log('restoring ', model);
		if(!this.isChatMessageExists(model))
		{
			this.insertChatMessage(model);
			model.needToFlash = true;
		}
		else
		{
			model.pushAttributes({deleted_by: 0});
			model.needToFlash = true;
			delete model.data.relationships.deleted_by;
		}
		if(sync) model.save({actions: {hide: false}, deleted_by: 0});

		m.redraw();
	}

	setCurrentChat(model)
	{
		this.curChat = model;
	}

	getCurrentChat()
	{
		return this.curChat;
	}

    apiFetchChats()
    {
		let self = this;

        return app.store.find('chats').then((chats) =>
        {
            chats.map(model => self.addChat(model));
            m.redraw();
        });
    }

	componentCurViewport()
	{
		let model = this.getCurrentChat();
		return model ? <ChatViewport model={model} /> : null;
	}

    messageNotify(model)
    {
        if((!app.session.user || (model.user().id() != app.session.user.id()))) 
            this.notifyTry(model);
    }
    
    notifyTry(model)
    {
        if(!("Notification" in window)) return;

        if(this.messageIsMention(model)) this.notifySend(model)
        this.notifySound(model);
    }

    messageIsMention(model)
    {
        return app.session.user && (model.message().indexOf('@' + app.session.user.username()) >= 0);
    }

    notifySend(model)
    {
        let avatar = model.user().avatarUrl();
		if(!avatar) avatar = resources.base64PlaceholderAvatarImage;

        if(this.getFrameState('notify') && document.hidden)
            new Notification(model.chat().finalTitle, {
				body: `${model.user().username()}: ${model.message()}`, 
				icon: avatar, 
				silent: true, 
				timestamp: new Date()
			});
    }

    notifySound(model) 
    {
        if(!this.getFrameState('isMuted')) 
        {
            let sound = this.messageIsMention(model) ? refAudio : audio;
            sound.currentTime = 0;
            sound.play();
        }
    }
}

export default new ChatState;