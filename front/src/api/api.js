import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3003/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': "*",

    }
});

export async function getSkills() {
    try {
        const response = await instance.get('skills')
        console.log(response);

    } catch (e) {
        console.log(e)
    }
}

export async function sendNote() {
    try {
        const response = await instance.post('skills' , {
            completed: true,
            date: '26 October',
            id:  '2a129c70-f74f-42a8-af14-654d65f7c211',
            normalDate: '2022-10-26' ,
            text: 'Hello',
            time: 1666775405075,
            title: 'Geography homework'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}





