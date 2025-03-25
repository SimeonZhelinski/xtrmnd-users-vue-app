<template>
  <div class="user-information-list">
    <button @click="fetchUsers">Load User Data</button>
    <Loader v-if="isLoading" :loaderColor="'#007bff'" />
    <ErrorMessage
      v-if="message"
      :message="message?.text ?? ''"
      :type="message?.type ?? 'error'"
    />
    <ul v-if="!isLoading">
      <li v-for="user in users" :key="user.id" class="user-item">
        <div class="user-header">
          <h2><strong>Name:</strong> {{ user.name }}</h2>
          <p class="username"><strong>Username:</strong> {{ user.username }}</p>
        </div>

        <p class="email">
          <i class="fas fa-envelope"></i> <strong>Email:</strong>
          {{ user.email }}
        </p>
        <div class="address">
          <h4><i class="fas fa-map-marker-alt"></i> Address:</h4>
          <p>
            {{ user.address.street }}, {{ user.address.suite }},
            {{ user.address.city }}, {{ user.address.zipcode }}
          </p>
          <p><i class="fas fa-map-pin"></i> <strong>Geolocation:</strong></p>
          <p>
            Latitude: {{ user.address.geo.lat }} Longitude:
            {{ user.address.geo.lng }}
          </p>
        </div>
        <p class="phone">
          <i class="fas fa-phone"></i> <strong>Phone:</strong> {{ user.phone }}
        </p>
        <p class="website">
          <i class="fas fa-link"></i> <strong>Website: </strong>
          <a :href="'https://' + user.website" target="_blank">{{
            user.website
          }}</a>
        </p>
        <div class="company">
          <h4><i class="fas fa-building"></i> Company:</h4>
          <p>{{ user.company.name }}</p>
          <p><strong>Catch Phrase:</strong> {{ user.company.catchPhrase }}</p>
          <p><strong>Business Strategy:</strong> {{ user.company.bs }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import Loader from "./LoaderComponent.vue";
import ErrorMessage from "./ErrorMessage.vue";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

interface Message {
  text: string;
  type: string;
}

export default {
  name: "UserList",
  components: {
    Loader,
    ErrorMessage,
  },
  setup() {
    const users = ref<User[]>([]);
    const isLoading = ref(false);
    const message = ref<Message>({ text: "", type: "info" });
    const fetchUsers = async () => {
      isLoading.value = true;
      message.value = { text: "", type: "info" };
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        users.value = response.data;
        message.value = {
          text: "User data loaded successfully!",
          type: "success",
        };
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 404) {
            message.value = {
              text: "Data not found (404). Please check the API URL.",
              type: "error",
            };
          } else if (err.response.status === 500) {
            message.value = {
              text: "Server error (500). Please try again later.",
              type: "error",
            };
          } else {
            message.value = {
              text: `Error: ${err.response.status} - ${err.response.statusText}`,
              type: "error",
            };
          }
        } else if (err.request) {
          message.value = {
            text: "Network error. Please check your connection or try again later.",
            type: "error",
          };
        } else {
          message.value = {
            text: err.message || "An unknown error occurred.",
            type: "error",
          };
        }
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

.user-information-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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

.email,
.phone,
.website {
  font-size: 16px;
  margin-top: 10px;
}

.website a {
  color: #007bff;
  text-decoration: none;
}

.website a:hover {
  text-decoration: underline;
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

li:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

@media (max-width: 600px) {
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

i {
  margin-right: 8px;
  color: #007bff;
  font-size: 1.2rem;
}

.phone i,
.website i,
.address i {
  font-size: 1.5rem;
}

.address h4 i,
.company h4 i {
  font-size: 1.6rem;
}

i.fas,
i.far,
i.fab {
  font-size: 18px !important;
}
</style>
