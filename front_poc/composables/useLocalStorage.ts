import {onBeforeMount, Ref, watch} from "vue";

export function useLocalStorage<T>(key: string, ref: Ref<T>) {
    onBeforeMount(() => {
        console.log("beforeMount");
        const value = window.localStorage.getItem(key);
        if(value) {
            ref.value = JSON.parse(value);
        }
    })

    watch(ref, () => {
        console.log("watch");
        window.localStorage.setItem(key, JSON.stringify(ref.value));
    }, {deep: true})

    const setEntry = (refValue: T) => {
      ref.value = refValue;
      window.localStorage.setItem(key, JSON.stringify(refValue));
    }

    const clearEntry = () => {
        window.localStorage.setItem(key, "");
    }

    return {
        clearEntry, onBeforeMount
    }
}
