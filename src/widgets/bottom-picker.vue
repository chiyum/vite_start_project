<template>
  <teleport to="body">
    <div class="fixed z-50 inset-0 flex items-end">
      <div
        class="animate__animated animate__slideInUp animate__faster bg-white w-full flex flex-col items-end pb-6 z-20"
      >
        <div
          class="bg-gray-100 w-full border-b flex justify-between items-center p-5 mb-6"
        >
          <div class="font-normal text-60 text-blue-600" @click="onCancel">
            {{ t("button.cancel") }}
          </div>
          <div class="font-normal text-60 text-blue-600" @click="onConfirm">
            {{ t("button.confirm") }}
          </div>
        </div>
        <ScrollPicker
          class="w-full"
          :options="options"
          :modelValue="modelValue"
          @update:modelValue="onChanged"
        />
      </div>

      <div
        @click="onCancel"
        class="animate__animated animate__fadeIn animate__faster bg-black bg-opacity-40 absolute z-10 inset-0"
      ></div>
    </div>
  </teleport>
</template>
<script>
import useI18n from "@/hooks/use-i18n";
/** components */
import ScrollPicker from "vue3-scroll-picker";

export default {
  name: "BottomPicker",
  components: { ScrollPicker },
  props: {
    modelValue: Array,
    options: Array,
  },
  emits: ["update:modelValue", "confirm", "cancel"],
  setup(_, { emit }) {
    const { t } = useI18n();

    const onChanged = (value) => {
      emit("update:modelValue", value);
    };

    const onCancel = () => {
      emit("cancel");
    };

    const onConfirm = () => {
      emit("confirm");
    };

    return {
      t,
      onCancel,
      onConfirm,
      onChanged,
    };
  },
};
</script>
