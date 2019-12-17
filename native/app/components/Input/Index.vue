<template>
  <FlexboxLayout class="input" flexDirection="column">
    <Label v-if="label" class="label" :text="label" />
    <TextField
      class="text-field"
      :keyboardType="keyboardType"
      :secure="secure"
    />
  </FlexboxLayout>
</template>

<script>
export default {
  props: [
    'label',
    'keyboardType',
    'secure'
  ]
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
