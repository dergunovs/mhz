import { ref, onMounted, onBeforeUnmount } from 'vue';

export interface IPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export function usePWA() {
  const isShowInstallPWA = ref(false);
  const isPWACanBeInstalled = ref(false);
  const installPWAPrompt = ref<IPromptEvent | undefined>();

  async function installPWA() {
    await installPWAPrompt.value?.prompt();

    setTimeout(() => {
      isShowInstallPWA.value = false;
      installPWAPrompt.value = undefined;
    }, 100);
  }

  function isInstallPromptEvent(e: Event): e is IPromptEvent {
    return !!e && 'prompt' in e;
  }

  function installHandler(event: Event) {
    if (isInstallPromptEvent(event)) {
      isPWACanBeInstalled.value = true;
      isShowInstallPWA.value = true;
      installPWAPrompt.value = event;
    }
  }

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', installHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', installHandler);
  });

  return {
    installPWA,
    isShowInstallPWA,
  };
}
