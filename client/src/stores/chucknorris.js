import { defineStore } from 'pinia';
import axios from 'axios';
const mainUrl = 'http://localhost:3001';

export const chuckStore = defineStore('chuck', () => {

    const getCategories = async () => {
        return await axios({
            url: mainUrl + '/categories',
            method: 'get',
        });
    }

  return { getCategories }
})
