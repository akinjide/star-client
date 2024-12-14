<template>
    <v-container class="centered-container">
        <v-card class="content-card" >
          <v-row dense justify="center">
            <v-btn class="custom-button" block>Student Directory</v-btn>
            <v-btn class="custom-button" block>Supervisor Directory</v-btn>
            <v-btn class="custom-button" block>Jury Directory</v-btn>
          </v-row>
        </v-card>
    </v-container>
</template>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.content-card {
  width: 50%; /* Adjust card width */
  padding: 3rem;
  background-color: #F3F2F7;
  border-radius: 20px;}

/* Button Styling */
.custom-button {
  background-color: #6975EB;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  border-radius: 30px;
  text-transform: none;
}
</style>
