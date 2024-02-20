<template>
  <div class="about">
    <img
      class="about-cover"
      src="@/assets/images/profile/about-cover2.webp"
      alt=""
    />
    <h1 class="about-subtitle">{{ t("pages.about.title") }}</h1>
    <div class="about-content">
      <h2>{{ t("pages.about.content.title.1") }}:</h2>
      <p>
        {{ t("pages.about.content.text.1") }}
      </p>
      <h2>{{ t("pages.about.content.title.2") }}:</h2>
      <ul>
        <li v-for="index in 5" :key="index">
          {{ index }}.
          <span class="label">
            {{ t(`pages.about.content.list.title.${index}`) }} </span
          >:
          <span>
            {{ t(`pages.about.content.list.${index}`) }}
          </span>
        </li>
      </ul>
      <p>{{ t("pages.about.content.text.3") }}</p>
    </div>
  </div>
</template>

<script>
import { useI18n } from "@/hooks/use-i18n";

export default {
  title: "pages.home.nav.about",
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
</script>
