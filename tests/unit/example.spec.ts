import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/LoaderComponent.vue";

describe("LoaderComponent.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
