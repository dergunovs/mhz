import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import UiSlider from './UiSlider.vue';

import slide1 from '@/components/UiSlider/images/1.jpg';
import slide2 from '@/components/UiSlider/images/2.jpg';
import slide3 from '@/components/UiSlider/images/3.jpg';

import thumb1 from '@/components/UiSlider/images/thumb-1.webp';
import thumb2 from '@/components/UiSlider/images/thumb-2.webp';
import thumb3 from '@/components/UiSlider/images/thumb-3.webp';

import { wrapperFactory } from '@/test';

let wrapper: VueWrapper;

const sliderThumb = '[data-test="ui-slider-thumb"]';
const sliderSlide = '[data-test="ui-slider-slide"]';

const slides = [slide1, slide2, slide3];
const thumbs = [thumb1, thumb2, thumb3];

beforeEach(() => {
  wrapper = wrapperFactory(UiSlider, {
    props: { slides, thumbs },
  });
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
