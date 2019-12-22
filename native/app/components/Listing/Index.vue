<template>
  <FlexboxLayout flexDirection="column">
    <FlexboxLayout flexDirection="row" backgroundColor="red">
      <!-- Topic & Price -->
      <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-start">
        <Label text="Topic" />
      </FlexboxLayout>
      <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
        <Label text="Price" />
      </FlexboxLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<style scoped>
.flex-1 {
  flex: 1;
}
</style>
