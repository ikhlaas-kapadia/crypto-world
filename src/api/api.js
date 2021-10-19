import axios from "axios";
//ES6 syntax to import dotenv - dotenv is used to store priavte variables


//Fetch Summary stats from proxy api 
async function fetchData (page) {
    let url = `http://localhost:4999/api/v1/${page}`;
    
    try {
        let response = await axios.get(url);
        let {data}  = await response.data;
        
    
        // console.log(data);
        return data;

    } catch(error) {
	console.error(error);
    return [];
    }
}
// fetchData('stats');
export default fetchData;