<template>
  <div v-if="message" :class="messageClass">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ErrorMessage",
  props: {
    message: {
      type: String as PropType<string>,
      required: false,
      default: "",
    },
    type: {
      type: String as PropType<string>,
      required: false,
      default: "error",
    },
  },
  computed: {
    messageClass(): string {
      return this.type === "error" ? "error-message" : "success-message";
    },
  },
});
</script>

<style lang="css">
.error-message {
  color: red;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid red;
}

.success-message {
  color: green;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid green;
}
</style>
