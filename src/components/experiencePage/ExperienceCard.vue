<script setup>
const props = defineProps({
    activity: Object,
});

const { image, title, description } = props.activity;
</script>
<template>
    <div>
        <div>
            <img :src="image" :alt="title" />
        </div>
        <div>
            <span>{{ title }}</span>
            <p>{{ description }}</p>
        </div>
    </div>
</template>
