<template>
	<div class="pagination">
		<button @click="prevPage" :disabled="currentPage <= 1">Назад</button>
		<span>Страница {{ currentPage }} из {{ totalPages }}</span>
		<button @click="nextPage" :disabled="currentPage >= totalPages">Вперед</button>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
	currentPage: number;
	totalPages: number;
}>();

const emit = defineEmits(["change-page"]);

const prevPage = () => {
	if (props.currentPage > 1) {
		emit("change-page", props.currentPage - 1);
	}
};

const nextPage = () => {
	if (props.currentPage < props.totalPages) {
		emit("change-page", props.currentPage + 1);
	}
};
</script>

<style scoped>
.pagination {
	display: flex;
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
</style>
