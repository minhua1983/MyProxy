const http = require('http');
const express = require('express');
const proxy = require('express-http-proxy');
let app = express();
const angularProxy = proxy('http://localhost:4200', {
    /*
    //过滤器（可选）
    filter: function(req, res) {
        return req.method == 'GET';
    },
    //请求路径解析（可选）
    proxyReqPathResolver: function(req) {
        console.log(`请求的路径：${req.url}`);     //请求的路径：/article/list
        return `${req.url}?token=123456`        //转发请求路径： /article/list?token=123456
    },
    //返回数据处理,如果过程有异步操作应返回Promise（可选）
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        //同步
        data = JSON.parse(proxyResData.toString('utf8'));
        data.newProperty = 'exciting data';
        return JSON.stringify(data);
        //异步
        return new Promise(function(resolve) {
            proxyResData.funkyMessage = 'oi io oo ii';
            setTimeout(function() {
                resolve(proxyResData);
            }, 200);
        });
    }
    //*/
});
const apiProxy = proxy('http://localhost:5000', {
    proxyReqPathResolver: function(req) {
        /*
        console.log(`请求的路径：${req.url}`);     //请求的路径：/article/list
        return `${req.url}?token=123456`        //转发请求路径： /article/list?token=123456
        //*/
        // values -> /api/values
        const url = `/api${req.url}`;
        return url;
    }
});
app.use('/api', apiProxy);
app.use('/', angularProxy);


let server = http.createServer(app);
server.listen(14000, () => {
    console.log('基于express的node服务器已经启动，监听14000端口')
});