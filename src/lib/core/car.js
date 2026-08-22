
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


export const serverMutation = async(path, data={}, method = 'POST') =>{
    
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,        //'POST' / 'PATCH'
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json()
}
