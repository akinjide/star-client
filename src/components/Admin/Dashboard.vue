<template>
    <v-container >
        <v-card class="content-card">
          <v-row dense justify="center">
            <v-btn class="custom-button" block>Student Directory</v-btn>
            <v-btn class="custom-button" block>Supervisor Directory</v-btn>
            <v-btn class="custom-button" block>Jury Directory</v-btn>
          </v-row>
        </v-card>
    </v-container>
</template>

<style scoped>
.content-card {
  padding: 2rem;
  background-color: #6559ff;
  border-radius: 20px;
}

/* Button Styling */
.custom-button {
  background-color: #000080;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0;
  border-radius: 30px;
  text-transform: none;
}
</style>
