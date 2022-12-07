<template>
  <div>
    <AlertList></AlertList>
  </div>
</template>

<script>
import AlertList from '@/components/alert-list'

export default {
  components: {
    AlertList
  },
  data () {
    return {
      questions: []
    }
  },
  created () {
    this.$axios.get('/api/question')
      .then(res => {
        this.questions = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    onQuestionAdded (question) {
      this.questions = [question, ...this.questions]
    }
  }
}
</script>

<style>
.question-previews .list-group-item{
  cursor: pointer;
}
</style>
