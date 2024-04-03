import axios from "axios";

export const GetKnowldege = async (messages, partition_names) => {
    return new Promise((resolve, reject) => {
        axios.post("https://sea-turtle-app-qcwo5.ondigitalocean.app/chat", {
            query: messages,
            partition_names: partition_names
        }, {headers: {
            "Content-Type": "application/json"
        }}).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
};
