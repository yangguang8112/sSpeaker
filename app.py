from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    # 接收音频数据并保存成文件
    with open('audio.wav', 'wb') as f:
        f.write(request.data)
    return 'success'

if __name__ == '__main__':
    context = ('ssl.crt', 'ssl.key')
    app.run(debug=True, port=8000, host='0.0.0.0', ssl_context=context)
    # app.run(debug=True, port=8000, host='0.0.0.0')