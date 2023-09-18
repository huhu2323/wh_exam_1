<script setup>
import { onMounted } from 'vue';
import { chuckStore } from './stores/chucknorris';

const useChuckStore = chuckStore();
let categories = [];
// let selectedCategory = null;

onMounted(() => {
  useChuckStore.getCategories()
  .then((response) => {
    categories = response.data
    console.log(categories)
  });
})
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
                <select class="form-control">
                  <!-- <option value="null" selected>Select Category</option> -->
                  <option v-for="category in categories" :value="category" v-bind:key="category">{{ category }}</option>
                </select>
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Search</button>
              </div>
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
