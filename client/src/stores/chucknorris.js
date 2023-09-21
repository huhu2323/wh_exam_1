import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
const mainUrl = 'http://localhost:3001';

export const chuckStore = defineStore('chuck', () => {

    const searchedJoke = ref({
        categories: [],
        created_at: '',
        icon_url: '',
        id: '',
        updated_at: '',
        url: '',
        value: ''
    });

    const getCategories = async () => {
        return await axios({
            url: mainUrl + '/categories',
            method: 'get',
        });
    }

    const searchByCategory = async (searchValue) => {
        return await axios({
            url: mainUrl + '/category/' + searchValue,
            method: 'get',
        });
    }

    return { getCategories, searchByCategory, searchedJoke }
})
