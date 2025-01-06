import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiSlider from './UiSlider.vue';

import slide1 from '@/components/UiSlider/images/1.jpg';
import slide2 from '@/components/UiSlider/images/2.jpg';
import slide3 from '@/components/UiSlider/images/3.jpg';

import thumb1 from '@/components/UiSlider/images/thumb-1.webp';
import thumb2 from '@/components/UiSlider/images/thumb-2.webp';
import thumb3 from '@/components/UiSlider/images/thumb-3.webp';

import { wrapperFactory } from '@/test';

const slides = [slide1, slide2, slide3];
const thumbs = [thumb1, thumb2, thumb3];

const sliderThumb = dataTest('ui-slider-thumb');
const sliderSlide = dataTest('ui-slider-slide');

let wrapper: VueWrapper<InstanceType<typeof UiSlider>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiSlider, { slides, thumbs });
});

enableAutoUnmount(afterEach);

describe('UiSlider', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiSlider)).toBeTruthy();
  });

  it('shows thumbs', async () => {
    expect(wrapper.findAll(sliderThumb).length).toBe(slides.length);
  });

  it('changes slides', async () => {
    expect(wrapper.find(sliderSlide).attributes('data-slide')).toBe('0');

    const slideToSet = 1;

    await wrapper.findAll(sliderThumb)[slideToSet].trigger('click');

    expect(wrapper.find(sliderSlide).attributes('data-slide')).toBe(slideToSet.toString());
  });
});
