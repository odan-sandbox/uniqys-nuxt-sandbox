<template>
  <div>
    <input type="text" v-model="inputMessage">
    <button @click="submit()">submit</button>
    <div> {{ message }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { EasyClientForBrowser } from '@uniqys/easy-client'

@Component({
})
export default class Home extends Vue {
  public message: string = "";
  public inputMessage: string = "";
  public client!: EasyClientForBrowser;
  async mounted() {
    this.client = new EasyClientForBrowser('http://localhost:8080')
    console.log("created")
    await this.update()
  }
  async update() {
    const { data } = await this.client.get('/api/message');
    const { message } = data;
    this.message = `message: ${message}`
  }
  async submit() {
    await this.client.post(
      '/api/message',
      { message: this.inputMessage },
      { sign: true })
    await this.update()
  }
}
</script>