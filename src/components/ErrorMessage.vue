<template>
  <transition name="fade" @after-leave="onAfterLeave">
    <div v-if="isVisible" :class="messageClass">
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from "vue";

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
  setup(props) {
    const isVisible = ref(false);

    watch(
      () => props.message,
      (newMessage) => {
        if (newMessage) {
          isVisible.value = true;

          setTimeout(() => {
            isVisible.value = false;
          }, 1000);
        }
      }
    );

    const messageClass = computed(() => {
      return props.type === "error" ? "error-message" : "success-message";
    });

    const onAfterLeave = () => {
      console.log("Message has faded out");
    };

    return {
      isVisible,
      messageClass,
      onAfterLeave,
    };
  },
});
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

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
