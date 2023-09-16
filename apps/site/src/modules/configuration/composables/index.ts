import { Ref, computed } from 'vue';

import { IConfiguration, IConfigurationParts } from 'mhz-types';

import { TMotherboardFormat, IConfigurationCheck, IConfigurationError } from '@/configuration/interface';

function getFieldValue(partsToSearch: IConfigurationParts, category: keyof IConfigurationParts, title: string) {
  return partsToSearch[category]?.fields?.find((field) => field.title === title)?.fieldValue.toString();
}

function checkFormat(
  motherboardFormat: TMotherboardFormat,
  caseFormat: TMotherboardFormat
): IConfigurationCheck | undefined {
  if (!motherboardFormat || !caseFormat) return;

  if (
    (motherboardFormat === 'Standard-ATX' && ['Micro-ATX', 'Mini-ITX'].includes(caseFormat)) ||
    (motherboardFormat === 'Micro-ATX' && ['Mini-ITX'].includes(caseFormat))
  ) {
    return {
      error: [
        { category: 'Motherboard', field: 'Format' },
        { category: 'Case', field: 'Format' },
      ],
      message: `Motherboard wont fit in case. Choose bigger case format, at least ${motherboardFormat}.`,
    };
  }
}

function checkSocket(motherboardSocket?: string, cpuSocket?: string): IConfigurationCheck | undefined {
  if (!motherboardSocket || !cpuSocket) return;

  if (motherboardSocket !== cpuSocket) {
    return {
      error: [
        { category: 'Motherboard', field: 'Socket' },
        { category: 'CPU', field: 'Socket' },
      ],
      message: `Motherboard socket is ${motherboardSocket} and CPU socket is ${cpuSocket}. Use same sockets.`,
    };
  }
}

function checkRam(motherboardRamType?: string, ramType?: string): IConfigurationCheck | undefined {
  if (!motherboardRamType || !ramType) return;

  if (motherboardRamType !== ramType) {
    return {
      error: [
        { category: 'Motherboard', field: 'RAM type' },
        { category: 'RAM', field: 'Type' },
      ],
      message: `Motherboard RAM type is ${motherboardRamType} and RAM modules type is ${ramType}. Use same RAM type.`,
    };
  }
}

function checkTdp(cpuTdp?: string, coolerTdp?: string): IConfigurationCheck | undefined {
  if (Number(coolerTdp) < Number(cpuTdp)) {
    return {
      error: [
        { category: 'CPU', field: 'TDP' },
        { category: 'Cooler', field: 'Dissipated power' },
      ],
      message: `Use more powerful cooler. Current CPU generates more heat than cooler can dissipate.`,
    };
  }
}

function checkHeight(coolerHeight?: string, caseHeight?: string): IConfigurationCheck | undefined {
  if (!coolerHeight || !caseHeight) return;

  if (Number(caseHeight) < Number(coolerHeight)) {
    return {
      error: [
        { category: 'Cooler', field: 'Height' },
        { category: 'Case', field: 'Max cooler height' },
      ],
      message: `Current cooler can't fit in case because of height.`,
    };
  }
}

function checkPower(gpuPower?: string, psuPower?: string): IConfigurationCheck | undefined {
  if (!gpuPower || !psuPower) return;

  if (Number(psuPower) < Number(gpuPower)) {
    return {
      error: [
        { category: 'GPU', field: 'Recommended power supply' },
        { category: 'PSU', field: 'Power' },
      ],
      message: `Current PSU wont fit GPU power supply recommendations.`,
    };
  }
}

export function useConfigurationCheck(configuration: Ref<IConfiguration>) {
  const motherboardFormat = computed(
    () => getFieldValue(configuration.value.parts, 'Motherboard', 'Format') as TMotherboardFormat
  );
  const motherboardSocket = computed(() => getFieldValue(configuration.value.parts, 'Motherboard', 'Socket'));
  const motherboardRamType = computed(() => getFieldValue(configuration.value.parts, 'Motherboard', 'RAM type'));

  const cpuTdp = computed(() => getFieldValue(configuration.value.parts, 'CPU', 'TDP'));
  const cpuSocket = computed(() => getFieldValue(configuration.value.parts, 'CPU', 'Socket'));

  const coolerHeight = computed(() => getFieldValue(configuration.value.parts, 'Cooler', 'Height'));
  const coolerTdp = computed(() => getFieldValue(configuration.value.parts, 'Cooler', 'Dissipated power'));

  const caseFormat = computed(() => getFieldValue(configuration.value.parts, 'Case', 'Format') as TMotherboardFormat);
  const caseHeight = computed(() => getFieldValue(configuration.value.parts, 'Case', 'Max cooler height'));

  const gpuPower = computed(() => getFieldValue(configuration.value.parts, 'GPU', 'Recommended power supply'));

  const psuPower = computed(() => getFieldValue(configuration.value.parts, 'PSU', 'Power'));

  const ramType = computed(() => getFieldValue(configuration.value.parts, 'RAM', 'Type'));

  const validation = computed(() => {
    const errors: IConfigurationError[] = [];
    const messages: string[] = [];

    const results = [
      checkFormat(motherboardFormat.value, caseFormat.value),
      checkSocket(motherboardSocket.value, cpuSocket.value),
      checkRam(motherboardRamType.value, ramType.value),
      checkTdp(cpuTdp.value, coolerTdp.value),
      checkHeight(coolerHeight.value, caseHeight.value),
      checkPower(gpuPower.value, psuPower.value),
    ];

    results.forEach((result) => {
      if (result) {
        result.error.forEach((error) => {
          errors.push(error);
        });

        messages.push(result.message);
      }
    });

    return { errors, messages };
  });

  return { validation };
}
