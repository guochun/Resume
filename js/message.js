var APP_ID = 'SG4vBmxl4ne4Io7jxgmqYXxh-gzGzoHsz';
var APP_KEY = 'OVFd9XA3bKQlXoUVLY0CMCDG';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var messageList = document.querySelector('#messageList')

var query = new AV.Query('Messages');
query.find().then(function (message) {
    var messageItem = message.map(function(item){ return item.attributes})
    messageItem.forEach(function(item){
        var content = item.content
        var name = item.name
        var li = document.createElement('li')
        li.textContent = `${name}: ${content}`
        messageList.appendChild(li)
    })

}).catch(function(error){
    console.log(error)
})

var form = document.querySelector('#postMessageForm')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    var name = this.querySelector('input[name=name]').value
    var content = this.querySelector('input[name=content]').value
    var Message = AV.Object.extend('Messages')
    var message = new Message();
    message.save({
        name: name,
        content: content   
    }).then(function (obj) {
        var li = document.createElement('li')
        li.textContent = `${obj.attributes.name}: ${obj.attributes.content}`
        messageList.appendChild(li)
        this.querySelector('input[name=name]').value=''
        this.querySelector('input[name=content]').value=''
    })

})
