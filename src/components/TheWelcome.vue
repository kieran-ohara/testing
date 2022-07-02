<script setup>
import { ref, inject } from 'vue'

const step = ref('postcode')

const setStep = () => {
  step.value = 'service';
}

import useContext from './context-composable';
const { partner } = await useContext();

const submitApp = async (formData) => {
  console.log(formData);
}

</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

<template>
  <h1>partner is {{ partner }}</h1>
  <FormKit
    type="form"
    #default="{ value }"
    @submit="submitApp"
  >
    <div class="form-body">

      <Transition>
        <section v-show="step === 'postcode'">
          <h3>What is your business address</h3>
          <FormKit
            type="group"
            name="postcode"
          >
            <FormKit
              type="text"
              validation="required|length:3"
              name="postcode"
            />
            <FormKit
              type="button"
              @click="setStep"
              label="Next"
              name="service"
            />
          </FormKit>
        </section>
      </Transition>

      <Transition>
        <section v-show="step === 'service'">
          <h3>Which service can we help you with?</h3>
          <FormKit
            type="group"
            name="service"
          >
            <FormKit
              type="radio"
              name="service"
              :options="['Broadband and Landline', 'Broadband only', 'Landline only']"
            />
          </FormKit>
        </section>
      </Transition>

      <details>
        <summary>Form data</summary>
        <pre>{{ value }}</pre>
      </details>

    </div>
  </FormKit>
</template>
