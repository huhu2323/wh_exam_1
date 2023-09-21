<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { chuckStore } from './stores/chucknorris';

const mainUrl = 'https://api.chucknorris.io';

const useChuckStore = chuckStore();
const categories = ref([]);
const selectedCategory = ref('');

const filtered = (item) => {
  let splitted = item.split('');
  splitted[0] = splitted[0].toUpperCase();
  return splitted.join('');
};

onMounted(() => {
  useChuckStore.getCategories()
  .then((response) => {
    categories.value = response.data
  });
})

const searchByCategory = () => {
  if (selectedCategory.value) {
    useChuckStore.searchByCategory(selectedCategory.value)
    .then((response) => {
      useChuckStore.searchedJoke = response.data
    })
  }
  
}

</script>

<template>
  
  <div class="container py-4 px-3 mx-auto">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Chuck Norris</h1>
      </div>
      <div class="col-12">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab">Category</button>
            <button class="nav-link" id="free-tab" data-bs-toggle="tab" data-bs-target="#free-tab-pane" type="button" role="tab">Free Text</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="category-tab-pane" role="tabpanel" tabindex="0">
            <form class="row g-3 m-5">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">Categories</label>
              </div>
              <div class="col-auto w-25">
                <label for="category" class="visually-hidden">Category</label>
                <select class="form-control" v-model="selectedCategory">
                  <option selected disabled value="">Select Category</option>
                  <option v-for="category in categories" :value="category" v-bind:key="category">{{ filtered(category) }}</option>
                </select>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-primary mb-3" @click="searchByCategory">Search</button>
              </div>
            </form>

            <div class="col-12">
              <div class="card" v-if="useChuckStore.searchedJoke.id">
                <div class="card-header">
                  {{ useChuckStore.searchedJoke.created_at }}
                </div>
                <div class="card-body">
                  <p class="card-text">{{ useChuckStore.searchedJoke.value }}</p>
                </div>
                <div class="card-footer">
                  Joke Page
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="free-tab-pane" role="tabpanel" tabindex="0">
            <form class="form-inline mt-3">
              <div class="form-group mx-sm-3 mb-2 d-inline">
                <input type="text" class="form-control d-inline" id="search" placeholder="Search..">
              </div>
              <button type="submit" class="btn btn-primary mb-2 d-inline">Search</button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}
</style>
