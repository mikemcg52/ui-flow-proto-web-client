<template>
  <div class="mei-list-title">
    Alerts
  </div>
  <div class="mei-list-header row">
    <div class="mei-incident-list-col4">Alert ID</div>
    <div class="mei-incident-list-col1">Topic</div>
    <div class="mei-incident-list-col2">District</div>
    <div class="mei-incident-list-col3">Priority</div>
    <div class="mei-incident-list-col5">Class</div>
    <div class="mei-incident-list-col6">Alarm ID</div>
    <div class="mei-incident-list-col7">Created</div>
  </div>
  <div class="mei-incident-list-datarow" v-for="el in alerts" v-bind:key="el.alertId">
    <div class="mei-incident-list-col4" :class="{ modified: el.modified_flag }">
      {{ el.alertId }}</div>
    <div class="mei-incident-list-col1">{{ el.topic }}</div>
    <div class="mei-incident-list-col2">{{ el.district }}</div>
    <div class="mei-incident-list-col3">{{ el.priority }}</div>
    <div class="mei-incident-list-col5">{{ el.alertClass }}</div>
    <div class="mei-incident-list-col6">{{ el.alarmId }}</div>
    <div class="mei-incident-list-col7">{{ dateFormat(el.alertDate) }}</div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import PubSub from 'pubsub.js'
export default {
  name: 'alert-list',
  data () {
    return {
      alert: {
        alertId: '5001',
        alertClass: 'Fire',
        district: 'D1',
        topic: 'Topic A',
        priority: 4,
        alertDate: '12/1/22 8:00',
        alarmId: '9099',
        site: 'Base',
        housing: 0,
        facility: 'Gym',
        modified_flag: false
      },
      alerts: [],
      subscription: null
    }
  },
  created () {
    this.$axios.get('/api/Alerts')
      .then(res => {
        this.alerts = res.data
      })
      .catch(err => {
        console.log(err)
      })
    this.subscription = PubSub.subscribe('alert-added', this.alertAdded)
  },
  methods: {
    dateFormat: (el) => {
      return DateTime.fromISO(el).toLocaleString(DateTime.DATETIME_SHORT)
    },
    alertAdded: function (data) {
      console.log(`subscription message: ${data}`)
      const subData = JSON.parse(data)
      if (subData) {
        this.alerts.push(subData)
      }
    }
  }
}

</script>

<style scoped>
.mei-list-title {
  font-size: 3em;
  font-weight: bolder;
}

.mei-list-header {
  font-size: 1.2em;
  font-weight: bold;
  width: 100%;
  display: flex;
}
.mei-incident-list-datarow {
  display: flex;
}
.mei-incident-list-col1 {
  width: 10%;
}
.mei-incident-list-col2 {
  width: 20%;
}
.mei-incident-list-col3 {
  width: 10%;
}
.mei-incident-list-col4 {
  width: 10%;
}
.mei-incident-list-col5 {
  width: 10%;
}
.mei-incident-list-col6 {
  width: 10%;
}
.mei-incident-list-col7 {
  width: 20%;
}
.modified {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
</style>
