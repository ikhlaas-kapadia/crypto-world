import axios from "axios";
//ES6 syntax to import dotenv - dotenv is used to store priavte variables


//Fetch Summary stats from proxy api 
async function fetchData (page, params = '') {
    let url = `http://localhost:4999/cryptoworld/${page}/${params}`;
    // console.log(url);
 
    
    try {
        let response = await axios.get(url);
        let data  = await response.data;
        
    
        console.log(data);
        return data;

    } catch(error) {
	
        return error;
    }
}
// fetchData('stats');
export default fetchData;