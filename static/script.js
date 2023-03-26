var recordBtn = document.getElementById('record-btn');
var recorder;

// 检查浏览器是否支持录音
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');

    // 创建MediaRecorder对象
    navigator.mediaDevices.getUserMedia({audio: true})
        .then(function(stream) {
            recorder = new MediaRecorder(stream);
            console.log('MediaRecorder initialized.');
        })
        .catch(function(err) {
            console.error('Failed to initialize MediaRecorder:', err);
        });

    // 开始录音
    recordBtn.addEventListener('click', function() {
        recorder.start();
        console.log('Recording started.');
    });

    // 停止录音并上传音频数据
    recorder.addEventListener('dataavailable', function(e) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);
        xhr.setRequestHeader('Content-Type', 'audio/wav');
        xhr.send(e.data);
        console.log('Audio data uploaded.');
    });

} else {
    console.error('getUserMedia not supported on your browser!');
}