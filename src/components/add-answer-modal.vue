<template>
  <b-modal id="addQuestionModal" ref="addQuestionModal" hide-footer title="Add new Question" @hidden="onHidden">
    <b-form @submit.prevent="onSubmit" @reset.prevent="onCancel">
      <b-form-group label="Your Question:" label-for="questionInput">
        <b-form-textarea id="questionInput"
                         v-model="form.body"
                         placeholder="What do you need answered?"
                         :rows="6"
                         :max-rows="10">
        </b-form-textarea>
      </b-form-group>

      <button class="btn btn-primary float-right ml-2" type="submit" >Submit</button>
      <button class="btn btn-secondary float-right" type="reset">Cancel</button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: {
    questionId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        body: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      // eslint-disable-next-line no-template-curly-in-string
      this.$axios.post('api/question/${this.questionId}/answer', this.form).then(res => {
        this.$emit('question-added', res.data)
        this.$refs.addQuestionModal.hide()
      })
    },
    onCancel (evt) {
      this.$refs.addQuestionModal.hide()
    },
    onHidden () {
      Object.assign(this.form, {
        title: '',
        body: ''
      })
    }
  }
}
</script>
