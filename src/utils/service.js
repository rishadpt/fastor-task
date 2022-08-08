const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fastorServices = {

    getRestaurants: () => {
        return new Promise((resolve, reject) => {

            fetch(`${BASE_URL}m/restaurant?city_id=118&`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('AccessToken')
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
    },
    postRegister : (data)=>{
        return new Promise((resolve, reject) => {
            console.log(data.mobile)
            fetch(`${BASE_URL}pwa/user/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    dial_code : '+91',
                    phone : data,
                })
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                }
            );
        }
    )
    },

    postLogin : (data)=>{
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}pwa/user/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    dial_code : '+91',
                    phone : data.phone,
                    otp: data.otp
                })
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                }
            );
        }
    )
    },
}