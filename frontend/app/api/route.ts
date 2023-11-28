import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer()


export const config = {
    api: {
        bodyParser: false
    }
}

export default (req:any, res:any) => {
    return new Promise<void>((resolve, reject) => {
        proxy.web(req, res, {target: 'http://localhost:8000', changeOrigin: true}, (err => {
            if (err){
                return reject(err)
            }

            resolve()
        }))
    })
}
