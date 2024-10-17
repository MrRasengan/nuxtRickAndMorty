<template>
	<div class="container">
		<h1>Найди персонажа из Rick and Morty</h1>
		<input v-model="search" placeholder="Поиск..." />
		<div class="view-toggle">
			<button @click="viewType = 'grid'">Плитка</button>
			<button @click="viewType = 'list'">Список</button>
		</div>
		<div :class="['characters', viewType]">
			<div
				v-for="character in paginatedCharacters"
				:key="character.id"
				class="character-card"
				@click="selectCharacter(character)"
			>
				<img :src="character.image" alt="" />
				<h3>{{ character.name }}</h3>
			</div>
		</div>
		<pagination :current-page="currentPage" :total-pages="totalPages" @change-page="onChangePage" />
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useCharacters } from "../composables/useCharacters";
import { useCharacterStore } from "../stores/characters";

const characterStore = useCharacterStore();
const { characters, fetchCharacters, loading, error } = useCharacters();
const search = ref("");
const viewType = ref("grid");
const currentPage = ref(1);
const itemsPerPage = 25;

onMounted(() => {
	document.title = "Rick and Morty";
	fetchCharacters([1, 2]);
});

const filteredCharacters = computed(() => {
	if (!search.value) {
		return characters.value;
	}
	return characters.value.filter((character) => character.name.toLowerCase().includes(search.value.toLowerCase()));
});

const paginatedCharacters = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	return filteredCharacters.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredCharacters.value.length / itemsPerPage));

const selectCharacter = (character) => {
	characterStore.selectCharacter(character);
};

const onChangePage = (page) => {
	currentPage.value = page;
};
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
}

.view-toggle {
	display: flex;
	gap: 10px;
	margin-bottom: 20px;
}

button {
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	padding: 10px 15px;
	cursor: pointer;
	transition: background-color 0.3s;
}

button:hover {
	background-color: #0056b3;
}

input {
	width: 300px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 20px;
}

.characters {
	flex-wrap: wrap;

	&.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 120px;
	}

	&.list {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 100px;
	}
}

.character-card {
	min-width: 300px;
	cursor: pointer;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
	transition: transform 0.2s;
}

.character-card:hover {
	transform: scale(1.05);
}
</style>
