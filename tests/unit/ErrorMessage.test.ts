import { mount } from "@vue/test-utils";
import ErrorMessage from "@/components/ErrorMessage.vue";

jest.useFakeTimers(); // To mock timers like setTimeout

describe("ErrorMessage.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ErrorMessage, {
      propsData: {
        message: "",
        type: "error",
      },
    });
  });

  test("shows message when `message` prop is updated", async () => {
    expect(wrapper.vm.isVisible).toBe(false);
    await wrapper.setProps({ message: "Test message" });
    expect(wrapper.vm.isVisible).toBe(true);
  });

  test("hides message after 1 second", async () => {
    await wrapper.setProps({ message: "Test message" });
    expect(wrapper.vm.isVisible).toBe(true);
    jest.advanceTimersByTime(1000);
    expect(wrapper.vm.isVisible).toBe(false);
  });

  test("applies the correct class based on the `type` prop", async () => {
    await wrapper.setProps({ message: "Test message" });
    expect(wrapper.find(".error-message").exists()).toBe(true);
    await wrapper.setProps({ type: "success", message: "Success message" });
    expect(wrapper.find(".success-message").exists()).toBe(true);
  });

  test("renders the correct content for the `message` prop", async () => {
    const testMessage = "Custom error message";
    await wrapper.setProps({ message: testMessage });

    expect(wrapper.find("p").text()).toBe(testMessage);
  });
});
