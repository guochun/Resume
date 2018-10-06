; (function () {
    var view = document.querySelector('section.message')
    var model = {
        init: function() {
            var APP_ID = 'SG4vBmxl4ne4Io7jxgmqYXxh-gzGzoHsz';
            var APP_KEY = 'OVFd9XA3bKQlXoUVLY0CMCDG';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fecth: function() {
            var query = new AV.Query('Messages');
            return query.find()
        },
        save: function(name, content) {
            var Message = AV.Object.extend('Messages')
            var message = new Message();
            return message.save({
                name: name,
                content: content
            })
        }
    }
    var controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        contentInput: null,
        nameInput: null,
        init: function (view,model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.nameInput = this.form.querySelector('input[name=name]')
            this.contentInput = this.form.querySelector('input[name=content]')
            this.model.init()
            this.loadMessages()
            this.bindEvent()
        },
        loadMessages: function () {
           
            this.model.fecth().then(function (message) {
                var messageItem = message.map(function (item) { return item.attributes })
                messageItem.forEach(function (msg) {
                    var item = this.CreatemessageItem(msg)
                    this.messageList.appendChild(item)
                },this)

            }.bind(this)).catch(function (error) {
                console.log(error)
            })
        },
        postMessage: function () {
            var name = this.nameInput.value
            var content = this.contentInput.value
            this.model.save(name,content).then(function (obj) {
                var item = this.CreatemessageItem(obj.attributes)
                this.messageList.appendChild(item)
                this.nameInput.value = ''
                this.contentInput.value = ''
            }.bind(this))
        },
        bindEvent: function () {
            this.form.addEventListener('submit', function (e) {
                e.preventDefault()
                this.postMessage()
            }.bind(this))
        },
        CreatemessageItem: function (msg) {
            var content = msg.content
            var name = msg.name
            var li = document.createElement('li')
            li.textContent = `${name}: ${content}`
            return li;
        }
    }
    controller.init(view,model)
})()










