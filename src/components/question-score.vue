<template>
  <h3 class="text-center scoring">
    <button class="btn btn-link btn-lg p-0 d-block mx-auto" @click.stop="onUpvote"><i class="fas fa-sort-up" /></button>
    <span class="d-block mx-auto">{{ question.score }}</span>
    <button class="btn btn-link btn-lg p-0 d-block mx-auto" @click.stop="onDownvote"><i class="fas fa-sort-down" /></button>
  </h3>
</template>
<script>
import PubSub from 'pubsub.js'

export default {
  data () {
    return {
      subscription: null
    }
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  created () {
    this.subscription = PubSub.subscribe('score-changed', this.onScoreChanged)
  },
  beforeUnmount () {
    if (this.subscription) {
      PubSub.unsubscribe(this.subscription)
    }
  },
  methods: {
    onUpvote () {
      this.$axios.patch(`/api/question/${this.question.id}/upvote`).then(res => {
        Object.assign(this.question, res.data)
      })
    },
    onDownvote () {
      this.$axios.patch(`/api/question/${this.question.id}/downvote`).then(res => {
        Object.assign(this.question, res.data)
      })
    },
    onScoreChanged (data) {
      const message = JSON.parse(data)
      if (this.question.id !== message.questionId) return
      const score = message.score
      // this.question.score = message.score
      Object.assign(this.question, { score })
    }
  }
}
</script>

<style scoped>
.scoring .btn-link{
  line-height: 1;
}
</style>
