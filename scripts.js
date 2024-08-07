document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the "email-div" class
    var emailDivs = document.querySelectorAll('.email-div');
    emailDivs.forEach(function(div) {
        // Attach event listeners to copy the text on mouse down or touch start
        div.addEventListener('mousedown', function(event) { copyText(event.target); });
        div.addEventListener('touchstart', function(event) { copyText(event.target); });

        function copyText(element) {
            // Copy the text inside the first <p> element
            var textToCopy = element.querySelector('p').innerText;
            navigator.clipboard.writeText(textToCopy).then(function() {
                console.log('Text copied to clipboard: ' + textToCopy);
            }, function(err) {
                console.error('Failed to copy text: ', err);
            });
        }
    });

    // 加载留言
    function loadMessages() {
        // 使用 GitHub Pages 中的 JSON 文件 URL
        axios.get('https://syx3204.github.io/messages.json')
            .then(response => {
                var messages = response.data;
                var messageList = document.getElementById('message-list');
                messageList.innerHTML = ''; // 清空现有的留言
                messages.forEach(function(message) {
                    var messageItem = document.createElement('div');
                    messageItem.className = 'message-item';
                    messageItem.innerHTML = `
                        <p class="message-header">${message.name}</p>
                        <p>Email: ${message.email}</p>
                        <p>Message: ${message.message}</p>
                    `;
                    messageList.appendChild(messageItem);
                });
            })
            .catch(error => console.error('Error loading messages:', error));
    }

    // 添加表单提交事件处理程序
    document.getElementById('message-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        // 获取表单值
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;

        // 提交数据到远程服务器
        axios.post('https://syx3204.github.io/messages.json', {
            name: name,
            email: email,
            message: message
        }).then(function(response) {
            console.log('Data submitted successfully');
            // 清空表单
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            // 显示提交成功消息
            document.getElementById('success-message').style.display = 'block';
            // 加载留言
            loadMessages();
        }).catch(function(error) {
            console.error('Error submitting data:', error);
        });
    });

    // 加载留言
    loadMessages();
});
