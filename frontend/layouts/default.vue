<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>Chat Example of UniqysKit</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab small light href="https://github.com/odanado/uniqys-nuxt-sandbox" target="_blank">
        <i class="fab fa-github fa-2x"></i>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
