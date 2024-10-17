<template>
  <div class="character-detail">
    <h2>{{ character.name }}</h2>
    <img :src="character.image" alt="Character Image" />
    <p><strong>Описание:</strong> {{ character.description }}</p>
    <p><strong>Возраст:</strong> {{ character.age }}</p>
    <p><strong>Раса:</strong> {{ character.race }}</p>
    <button @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.character-detail {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.character-detail img {
  max-width: 100%;
  height: auto;
}
.character-card {
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}
</style>
