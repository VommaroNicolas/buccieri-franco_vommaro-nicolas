<template>
  <div class="progress-bar">
    <label :for="name" class="block text-gray-700 font-bold mb-2">{{ name }}</label>
    <input
      type="range"
      :id="name"
      :min="0"
      :max="100"
      v-model="rating"
      @input="updateRating"
      class="slider w-full"
    />
    <div class="w-full bg-gray-200 rounded-full h-4 mb-2 relative">
      <div :style="{ width: rating + '%' }" class="bg-blue-400 h-4 rounded-full"></div>
      <div class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-sm font-bold text-gray-800">
        {{ rating }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    name: String,
    rating: Number
  },
  methods: {
    updateRating(event) {
      this.$emit('update-rating', { name: this.name, rating: parseInt(event.target.value) });
    }
  }
};
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
</style>
