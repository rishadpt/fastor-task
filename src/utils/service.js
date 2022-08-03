const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fastorServices = {

    getRestaurants: () => {
        return new Promise((resolve, reject) => {

            fetch(`${BASE_URL}restaurant?city_id=118&`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                    'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
                }
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                }
            );
        })    
    }
}