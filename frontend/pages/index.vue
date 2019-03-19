<template>
  <v-layout
    column
    align-center>
    <v-container class="post">
      <v-form @submit.prevent="submit">
        <v-container>
          <v-layout>
            <v-flex xs8>
              <v-text-field v-model="inputMessage" required/>
            </v-flex>
            <v-flex xs4>
              <v-btn @click="submit" small color="primary">Post</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-container>
    <v-container>
      <small> count: {{ messageCount }}</small>
      <v-card v-for="message in orderedMessages" :key="message.index">
        <v-card-title primary-title>
          <section>
            <h3>{{ message.user }}</h3>
            <p> {{ message.text }} </p>
          </section>
        </v-card-title>
      </v-card>
    </v-container>
    <v-container>
      <v-snackbar v-model="snackbar" color="info">
        {{ snackbarText }}
      </v-snackbar>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { EasyClient, EasyClientForBrowser } from '@uniqys/easy-client'


interface Message {
  index: number;
  text: string;
  user: string;
}

@Component({
})
export default class Home extends Vue {
  public messages: {[key: number]: Message} = {};
  public inputMessage: string = "";
  public messageCount: number = 0;
  public client!: EasyClient;
  public snackbar: boolean = false;
  public snackbarText: string = "";
  get orderedMessages() {
    return Object.values(this.messages).sort((a, b) => b.index - a.index)
  }
  async mounted() {
    const origin = (window as any).origin
    const web3 = (window as any).web3
    this.client = new EasyClientForBrowser(origin)
    if (web3 && web3.currentProvider.selectedAddress) {
      this.showToast('use EasyClientForWeb3')
      const { EasyClientForWeb3 } = require('@uniqys/easy-client')
      this.client = new EasyClientForWeb3(web3.currentProvider, origin)
    }
    else {
      this.showToast('use EasyClientForBrowser')
      this.client = new EasyClientForBrowser(origin)
    }
    await this.update()
  }
  async updateCount() {
    const { data } = await this.client.get('/api/message/count')
    this.messageCount = data.count
  }
  async update() {
    await this.updateCount()
    for (let i = 1; i <= this.messageCount; i++) {
      const { data }: { data: Message }= await this.client.get(`/api/messages/${i}`)
      if (!this.messages[data.index]) {
        this.$set(this.messages, data.index, data)
      }
    }
  }
  async submit() {
    await this.client.post(
      '/api/message',
      { message: this.inputMessage },
      { sign: true })

    await this.update()
    this.inputMessage = ''
  }
  showToast(text: string) {
    this.snackbarText = text
    this.snackbar = true
  }
}
</script>

<style lang="postcss" scoped>
.post {
  flex-basis: 140px;
}
</style>
