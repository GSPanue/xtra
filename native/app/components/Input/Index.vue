<template>
  <FlexboxLayout class="input" flexDirection="column">
    <Label v-if="label" class="label" :text="label" />
    <TextField
      class="text-field"
      :keyboardType="keyboardType"
      :secure="secure"
      v-model="inputVal"
    />
  </FlexboxLayout>
</template>

<script>
export default {
  props: [
    'label',
    'keyboardType',
    'secure',
    'value'
  ],
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 40px;
}

.label {
  font-size: 22px;
}

.text-field {
  font-size: 18px;
  margin: 0;
}
</style>
