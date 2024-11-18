// importing axios
import axios from 'axios'
//  configure the axios
export const commonAPI=async(httpMethod,url,reqBody)=>{
    let reqConfig={
        method:httpMethod,
        url:url,
        data:reqBody
    }
    return await axios(reqConfig).then((response)=>{
        return response
    })
    .catch((error)=>{
        return error
    })
}