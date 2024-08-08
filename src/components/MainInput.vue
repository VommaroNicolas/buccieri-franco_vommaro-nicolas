<script>
// https://vuejs.org/guide/components/v-model.html
// Para que nuestro input personalizado pueda funcionar con el atributo v-model es necesario
// agregar una propiedad y un evento.
export default {
    name: 'MainInput',
    // Indicamos que este componente puede emitir un evento "update:modelValue".
    emits: ['update:modelValue'],
    // Indicamos las props que este componente acepta.
    props: {
        modelValue: {
            type: String,
        },
    },
}
</script>

<template>
    <input
        class="w-full p-2 border border-gray-500 rounded read-only:bg-gray-200"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>