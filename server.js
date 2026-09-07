const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = 8765;
const types = {
  '.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css',
  '.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.png':'image/png','.gif':'image/gif','.svg':'image/svg+xml','.webp':'image/webp'
};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if(p==='/')p='/index.html';
  const f = path.join(root, p);
  fs.readFile(f,(err,data)=>{
    if(err){res.writeHead(404);res.end('404');return;}
    const ext=path.extname(f).toLowerCase();
    res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream',
      'Cache-Control':'no-cache'});
    res.end(data);
  });
}).listen(port,'127.0.0.1',()=>console.log('serving on http://127.0.0.1:'+port));
