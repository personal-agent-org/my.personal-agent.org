<template>
  <main class="portal-page">
    <section class="portal-card">
      <header>
        <img src="/mark.svg" alt="Personal Agent" width="62" height="62" />
        <div>
          <span>{{ t("portal.service") }}</span>
          <h1>{{ redirecting ? t("portal.redirecting") : t("portal.title") }}</h1>
        </div>
      </header>

      <template v-if="redirecting">
        <div class="wait-screen">
          <div class="spinner" aria-hidden="true"></div>
          <p>{{ t("portal.redirectTarget", { instance: savedInstance }) }}</p>
          <small>{{ targetUrl }}</small>
        </div>
        <button class="open-instance" type="button" @click="openTarget">
          {{ t("portal.openNow") }}
        </button>
        <button class="change-instance" type="button" @click="editInstance">
          {{ t("portal.change") }}
        </button>
      </template>

      <template v-else>
        <p class="lead">{{ t("portal.intro") }}</p>
        <form @submit.prevent="saveInstance">
          <label for="instance-url">{{ t("portal.instanceLabel") }}</label>
          <div class="instance-field">
            <input
              id="instance-url"
              v-model="instanceInput"
              type="url"
              inputmode="url"
              autocomplete="url"
              :placeholder="t('portal.instancePlaceholder')"
              required
            /><button type="submit">{{ t("portal.save") }}</button>
          </div>
          <p v-if="problem" class="error">{{ problem }}</p>
        </form>
      </template>

      <footer>
        <LockIcon /><span>{{ t("portal.privacy") }}</span>
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useMeta } from "quasar";
import { useI18n } from "vue-i18n";
import LockIcon from "@/components/LockIcon.vue";
import { buildInstanceUrl, normalizeInstanceUrl } from "@/services/instance";

const STORAGE_KEY = "personal-agent.instance-origin.v1";
const REDIRECT_DELAY_MS = 1200;
const { t } = useI18n();
const savedInstance = ref("");
const instanceInput = ref("");
const redirecting = ref(false);
const problem = ref("");
let redirectTimer: ReturnType<typeof setTimeout> | undefined;

const targetUrl = computed(() =>
  savedInstance.value
    ? buildInstanceUrl(
        savedInstance.value,
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      )
    : "",
);

useMeta({ title: "My Personal Agent" });

onMounted(() => {
  savedInstance.value = localStorage.getItem(STORAGE_KEY) ?? "";
  instanceInput.value = savedInstance.value;
  if (savedInstance.value) scheduleRedirect();
});
onBeforeUnmount(cancelRedirect);

function scheduleRedirect() {
  cancelRedirect();
  redirecting.value = true;
  redirectTimer = setTimeout(openTarget, REDIRECT_DELAY_MS);
}

function cancelRedirect() {
  if (redirectTimer) clearTimeout(redirectTimer);
  redirectTimer = undefined;
}

function saveInstance() {
  try {
    const normalized = normalizeInstanceUrl(instanceInput.value);
    if (normalized === window.location.origin) throw new Error("loop");
    localStorage.setItem(STORAGE_KEY, normalized);
    savedInstance.value = normalized;
    instanceInput.value = normalized;
    problem.value = "";
    scheduleRedirect();
  } catch (error) {
    const code = error instanceof Error ? error.message : "invalid";
    problem.value = t(`portal.errors.${code}`);
  }
}

function editInstance() {
  cancelRedirect();
  redirecting.value = false;
  instanceInput.value = savedInstance.value;
}

function openTarget() {
  cancelRedirect();
  window.location.replace(targetUrl.value);
}
</script>
