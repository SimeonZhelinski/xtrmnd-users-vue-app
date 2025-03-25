<template>
  <div class="user-information-list">
    <button @click="fetchUsers">Load User Data</button>
    <Loader v-if="isLoading" :loaderColor="'#007bff'" />
    <error-message
      v-if="message"
      :message="message.text"
      :type="message.type"
    />
    <ul v-if="!isLoading">
      <li v-for="user in users" :key="user.id" class="user-item">
        <div class="user-header">
          <h2>Name: {{ user.name }}</h2>
          <p class="username">Username: {{ user.username }}</p>
        </div>
        <p class="email">{{ user.email }}</p>

        <div class="address">
          <h4>Address:</h4>
          <p>
            {{ user.address.street }}, {{ user.address.suite }},
            {{ user.address.city }}, {{ user.address.zipcode }}
          </p>
        </div>

        <p class="phone"><strong>Phone:</strong> {{ user.phone }}</p>
        <p class="website">
          <strong>Website:</strong>
          <a :href="'http://' + user.website" target="_blank">{{
            user.website
          }}</a>
        </p>

        <div class="company">
          <h4>Company:</h4>
          <p>{{ user.company.name }}</p>
          <p>{{ user.company.catchPhrase }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Loader from "./LoaderComponent.vue";
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "UserList",
  components: {
    Loader,
    ErrorMessage,
  },
  setup() {
    const users = ref([]);
    const isLoading = ref(false);
    const message = ref<{ text: string; type: string } | null>(null);

    const fetchUsers = async () => {
      isLoading.value = true;
      message.value = null;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        users.value = await response.json();
        message.value = {
          text: "User data loaded successfully!",
          type: "success",
        };
      } catch (err: any) {
        message.value = {
          text:
            err.message ||
            "An error has occurred. Please check your internet connection or data source.",
          type: "error",
        };
      } finally {
        isLoading.value = false;
      }
    };

    return {
      users,
      isLoading,
      message,
      fetchUsers,
    };
  },
};
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 800px;
}

.user-item {
  margin: 15px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.user-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.username {
  font-size: 16px;
  color: #777;
}

.email {
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

.address,
.company {
  margin-top: 10px;
}

.address h4,
.company h4 {
  font-size: 18px;
  margin-bottom: 5px;
}

.phone,
.website {
  font-size: 16px;
  margin-top: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

li:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

@media (max-width: 600px) {
  .user-list {
    padding: 10px;
  }

  .user-item {
    padding: 15px;
    margin: 10px 0;
  }

  button {
    width: 100%;
    font-size: 18px;
  }

  ul {
    width: 100%;
    padding: 0;
  }
}
</style>
