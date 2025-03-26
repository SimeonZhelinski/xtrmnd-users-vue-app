import { mount } from "@vue/test-utils";
import axios from "axios";
import Loader from "@/components/LoaderComponent.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import UserInformationList from "@/components/UserInformationList.vue";

jest.mock("axios");
jest.useFakeTimers();

describe("UserInformationList.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(UserInformationList, {
      global: {
        components: {
          Loader,
          ErrorMessage,
        },
      },
    });
  });

  test("fetchUsers function loads user data and sets loading state correctly", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        phone: "123-456-7890",
        website: "johndoe.com",
        address: {
          street: "123 Main St",
          suite: "Apt 1",
          city: "City",
          zipcode: "12345",
          geo: { lat: "0.0", lng: "0.0" },
        },
        company: {
          name: "Company A",
          catchPhrase: "Best company",
          bs: "Business Strategy",
        },
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });
    await wrapper.vm.fetchUsers();
    expect(wrapper.vm.users).toEqual(mockUsers);
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.message).toEqual({
      text: "User data loaded successfully!",
      type: "success",
    });
  });

  test("displays loader while fetching data", async () => {
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
    wrapper.vm.isLoading = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
  });

  test("displays error message on API failure", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({
      response: { status: 404, statusText: "Not Found" },
    });
    await wrapper.vm.fetchUsers();
    expect(wrapper.vm.message).toEqual({
      text: "Data not found (404). Please check the API URL.",
      type: "error",
    });
    expect(wrapper.vm.isLoading).toBe(false);
  });

  test("displays users when data is fetched successfully", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        phone: "123-456-7890",
        website: "johndoe.com",
        address: {
          street: "123 Main St",
          suite: "Apt 1",
          city: "City",
          zipcode: "12345",
          geo: { lat: "0.0", lng: "0.0" },
        },
        company: {
          name: "Company A",
          catchPhrase: "Best company",
          bs: "Business Strategy",
        },
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });
    await wrapper.vm.fetchUsers();
    expect(wrapper.findAll(".user-item").length).toBeGreaterThan(0);
  });

  test("displays error message component when message is set", async () => {
    const mockErrorMessage = { text: "Error occurred", type: "error" };
    wrapper.vm.message = mockErrorMessage;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).props("message")).toBe(
      mockErrorMessage.text
    );
    expect(wrapper.findComponent(ErrorMessage).props("type")).toBe(
      mockErrorMessage.type
    );
  });

  test("calls the fetchUsers method when button is clicked", async () => {
    const fetchUsersSpy = jest.spyOn(wrapper.vm, "fetchUsers");
    await wrapper.find("button").trigger("click");
    expect(fetchUsersSpy).toHaveBeenCalled();
  });
});
