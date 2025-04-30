import DOMAIN from "node:domain";

const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData  = { headers:{'Content-Type' :'multipart/form-data'}};
/*c
export const fileUploadRequest = async (data:FormData) => {
    onst result = await axios.post(FILE_UPLOAD_URL, data, multipartFormData )
        .then(response => {
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch(error => {
            return null;
        })
    return result;
}*/