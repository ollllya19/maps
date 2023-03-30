import axios from 'axios';

const rootUrl = process.env.REACT_APP_API_URL;

export function getPolygons() {
    try{
        const url = `${rootUrl}/plots?populate=*`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
    } catch (error) {
        console.log(error)
        return []
    }
}

export function addPolygon(polygon) {
    try{
        let body = {
            // TODO
        }
        console.log(polygon)
        const url = `${rootUrl}/polygon`
        return axios.post(url, body)
        .then(res => res.data);
    } catch(error) {
        console.log(error);
        return [];
    }
}
