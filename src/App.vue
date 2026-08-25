<template><router-view /></template>

<script setup lang="ts">
import { useMeta } from "quasar";
useMeta({ title: "My Personal Agent", titleTemplate: (title) => title || "My Personal Agent" });
</script>
