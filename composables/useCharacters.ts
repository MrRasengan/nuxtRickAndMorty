import { ref } from "vue";
import axios from "axios";

export const useCharacters = () => {
	const characters = ref<any[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const fetchCharacters = async (pages: number[]) => {
		loading.value = true;
		try {
			const requests = pages.map((page) => axios.get(`https://rickandmortyapi.com/api/character?page=${page}`));
			const responses = await Promise.all(requests);
			characters.value = responses.flatMap((response) => response.data.results);
		} catch (err) {
			error.value = "Ошибка загрузки данных";
		} finally {
			loading.value = false;
		}
	};

	return { characters, fetchCharacters, loading, error };
};
